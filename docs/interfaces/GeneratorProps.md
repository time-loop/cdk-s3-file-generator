[@time-loop/cdk-s3-file-generator](../README.md) / GeneratorProps

# Interface: GeneratorProps

## Table of contents

### Properties

- [contents](GeneratorProps.md#contents)
- [fileType](GeneratorProps.md#filetype)
- [serializer](GeneratorProps.md#serializer)
- [upload](GeneratorProps.md#upload)

## Properties

### contents

• `Readonly` **contents**: `any`

The data to be marshalled.

___

### fileType

• `Readonly` **fileType**: [`JSON`](../enums/GeneratorFileType.md#json)

___

### serializer

• `Optional` `Readonly` **serializer**: [`SerializerProps`](SerializerProps.md)

Optionally define how to serialize the final output.

___

### upload

• `Readonly` **upload**: [`UploadProps`](UploadProps.md)

Defines where to upload the S3 object.
