/**
 * Creating Lambda Functions using https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html#async-typescript
 */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { readUser } from './s3';

export const readHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log(event.body);

    const body = event.body || ('{}' as any);
    const fetchedUser = await readUser(body.id);
    return {
      statusCode: 200,
      body: JSON.stringify(fetchedUser)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
