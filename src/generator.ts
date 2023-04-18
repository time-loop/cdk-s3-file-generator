import Ajv, { SchemaObject } from 'ajv';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
const ajv = new Ajv({ $data: true });

export enum GeneratorFileType {
  JSON = 'generator_json',
  // TODO: YAML = 'generator_yaml',
}

export interface UploadProps {
  /**
   * Bucket where the file will be uploaded.
   */
  readonly bucketArn: string;
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

export interface GeneratorProps {
  /**
   * The data to be marshalled.
   */
  readonly contents: any;
  readonly fileType: GeneratorFileType;
  /**
   * Optionally define how to serialize the final output.
   */
  readonly serializer?: SerializerProps;
  /**
   * Defines where to upload the S3 object.
   */
  readonly upload: UploadProps;
}

export class Generator extends Construct {
  private readonly _contents: any;
  private readonly _fileType: GeneratorFileType;
  private readonly _serializerProps?: SerializerProps;
  private readonly _uploadProps: UploadProps;
  constructor(scope: Construct, id: string, props: GeneratorProps) {
    super(scope, id);
    this._contents = props.contents;
    this._fileType = props.fileType;
    this._serializerProps = props.serializer;
    this._uploadProps = props.upload;

    try {
      this.validateFileContents(this._contents, this._serializerProps?.schema);
    } catch (e) {
      throw new Error(`Failed validation of contents against schema: ${JSON.stringify(e, null, 2)}`);
    }
    this.uploadToS3();
  }

  private generateFileContents(): any {
    // TODO: Only supports JSON right now
    switch (this._fileType) {
      case GeneratorFileType.JSON:
      default:
        // Default is JSON
        break;
    }
    return this._contents;
  }

  /**
   * Ensures the contents adhere to the schema, and the values adhere to
   * validator specifications.
   *
   * @returns True if contents were successfully validated
   */
  // private validateFileContents(contents: any, schema?: any): boolean {
  //   if (!schema) return true;
  //   console.log(`validateFileContents called for obj: ${JSON.stringify(contents, null, 2)}`);

  //   let countValidated = 0;
  //   const topLevelKeys = Object.keys(contents);
  //   for (const key of topLevelKeys) {
  //     if (typeof contents[key] === 'object') {
  //       if (this.validateFileContents(contents[key], schema[key])) countValidated++;
  //     } else {
  //       console.log(`Contents val for key ${key}: ${contents[key]}`);
  //       console.log(`Schema val for key ${key}: ${schema[key]}`);
  //       if (typeof contents[key] === typeof schema[key]) {
  //         countValidated++;
  //       }
  //     }
  //   }
  //   return countValidated === topLevelKeys.length;
  // }

  /**
   * Ensures the contents adhere to the schema, and the values adhere to
   * validator specifications.
   *
   * @throws if the contents do not match the provided schema
   */
  private validateFileContents(contents: any, schema?: SchemaObject) {
    if (!schema) return;

    const validate = ajv.compile(schema);
    validate(contents);
    if (validate.errors) {
      throw validate.errors;
    }
  }

  private uploadToS3() {
    // let sourceFunc: Function = Source.data;
    // switch (this._fileType) {
    //   case GeneratorFileType.JSON:
    //   default:
    //     // Default is JSON
    //     sourceFunc = Source.jsonData;
    //     break;
    // }
    const contents = this.generateFileContents();
    // TODO: Figure out the logical ID instead of hardcode
    new BucketDeployment(this, 'file', {
      destinationBucket: Bucket.fromBucketArn(this, 'bucket', this._uploadProps.bucketArn),
      destinationKeyPrefix: this._uploadProps.path,
      sources: [Source.jsonData(this._uploadProps.fileName, contents)],
      prune: this._uploadProps.prune ?? false,
      role: this._uploadProps.role,
    });
  }
}
