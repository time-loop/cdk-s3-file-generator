import { JSONSchemaType } from 'ajv';

interface Schema {
  test: boolean;
  test1: boolean;
  testComplex: { foo?: string; arr: number[] };
}

const arrSchema: JSONSchemaType<Schema['testComplex']['arr']> = {
  type: 'array',
  items: {
    maximum: 2,
    type: 'integer',
  },
};

const objSchema: JSONSchemaType<Schema['testComplex']> = {
  type: 'object',
  properties: {
    foo: { type: 'string', nullable: true },
    arr: arrSchema,
  },
  required: ['arr'],
};

export const schema: JSONSchemaType<Schema> = {
  type: 'object',
  properties: {
    test: {
      type: 'boolean',
    },
    test1: {
      type: 'boolean',
    },
    testComplex: objSchema,
  },
  required: ['test', 'test1', 'testComplex'],
  additionalProperties: false,
};
