[@time-loop/cdk-s3-file-generator](../README.md) / GeneratorProps

# Interface: GeneratorProps

## Hierarchy

- `Omit`<`BucketDeploymentProps`, ``"sources"``\>

  ↳ **`GeneratorProps`**

## Table of contents

### Properties

- [accessControl](GeneratorProps.md#accesscontrol)
- [cacheControl](GeneratorProps.md#cachecontrol)
- [contentDisposition](GeneratorProps.md#contentdisposition)
- [contentEncoding](GeneratorProps.md#contentencoding)
- [contentLanguage](GeneratorProps.md#contentlanguage)
- [contentType](GeneratorProps.md#contenttype)
- [contents](GeneratorProps.md#contents)
- [destinationBucket](GeneratorProps.md#destinationbucket)
- [destinationKeyPrefix](GeneratorProps.md#destinationkeyprefix)
- [distribution](GeneratorProps.md#distribution)
- [distributionPaths](GeneratorProps.md#distributionpaths)
- [ephemeralStorageSize](GeneratorProps.md#ephemeralstoragesize)
- [exclude](GeneratorProps.md#exclude)
- [expires](GeneratorProps.md#expires)
- [extract](GeneratorProps.md#extract)
- [fileName](GeneratorProps.md#filename)
- [fileType](GeneratorProps.md#filetype)
- [include](GeneratorProps.md#include)
- [logRetention](GeneratorProps.md#logretention)
- [memoryLimit](GeneratorProps.md#memorylimit)
- [metadata](GeneratorProps.md#metadata)
- [prune](GeneratorProps.md#prune)
- [retainOnDelete](GeneratorProps.md#retainondelete)
- [role](GeneratorProps.md#role)
- [serializer](GeneratorProps.md#serializer)
- [serverSideEncryption](GeneratorProps.md#serversideencryption)
- [serverSideEncryptionAwsKmsKeyId](GeneratorProps.md#serversideencryptionawskmskeyid)
- [serverSideEncryptionCustomerAlgorithm](GeneratorProps.md#serversideencryptioncustomeralgorithm)
- [signContent](GeneratorProps.md#signcontent)
- [storageClass](GeneratorProps.md#storageclass)
- [useEfs](GeneratorProps.md#useefs)
- [vpc](GeneratorProps.md#vpc)
- [vpcSubnets](GeneratorProps.md#vpcsubnets)
- [websiteRedirectLocation](GeneratorProps.md#websiteredirectlocation)

## Properties

### accessControl

• `Optional` `Readonly` **accessControl**: `BucketAccessControl`

System-defined x-amz-acl metadata to be set on all objects in the deployment.

**`Default`**

```ts
- Not set.
```

**`See`**

https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl

#### Inherited from

Omit.accessControl

___

### cacheControl

• `Optional` `Readonly` **cacheControl**: `CacheControl`[]

System-defined cache-control metadata to be set on all objects in the deployment.

**`Default`**

```ts
- Not set.
```

**`See`**

https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#SysMetadata

#### Inherited from

Omit.cacheControl

___

### contentDisposition

• `Optional` `Readonly` **contentDisposition**: `string`

System-defined cache-disposition metadata to be set on all objects in the deployment.

**`Default`**

```ts
- Not set.
```

**`See`**

https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#SysMetadata

#### Inherited from

Omit.contentDisposition

___

### contentEncoding

• `Optional` `Readonly` **contentEncoding**: `string`

System-defined content-encoding metadata to be set on all objects in the deployment.

**`Default`**

```ts
- Not set.
```

**`See`**

https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#SysMetadata

#### Inherited from

Omit.contentEncoding

___

### contentLanguage

• `Optional` `Readonly` **contentLanguage**: `string`

System-defined content-language metadata to be set on all objects in the deployment.

**`Default`**

```ts
- Not set.
```

**`See`**

https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#SysMetadata

#### Inherited from

Omit.contentLanguage

___

### contentType

• `Optional` `Readonly` **contentType**: `string`

System-defined content-type metadata to be set on all objects in the deployment.

**`Default`**

```ts
- Not set.
```

**`See`**

https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#SysMetadata

#### Inherited from

Omit.contentType

___

### contents

• `Readonly` **contents**: `any`

The data to be marshalled.

___

### destinationBucket

• `Readonly` **destinationBucket**: `IBucket`

The S3 bucket to sync the contents of the zip file to.

#### Inherited from

Omit.destinationBucket

___

### destinationKeyPrefix

• `Optional` `Readonly` **destinationKeyPrefix**: `string`

Key prefix in the destination bucket.

Must be <=104 characters

**`Default`**

```ts
"/" (unzip to root of the destination bucket)
```

#### Inherited from

Omit.destinationKeyPrefix

___

### distribution

• `Optional` `Readonly` **distribution**: `IDistribution`

The CloudFront distribution using the destination bucket as an origin.
Files in the distribution's edge caches will be invalidated after
files are uploaded to the destination bucket.

**`Default`**

```ts
- No invalidation occurs
```

#### Inherited from

Omit.distribution

___

### distributionPaths

• `Optional` `Readonly` **distributionPaths**: `string`[]

The file paths to invalidate in the CloudFront distribution.

**`Default`**

```ts
- All files under the destination bucket key prefix will be invalidated.
```

#### Inherited from

Omit.distributionPaths

___

### ephemeralStorageSize

• `Optional` `Readonly` **ephemeralStorageSize**: `Size`

The size of the AWS Lambda function’s /tmp directory in MiB.

**`Default`**

```ts
512 MiB
```

#### Inherited from

Omit.ephemeralStorageSize

___

### exclude

• `Optional` `Readonly` **exclude**: `string`[]

If this is set, matching files or objects will be excluded from the deployment's sync
command. This can be used to exclude a file from being pruned in the destination bucket.

If you want to just exclude files from the deployment package (which excludes these files
evaluated when invalidating the asset), you should leverage the `exclude` property of
`AssetOptions` when defining your source.

**`Default`**

```ts
- No exclude filters are used
```

**`See`**

https://docs.aws.amazon.com/cli/latest/reference/s3/index.html#use-of-exclude-and-include-filters

#### Inherited from

Omit.exclude

___

### expires

• `Optional` `Readonly` **expires**: `Expiration`

System-defined expires metadata to be set on all objects in the deployment.

**`Default`**

```ts
- The objects in the distribution will not expire.
```

**`See`**

https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#SysMetadata

#### Inherited from

Omit.expires

___

### extract

• `Optional` `Readonly` **extract**: `boolean`

If this is set, the zip file will be synced to the destination S3 bucket and extracted.
If false, the file will remain zipped in the destination bucket.

**`Default`**

```ts
true
```

#### Inherited from

Omit.extract

___

### fileName

• `Readonly` **fileName**: `string`

Name of the file, to be created in the path.

___

### fileType

• `Readonly` **fileType**: [`JSON`](../enums/GeneratorFileType.md#json)

___

### include

• `Optional` `Readonly` **include**: `string`[]

If this is set, matching files or objects will be included with the deployment's sync
command. Since all files from the deployment package are included by default, this property
is usually leveraged alongside an `exclude` filter.

**`Default`**

```ts
- No include filters are used and all files are included with the sync command
```

**`See`**

https://docs.aws.amazon.com/cli/latest/reference/s3/index.html#use-of-exclude-and-include-filters

#### Inherited from

Omit.include

___

### logRetention

• `Optional` `Readonly` **logRetention**: `RetentionDays`

The number of days that the lambda function's log events are kept in CloudWatch Logs.

**`Default`**

```ts
logs.RetentionDays.INFINITE
```

#### Inherited from

Omit.logRetention

___

### memoryLimit

• `Optional` `Readonly` **memoryLimit**: `number`

The amount of memory (in MiB) to allocate to the AWS Lambda function which
replicates the files from the CDK bucket to the destination bucket.

If you are deploying large files, you will need to increase this number
accordingly.

**`Default`**

```ts
128
```

#### Inherited from

Omit.memoryLimit

___

### metadata

• `Optional` `Readonly` **metadata**: `Object`

User-defined object metadata to be set on all objects in the deployment

**`Default`**

```ts
- No user metadata is set
```

**`See`**

https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#UserMetadata

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

Omit.metadata

___

### prune

• `Optional` `Readonly` **prune**: `boolean`

If this is set to false, files in the destination bucket that
do not exist in the asset, will NOT be deleted during deployment (create/update).

**`See`**

https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html

**`Default`**

```ts
true
```

#### Inherited from

Omit.prune

___

### retainOnDelete

• `Optional` `Readonly` **retainOnDelete**: `boolean`

If this is set to "false", the destination files will be deleted when the
resource is deleted or the destination is updated.

NOTICE: Configuring this to "false" might have operational implications. Please
visit to the package documentation referred below to make sure you fully understand those implications.

**`See`**

https://github.com/aws/aws-cdk/tree/main/packages/aws-cdk-lib/aws-s3-deployment#retain-on-delete

**`Default`**

```ts
true - when resource is deleted/updated, files are retained
```

#### Inherited from

Omit.retainOnDelete

___

### role

• `Optional` `Readonly` **role**: `IRole`

Execution role associated with this function

**`Default`**

```ts
- A role is automatically created
```

#### Inherited from

Omit.role

___

### serializer

• `Optional` `Readonly` **serializer**: [`SerializerProps`](SerializerProps.md)

Optionally define how to serialize the final output.

___

### serverSideEncryption

• `Optional` `Readonly` **serverSideEncryption**: `ServerSideEncryption`

System-defined x-amz-server-side-encryption metadata to be set on all objects in the deployment.

**`Default`**

```ts
- Server side encryption is not used.
```

**`See`**

https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#SysMetadata

#### Inherited from

Omit.serverSideEncryption

___

### serverSideEncryptionAwsKmsKeyId

• `Optional` `Readonly` **serverSideEncryptionAwsKmsKeyId**: `string`

System-defined x-amz-server-side-encryption-aws-kms-key-id metadata to be set on all objects in the deployment.

**`Default`**

```ts
- Not set.
```

**`See`**

https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#SysMetadata

#### Inherited from

Omit.serverSideEncryptionAwsKmsKeyId

___

### serverSideEncryptionCustomerAlgorithm

• `Optional` `Readonly` **serverSideEncryptionCustomerAlgorithm**: `string`

System-defined x-amz-server-side-encryption-customer-algorithm metadata to be set on all objects in the deployment.
Warning: This is not a useful parameter until this bug is fixed: https://github.com/aws/aws-cdk/issues/6080

**`Default`**

```ts
- Not set.
```

**`See`**

https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerSideEncryptionCustomerKeys.html#sse-c-how-to-programmatically-intro

#### Inherited from

Omit.serverSideEncryptionCustomerAlgorithm

___

### signContent

• `Optional` `Readonly` **signContent**: `boolean`

If set to true, uploads will precompute the value of `x-amz-content-sha256`
and include it in the signed S3 request headers.

**`Default`**

- `x-amz-content-sha256` will not be computed

#### Inherited from

Omit.signContent

___

### storageClass

• `Optional` `Readonly` **storageClass**: `StorageClass`

System-defined x-amz-storage-class metadata to be set on all objects in the deployment.

**`Default`**

```ts
- Default storage-class for the bucket is used.
```

**`See`**

https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#SysMetadata

#### Inherited from

Omit.storageClass

___

### useEfs

• `Optional` `Readonly` **useEfs**: `boolean`

Mount an EFS file system. Enable this if your assets are large and you encounter disk space errors.
 Enabling this option will require a VPC to be specified.

**`Default`**

```ts
- No EFS. Lambda has access only to 512MB of disk space.
```

#### Inherited from

Omit.useEfs

___

### vpc

• `Optional` `Readonly` **vpc**: `IVpc`

The VPC network to place the deployment lambda handler in.
This is required if `useEfs` is set.

**`Default`**

```ts
None
```

#### Inherited from

Omit.vpc

___

### vpcSubnets

• `Optional` `Readonly` **vpcSubnets**: `SubnetSelection`

Where in the VPC to place the deployment lambda handler.
Only used if 'vpc' is supplied.

**`Default`**

```ts
- the Vpc default strategy if not specified
```

#### Inherited from

Omit.vpcSubnets

___

### websiteRedirectLocation

• `Optional` `Readonly` **websiteRedirectLocation**: `string`

System-defined x-amz-website-redirect-location metadata to be set on all objects in the deployment.

**`Default`**

```ts
- No website redirection.
```

**`See`**

https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#SysMetadata

#### Inherited from

Omit.websiteRedirectLocation
