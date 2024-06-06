/**
 * Creating Lambda Functions using https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html#async-typescript
 */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { listUsers } from './s3';

export const listAllHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log(event.body);
    const allUsers = await listUsers();
    return {
      statusCode: 200,
      body: JSON.stringify(allUsers)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
