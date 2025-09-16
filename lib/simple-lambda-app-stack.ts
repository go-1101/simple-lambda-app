import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class SimpleLambdaAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // NodejsFunctionを使ってLambda関数を定義
    const myLambda = new NodejsFunction(this, 'MySimpleLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: 'lambda/index.ts', // <-- TypeScriptのソースコードへのパス
      handler: 'handler', // <-- 実行する関数名
    });

    // API Gatewayの定義とLambdaとの連携
    const api = new apigateway.RestApi(this, 'MySimpleApi', {
      restApiName: 'My Simple API',
    });

    const integration = new apigateway.LambdaIntegration(myLambda);
    api.root.addMethod('GET', integration);
  }
}
