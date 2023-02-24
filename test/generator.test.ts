/* eslint-disable dot-notation */
// ^ Helps us test private properties like functions and fields
import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { schema } from './resources/test.schema';
import { Generator, GeneratorFileType, GeneratorProps } from '../src';

describe('Generator', () => {
  const props: Omit<GeneratorProps, 'contents'> = {
    fileType: GeneratorFileType.JSON,
    upload: {
      bucketArn: 'arn:aws:s3:1232387877:testArn:test-clickup-bucket',
      path: 'topLevelFolder',
      fileName: 'test.json',
    },
  };

  let app: App;
  let stack: Stack;
  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
  });
  // test('generateFileContents', () => {
  //   expect(new Generator(app, 'test', props)['generateFileContents']()).toEqual(props.contents);
  // });
  describe('validateFileContents', () => {
    const testCasesShouldSucceed = [
      { test: true, test1: false, testComplex: { foo: 'bar', arr: [1, 2] } },
      { test: false, test1: true, testComplex: { foo: 'buildee', arr: [1] } },
      { test: false, test1: true, testComplex: { arr: [1] } },
      { test: false, test1: true, testComplex: { yield: 'no', arr: [1] } }, // additionalProperties allowed here
    ];

    const testCasesShouldFail = [
      { test1: false, testComplex: { foo: 'bar', arr: [1, 2] } },
      { test: false, testComplex: { foo: 'buildee', arr: [1] } },
      { test: false, test1: true, testComplex: { foo: 'blah' } },
      { test: false, test1: true, testComplex: { foo: 1 } },
      { test: false, test1: true, testComplex: { arr: [1, 2, 3] } },
      { test: false, test1: true, notInSchema: 'correct', testComplex: { arr: [1, 2, 3] } },
      { test: false, test1: true, test2: true, testComplex: { arr: [1] } }, // additionalProperties NOT allowed here
    ];

    test.each(testCasesShouldSucceed)('validateFileContents succeeds properly', (testContents) => {
      const actualProps: GeneratorProps = { ...props, contents: testContents };
      expect(() =>
        new Generator(stack, 'test', actualProps)['validateFileContents'](testContents, schema),
      ).not.toThrow();
    });

    test.each(testCasesShouldFail)('validateFileContents fails properly', (testContents) => {
      const actualProps: GeneratorProps = { ...props, contents: testContents };
      expect(() => new Generator(stack, 'test', actualProps)['validateFileContents'](testContents, schema)).toThrow();
    });
  });

  describe('uploadToS3', () => {
    const actualProps: GeneratorProps = {
      ...props,
      contents: { test: true, test1: false, testComplex: { foo: 'bar', arr: [1, 2] } },
    };

    it('creates resources', () => {
      new Generator(stack, 'Generator', actualProps);
      const template = Template.fromStack(stack);
      template.hasResourceProperties('Custom::CDKBucketDeployment', {
        DestinationBucketKeyPrefix: actualProps.upload.path,
        DestinationBucketName: actualProps.upload.bucketArn.split(':').pop(),
      });
    });
  });
});
