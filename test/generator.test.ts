/* eslint-disable dot-notation */
// ^ Helps us test private properties like functions and fields
import { App, CfnElement, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
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
      { test: false, test1: true, test2: 2, testLessThanTest2: 2, testComplex: { arr: [1] } }, // testLessThanTest2 is less than test2
    ];

    const testCasesShouldFail = [
      { test1: false, testComplex: { foo: 'bar', arr: [1, 2] } },
      { test: false, testComplex: { foo: 'buildee', arr: [1] } },
      { test: false, test1: true, testComplex: { foo: 'blah' } },
      { test: false, test1: true, testComplex: { foo: 1 } },
      { test: false, test1: true, testComplex: { arr: [1, 2, 3] } },
      { test: false, test1: true, notInSchema: 'correct', testComplex: { arr: [1, 2, 3] } },
      { test: false, test1: true, test2: true, testComplex: { arr: [1] } }, // additionalProperties NOT allowed here
      { test: false, test1: true, test2: 2, testLessThanTest2: 3, testComplex: { arr: [1] } }, // testLessThanTest2 is GREATER than test2
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
        Prune: false,
      });
    });

    it('prunes correctly when told to', () => {
      new Generator(stack, 'Generator', {
        ...actualProps,
        upload: {
          ...actualProps.upload,
          prune: true,
        },
      });
      const template = Template.fromStack(stack);
      template.hasResourceProperties('Custom::CDKBucketDeployment', {
        DestinationBucketKeyPrefix: actualProps.upload.path,
        DestinationBucketName: actualProps.upload.bucketArn.split(':').pop(),
        Prune: true,
      });
    });

    it('retains objects by default', () => {
      new Generator(stack, 'Generator', actualProps);
      const template = Template.fromStack(stack);
      template.hasResourceProperties('Custom::CDKBucketDeployment', {
        DestinationBucketKeyPrefix: actualProps.upload.path,
        DestinationBucketName: actualProps.upload.bucketArn.split(':').pop(),
        RetainOnDelete: Match.absent(),
      });
    });

    it('does not retain objects when told not to', () => {
      new Generator(stack, 'Generator', {
        ...actualProps,
        upload: {
          ...actualProps.upload,
          retainOnDelete: false,
        },
      });
      const template = Template.fromStack(stack);
      template.hasResourceProperties('Custom::CDKBucketDeployment', {
        DestinationBucketKeyPrefix: actualProps.upload.path,
        DestinationBucketName: actualProps.upload.bucketArn.split(':').pop(),
        RetainOnDelete: false,
      });
    });

    it('uses custom Lambda execution role when set', () => {
      const testRole = new Role(stack, 'TestExecutionRole', { assumedBy: new ServicePrincipal('test.amazonaws.com') });
      new Generator(stack, 'Generator', {
        ...actualProps,
        upload: {
          ...actualProps.upload,
          role: testRole,
        },
      });
      const template = Template.fromStack(stack);
      const lambda = template.findResources('AWS::Lambda::Function');
      const lambdaId = Object.keys(lambda)[0];
      // Verify BucketDeployment uses the Lambda with role set
      template.hasResourceProperties('Custom::CDKBucketDeployment', {
        ServiceToken: { 'Fn::GetAtt': [lambdaId, 'Arn'] },
      });
      // Verify Lambda uses the role
      const roleId = stack.getLogicalId(testRole.node.defaultChild as CfnElement);
      template.hasResourceProperties('AWS::Lambda::Function', {
        Role: { 'Fn::GetAtt': [roleId, 'Arn'] },
      });
    });
  });
});
