import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class SimpleLambdaAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Lambda関数の定義
    const myLambda = new lambda.Function(this, 'MySimpleLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
    });

    // 2. API Gatewayの定義とLambdaとの連携
    const api = new apigateway.RestApi(this, 'MySimpleApi', {
      restApiName: 'My Simple API',
    });

    const integration = new apigateway.LambdaIntegration(myLambda);
    api.root.addMethod('GET', integration); // GETリクエストでLambdaを呼び出す
  }
}
