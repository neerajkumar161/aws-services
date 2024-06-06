import {
  DeleteItemCommand,
  DeleteItemCommandInput,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  QueryCommand,
  QueryCommandInput,
  ScanCommand,
  ScanCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput
} from '@aws-sdk/client-dynamodb';


export const createItem = (input: PutItemCommandInput) => {
  return new PutItemCommand(input);
};

export const readItem = (input: GetItemCommandInput) => {
  return new GetItemCommand(input);
};

export const updateItem = (input: UpdateItemCommandInput) => {
  return new UpdateItemCommand(input);
};

export const deleteItem = (input: DeleteItemCommandInput) => {
  return new DeleteItemCommand(input);
};

export const queryTable = (input: QueryCommandInput) => {
  return new QueryCommand(input);
};

export const scanTable = (input: ScanCommandInput) => {
  return new ScanCommand(input);
};
