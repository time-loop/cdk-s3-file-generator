[@time-loop/cdk-s3-file-generator](../README.md) / UploadProps

# Interface: UploadProps

## Table of contents

### Properties

- [bucket](UploadProps.md#bucket)
- [fileName](UploadProps.md#filename)
- [path](UploadProps.md#path)
- [prune](UploadProps.md#prune)
- [retainOnDelete](UploadProps.md#retainondelete)
- [role](UploadProps.md#role)

## Properties

### bucket

• `Readonly` **bucket**: `IBucket`

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

```ts
- root of the bucket
```

___

### prune

• `Optional` `Readonly` **prune**: `boolean`

Whether or not to clear out the destination directory before uploading.

**`Default`**

```ts
false
```

___

### retainOnDelete

• `Optional` `Readonly` **retainOnDelete**: `boolean`

Whether or not to delete the objects from the bucket when this resource
is deleted/updated from the stack.

NOTE: Changing the logical ID of the `BucketDeployment` construct, without changing the destination
(for example due to refactoring, or intentional ID change) **will result in the deletion of the objects**.
This is because CloudFormation will first create the new resource, which will have no affect,
followed by a deletion of the old resource, which will cause a deletion of the objects,
since the destination hasn't changed, and `retainOnDelete` is `false`.

**`Default`**

```ts
true
```

___

### role

• `Optional` `Readonly` **role**: `IRole`

Used as the Lambda Execution Role for the BucketDeployment.

**`Default`**

```ts
- role is created automatically by the Construct
```
