/**
 * Creating Lambda Functions using https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html#async-typescript
 */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { deleteUser } from './s3';

export const deleteHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log(event.body);

    const body = event.body || ('{}' as any);
    const deletedUser = await deleteUser(body.id);
    return {
      statusCode: 200,
      body: JSON.stringify(deletedUser)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
