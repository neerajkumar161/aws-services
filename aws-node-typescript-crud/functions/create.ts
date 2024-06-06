/**
 * Creating Lambda Functions using https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html#async-typescript
 */
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createUser } from './s3';

export const createHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log(event.body, event);

    const user = event.body || ({} as any);
    const createdUser = await createUser(user);
    return {
      statusCode: 200,
      body: JSON.stringify(createdUser)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
