import Ajv, { SchemaObject } from 'ajv';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { IBucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, BucketDeploymentProps, ISource, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

// $data fields in schemas allow us to set conditional permitted values.
// For example, if we have two numbers `num1` and `num2`, where `num2` cannot
// exceed `num1`, we can use a `$data` reference to enforce that.
// See test/resources/test.schema.ts `testLessThanTest2` for an example.
const ajv = new Ajv({ $data: true });

export enum GeneratorFileType {
  JSON = 'generator_json',
  // TODO: YAML = 'generator_yaml',
}

export interface UploadProps {
  /**
   * Bucket where the file will be uploaded.
   */
  readonly bucket: IBucket;
  /**
   * The path in the bucket to which the file will be uploaded.
   * @default - root of the bucket
   */
  readonly path?: string;
  /**
   * Name of the file, to be created in the path.
   */
  readonly fileName: string;
  /**
   * Whether or not to clear out the destination directory before uploading.
   *
   * @default false
   */
  readonly prune?: boolean;
  /**
   * Whether or not to delete the objects from the bucket when this resource
   * is deleted/updated from the stack.
   *
   * NOTE: Changing the logical ID of the `BucketDeployment` construct, without changing the destination
   * (for example due to refactoring, or intentional ID change) **will result in the deletion of the objects**.
   * This is because CloudFormation will first create the new resource, which will have no affect,
   * followed by a deletion of the old resource, which will cause a deletion of the objects,
   * since the destination hasn't changed, and `retainOnDelete` is `false`.
   *
   * @default true
   */
  readonly retainOnDelete?: boolean;
  /**
   * Used as the Lambda Execution Role for the BucketDeployment.
   * @default - role is created automatically by the Construct
   */
  readonly role?: IRole;
}

export interface SerializerProps {
  /**
   * Skeleton of final structure, i.e., definition of the output's structure.
   *
   * @default - no schema defined, file can be unstructured
   */
  readonly schema?: SchemaObject;
  /**
   * Function against which to validate the contents. For example, use this to
   * verify two mutually exclusive fields are not concurrently set.
   *
   * @default - no validation
   */
  //readonly validator?: (contents: any) => boolean;
}

export interface FileProps {
  /**
   * The data to be marshalled.
   */
  readonly contents: any;
  /**
   * Name of the file, to be created in the path.
   */
  readonly fileName: string;
  readonly fileType?: GeneratorFileType;
  /**
   * Optionally define how to serialize the final output.
   */
  readonly serializer?: SerializerProps;
}

export interface GeneratorProps extends Omit<BucketDeploymentProps, 'sources'> {
  files: FileProps[];
}

export class Generator extends BucketDeployment {
  // NOTE: The constructor has a lot of helper functions defined in-line
  // since the super call must occur prior to private methods being accessed.
  constructor(scope: Construct, id: string, props: GeneratorProps) {
    /**
     * Helper to process and format the contents of the file based on the fileType.
     *
     * @param contents File contents
     * @param fileType? File format type for output. Defaults to JSON.
     * @returns The contents structured in the correct file format type
     */
    const generateFileContents = (contents: any, fileType?: GeneratorFileType) => {
      // TODO: Only supports JSON right now
      switch (fileType) {
        case GeneratorFileType.JSON:
        default:
          // Default is JSON
          break;
      }
      return contents;
    };

    /**
     * Helper to ensure we utilize the proper Source.<dataFunction> based on
     * the fileType.
     *
     * @param fileType? File format type for output. Defaults to JSON.
     * @returns Source.<dataFunction>
     */
    const getSourceDataFunction = (fileType?: GeneratorFileType): ((objectKey: string, obj: any) => ISource) => {
      let sourceDataFunc: (objectKey: string, obj: any) => ISource;
      // TODO: Support other source types
      switch (fileType) {
        case GeneratorFileType.JSON:
        default:
          sourceDataFunc = Source.jsonData;
          break;
      }
      return sourceDataFunc;
    };

    /**
     * Helper to ensure the contents adhere to the schema, and the values
     * adhere to validator specifications.
     *
     * @param contents File contents
     * @param schema? The schema to validate against
     * @throws if the contents do not match the provided schema
     */
    const validateFileContents = (contents: any, schema?: SchemaObject) => {
      if (!schema) return;

      const validate = ajv.compile(schema);
      validate(contents);
      if (validate.errors) {
        throw validate.errors;
      }
    };

    /**
     * Helper to validate the contents of all passed in files.
     *
     * @param files The properties of each file to validate
     * @throws if any file contents do not match the provided schema
     */
    const validateFilesContents = (files: FileProps[]) => {
      const errMsgs: string[] = [];
      for (const fileProps of files) {
        try {
          validateFileContents(fileProps.contents, fileProps.serializer?.schema);
        } catch (e) {
          errMsgs.push(
            `Failed validation of ${fileProps.fileName} contents against schema: ${JSON.stringify(e, null, 2)}`,
          );
        }
      }

      // If there are any errors, throw them all at once
      if (errMsgs.length > 0) {
        throw new Error(errMsgs.join('\n'));
      }
    };

    /**
     * Helper to retrieve the ISource for each file.
     *
     * @param files The properties of each file to validate
     * @returns Array of ISources to pass to the BucketDeployment
     */
    const getSources = (files: FileProps[]): ISource[] => {
      return files.map((fileProps) => {
        const sourceDataFunc = getSourceDataFunction(fileProps.fileType);
        return sourceDataFunc(fileProps.fileName, generateFileContents(fileProps.contents, fileProps.fileType));
      });
    };

    validateFilesContents(props.files);
    const sources = getSources(props.files);

    super(scope, id, {
      ...props,
      sources,
      prune: props.prune ?? false,
    });
  }
}
