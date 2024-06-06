/**
 * Creating Lambda Functions using https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html#async-typescript
 */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { updateUser } from './s3';

export const updateHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log(event.body);

    const body = event.body || ('{}' as any);
    const updatedUser = await updateUser(body.id, body);

    return {
      statusCode: 200,
      body: JSON.stringify(updatedUser)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
