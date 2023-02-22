import { clickupCdk } from '@time-loop/clickup-projen';
const project = new clickupCdk.ClickUpCdkConstructLibrary({
  author: 'ClickUp',
  authorAddress: 'devops@clickup.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  devDeps: ['@time-loop/clickup-projen'],
  name: 'cdk-s3-file-generator',
  repositoryUrl: 'https://github.com/time-loop/cdk-s3-file-generator.git',
  projenrcTs: true,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
