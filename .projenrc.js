const { clickupCdk } = require('@time-loop/clickup-projen');
const project = new clickupCdk.ClickUpCdkConstructLibrary({
  author: 'user',
  authorAddress: 'user@domain.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  devDeps: ['@time-loop/clickup-projen'],
  name: 'cdk-s3-file-generator',
  repositoryUrl: 'https://github.com/user/cdk-s3-file-generator.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
