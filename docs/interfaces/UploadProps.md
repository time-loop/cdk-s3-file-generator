[@time-loop/cdk-s3-file-generator](../README.md) / UploadProps

# Interface: UploadProps

## Table of contents

### Properties

- [bucketArn](UploadProps.md#bucketarn)
- [fileName](UploadProps.md#filename)
- [path](UploadProps.md#path)
- [prune](UploadProps.md#prune)
- [role](UploadProps.md#role)

## Properties

### bucketArn

• `Readonly` **bucketArn**: `string`

Bucket where the file will be uploaded.

___

### fileName

• `Readonly` **fileName**: `string`

Name of the file, to be created in the path.

___

### path

• `Optional` `Readonly` **path**: `string`

The path in the bucket to which the file will be uploaded.

**`Default`**

- root of the bucket

___

### prune

• `Optional` `Readonly` **prune**: `boolean`

Whether or not to clear out the destination directory before uploading.

**`Default`**

false

___

### role

• `Optional` `Readonly` **role**: `IRole`

Used as the Lambda Execution Role for the BucketDeployment.

**`Default`**

- role is created automatically by the Construct
