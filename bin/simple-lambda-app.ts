#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SimpleLambdaAppStack } from '../lib/simple-lambda-app-stack';

const app = new cdk.App();
new SimpleLambdaAppStack(app, 'SimpleLambdaAppStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but you can deploy a single synthesized template to multiple accounts and Regions.
   */

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
