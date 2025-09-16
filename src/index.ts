// src/index.ts
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

/**
 * Lambda関数が呼び出されると実行されるハンドラー関数。
 * @param event Lambdaに渡された入力イベント。
 * @returns 非同期処理の結果。この場合は、HTTPレスポンス。
 */
export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  // 環境変数からメッセージを取得、またはデフォルト値を使用
  const message = process.env.MESSAGE |

| 'Hello from Lambda!';

  // ステータスコードとレスポンスボディを含むオブジェクトを返す
  return {
    statusCode: 200,
    body: JSON.stringify({ message }),
  };
}
