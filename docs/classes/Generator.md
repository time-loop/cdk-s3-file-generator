[@time-loop/cdk-s3-file-generator](../README.md) / Generator

# Class: Generator

## Hierarchy

- `Construct`

  ↳ **`Generator`**

## Table of contents

### Constructors

- [constructor](Generator.md#constructor)

### Properties

- [\_contents](Generator.md#_contents)
- [\_fileType](Generator.md#_filetype)
- [\_serializerProps](Generator.md#_serializerprops)
- [\_uploadProps](Generator.md#_uploadprops)
- [node](Generator.md#node)

### Methods

- [generateFileContents](Generator.md#generatefilecontents)
- [toString](Generator.md#tostring)
- [uploadToS3](Generator.md#uploadtos3)
- [validateFileContents](Generator.md#validatefilecontents)
- [isConstruct](Generator.md#isconstruct)

## Constructors

### constructor

• **new Generator**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`GeneratorProps`](../interfaces/GeneratorProps.md) |

#### Overrides

Construct.constructor

## Properties

### \_contents

• `Private` `Readonly` **\_contents**: `any`

___

### \_fileType

• `Private` `Readonly` **\_fileType**: [`JSON`](../enums/GeneratorFileType.md#json)

___

### \_serializerProps

• `Private` `Optional` `Readonly` **\_serializerProps**: [`SerializerProps`](../interfaces/SerializerProps.md)

___

### \_uploadProps

• `Private` `Readonly` **\_uploadProps**: [`UploadProps`](../interfaces/UploadProps.md)

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

## Methods

### generateFileContents

▸ `Private` **generateFileContents**(): `any`

#### Returns

`any`

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

Construct.toString

___

### uploadToS3

▸ `Private` **uploadToS3**(): `void`

#### Returns

`void`

___

### validateFileContents

▸ `Private` **validateFileContents**(`contents`, `schema?`): `void`

Ensures the contents adhere to the schema, and the values adhere to
validator specifications.

**`Throws`**

if the contents do not match the provided schema

#### Parameters

| Name | Type |
| :------ | :------ |
| `contents` | `any` |
| `schema?` | `SchemaObject` |

#### Returns

`void`

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `any` | Any object |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

Construct.isConstruct
