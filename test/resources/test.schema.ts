import { JSONSchemaType } from 'ajv';

interface Schema {
  test: boolean;
  test1: boolean;
  test2?: number;
  testLessThanTest2?: number;
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
    test2: {
      type: 'integer',
      nullable: true,
    },
    testLessThanTest2: {
      type: 'integer',
      nullable: true,
      maximum: { $data: '1/test2' } as unknown as number,
    },
    testComplex: objSchema,
  },
  required: ['test', 'test1', 'testComplex'],
  additionalProperties: false,
};
