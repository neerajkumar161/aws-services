import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { createItem, deleteItem, queryTable, readItem, scanTable, updateItem } from './commands';

const client = new DynamoDBClient({
  credentials: { accessKeyId: process.env.accessKeyId, secretAccessKey: process.env.secretAccessKey },
  region: 'us-east-1'
});

/**
 * Documentation DynamoDB
 * // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.CreateTable.html
 * For Advanced manipulation of data in the table, we can use the following commands
 * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/programming-with-javascript.html
 */
async function executeCommands() {
  let createCommand = createItem({
    TableName: 'Users',
    Item: {
      id: { S: '1' },
      name: { S: 'Neeraj Kumar' },
      age: { N: '25' }
    }
  });

  const getCommand = readItem({
    TableName: 'Users',
    Key: {
      id: { S: '1' },
      name: { S: 'Neeraj Kumar' }
    }
  });

  const updateCommand = updateItem({
    TableName: 'Users',
    Key: {
      // Both keys are required to update the item, because we have defined the primary key as a composite key
      id: { S: '1' },
      name: { S: 'Neeraj Kumar' }
    },
    UpdateExpression: 'set age = :age',
    ExpressionAttributeValues: {
      ':age': { N: '30' }
    },
    ReturnValues: 'ALL_NEW'
  });

  const deleteCommand = deleteItem({
    TableName: 'Users',
    Key: {
      id: { S: '1' },
      name: { S: 'Neeraj Kumar' }
    }
  });

  const queryTableCommand = queryTable({
    TableName: 'Users',
    KeyConditionExpression: 'id = :id AND #name = :nameQuery', // name is resvered keyword in dynamodb, so we need to use ExpressionAttributeNames
    ExpressionAttributeValues: {
      ':id': { S: '1' },
      ':nameQuery': { S: 'Neeraj Kumar' }
      // ':age': { N: '10' }
    },
    ExpressionAttributeNames: {
      '#name': 'name'
    },
    ConsistentRead: true
  });

  // Filter records with scan table
  const scanTableCommand = scanTable({
    TableName: 'Users',
    // FilterExpression: '#name = :name AND age > :age',
    FilterExpression: 'age > :age',
    ExpressionAttributeValues: {
      // ':name': { S: 'Neeraj Kumar' },
      ':age': { N: '20' }
    }
    // ProjectionExpression: '#Name, age',
    // ExpressionAttributeNames: { '#name': 'name' }
  });

  const response = await client.send(scanTableCommand);
  console.log(response.Items);
}

executeCommands();

async function execDynamoDB() {
  const command = new CreateTableCommand({
    TableName: 'Users',
    // Acting as a primary key
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' },
      { AttributeName: 'name', AttributeType: 'S' }
      // { AttributeName: 'Age', AttributeType: 'N' }
    ],
    // Primary key Schema, they define how attributes will store internally in the table
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' },
      { AttributeName: 'name', KeyType: 'RANGE' }
      // { AttributeName: 'Age', KeyType: 'RANGE' }
    ],
    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
  });

  const response = await client.send(command);
  console.log(response);
}
// Table creation
// execDynamoDB();
