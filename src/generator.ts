import Ajv, { SchemaObject } from 'ajv';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { IBucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, BucketDeploymentProps, Source } from 'aws-cdk-lib/aws-s3-deployment';
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

export interface GeneratorProps extends Omit<BucketDeploymentProps, 'sources'> {
  /**
   * The data to be marshalled.
   */
  readonly contents: any;
  readonly fileType: GeneratorFileType;
  /**
   * Name of the file, to be created in the path.
   */
  readonly fileName: string;
  /**
   * Optionally define how to serialize the final output.
   */
  readonly serializer?: SerializerProps;
}

export class Generator extends BucketDeployment {
  constructor(scope: Construct, id: string, props: GeneratorProps) {
    const generateFileContents = (contents: any, fileType: GeneratorFileType) => {
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
     * Ensures the contents adhere to the schema, and the values adhere to
     * validator specifications.
     *
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

    try {
      validateFileContents(props.contents, props.serializer?.schema);
    } catch (e) {
      throw new Error(`Failed validation of contents against schema: ${JSON.stringify(e, null, 2)}`);
    }

    super(scope, id, {
      ...props,
      sources: [Source.jsonData(props.fileName, generateFileContents(props.contents, props.fileType))],
      prune: props.prune ?? false,
    });
  }
}
