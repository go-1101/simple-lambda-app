import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';

export class CdkTsLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Lambda関数の定義
    // NodejsFunctionコンストラクトは、src/index.tsのコードを自動でビルド・バンドルする
    const simpleLambda = new lambdaNodejs.NodejsFunction(this, 'SimpleLambdaFunction', {
      entry: 'src/index.ts', // コードのエントリーポイントを指定
      handler: 'handler', // ハンドラー関数の名前を指定
      runtime: lambda.Runtime.NODEJS_20_X, // Node.jsの最新LTSバージョンを選択
    });

    // 2. Lambda Function URLの定義
    // これにより、Lambda関数を直接呼び出すためのHTTPSエンドポイントが作成される
    const lambdaFunctionUrl = simpleLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE, // 認証なしでパブリックにアクセス可能に設定
    });

    // 3. デプロイ後のエンドポイントURLを出力
    // これにより、cdk deploy完了後にURLがターミナルに表示される
    new cdk.CfnOutput(this, 'LambdaFunctionUrl', {
      value: lambdaFunctionUrl.url,
      description: 'The URL for the simple Lambda function endpoint.',
    });
  }
}
