[@time-loop/cdk-s3-file-generator](../README.md) / Generator

# Class: Generator

## Hierarchy

- `BucketDeployment`

  ↳ **`Generator`**

## Table of contents

### Constructors

- [constructor](Generator.md#constructor)

### Properties

- [node](Generator.md#node)

### Accessors

- [deployedBucket](Generator.md#deployedbucket)
- [objectKeys](Generator.md#objectkeys)

### Methods

- [addSource](Generator.md#addsource)
- [toString](Generator.md#tostring)
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

BucketDeployment.constructor

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

BucketDeployment.node

## Accessors

### deployedBucket

• `get` **deployedBucket**(): `IBucket`

The bucket after the deployment

If you want to reference the destination bucket in another construct and make sure the
bucket deployment has happened before the next operation is started, pass the other construct
a reference to `deployment.deployedBucket`.

Note that this only returns an immutable reference to the destination bucket.
If sequenced access to the original destination bucket is required, you may add a dependency
on the bucket deployment instead: `otherResource.node.addDependency(deployment)`

#### Returns

`IBucket`

#### Inherited from

BucketDeployment.deployedBucket

___

### objectKeys

• `get` **objectKeys**(): `string`[]

The object keys for the sources deployed to the S3 bucket.

This returns a list of tokenized object keys for source files that are deployed to the bucket.

This can be useful when using `BucketDeployment` with `extract` set to `false` and you need to reference
the object key that resides in the bucket for that zip source file somewhere else in your CDK
application, such as in a CFN output.

For example, use `Fn.select(0, myBucketDeployment.objectKeys)` to reference the object key of the
first source file in your bucket deployment.

#### Returns

`string`[]

#### Inherited from

BucketDeployment.objectKeys

## Methods

### addSource

▸ **addSource**(`source`): `void`

Add an additional source to the bucket deployment

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `ISource` |

#### Returns

`void`

**`Example`**

```ts
declare const websiteBucket: s3.IBucket;
const deployment = new s3deploy.BucketDeployment(this, 'Deployment', {
  sources: [s3deploy.Source.asset('./website-dist')],
  destinationBucket: websiteBucket,
});

deployment.addSource(s3deploy.Source.asset('./another-asset'));
```

#### Inherited from

BucketDeployment.addSource

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

BucketDeployment.toString

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

BucketDeployment.isConstruct
