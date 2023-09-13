import { clickupTs } from '@time-loop/clickup-projen';
const project = new clickupTs.ClickUpTypeScriptProject({
  authorName: 'ClickUp',
  authorEmail: 'devops@clickup.com',
  defaultReleaseBranch: 'main',
  devDeps: ['@time-loop/clickup-projen'],
  name: 'cdk-s3-file-generator',
  repository: 'https://github.com/time-loop/cdk-s3-file-generator.git',
  projenrcTs: true,
  minMajorVersion: 1,

  peerDeps: ['aws-cdk-lib', 'constructs', 'ajv'],
  // deps: ['ajv'] /* Runtime dependencies of this module. */,
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
