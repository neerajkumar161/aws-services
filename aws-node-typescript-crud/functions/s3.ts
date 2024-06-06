import { S3 } from 'aws-sdk';
const s3Params = { Bucket: 'aws-lambda-typescript-s3-bucket', Key: 'db.json' };
const s3 = new S3({ params: s3Params });

export type TUser = {
  id: number;
  name: string;
  age: number;
};

export const createUser = async (user: { name: string; age: number }) => {
  let usersList: Array<TUser> = [];
  try {
    const data = await s3.getObject().promise();
    console.log(data);
    if (data.Body) {
      usersList = JSON.parse(data.Body?.toString());
    }

    const userContent: TUser = { id: usersList.length + 1, ...user };
    usersList.push(userContent);
    await s3.putObject({ ...s3Params, Body: JSON.stringify(usersList) }).promise();
    return userContent;
  } catch (error) {
    console.log('Error while fetching data from S3', error);
    if (error.code === 'NoSuchKey') {
      const userContent: TUser = { id: usersList.length + 1, ...user };
      usersList.push(userContent);
      await s3.putObject({ ...s3Params, Body: JSON.stringify(usersList) }).promise();
      return userContent;
    }
  }
};

export const readUser = async (userId: number) => {
  try {
    const data = await s3.getObject().promise();
    console.log(data, 'data');
    if (!data.Body) {
      throw new Error('No data found in S3');
    }

    const usersLists: Array<TUser> = JSON.parse(data.Body?.toString());

    return usersLists.find((user) => user.id === userId);
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
  try {
    const data = await s3.getObject().promise();
    console.log(data, 'data');
    if (!data.Body) {
      throw new Error('No data found in S3');
    }

    const usersList: Array<TUser> = JSON.parse(data.Body?.toString());

    const deletedUser = usersList.splice(userId - 1, 1);
    if (deleteUser.length == 0) {
      throw new Error('No user found with the given id');
    }

    await s3.putObject({ ...s3Params, Body: JSON.stringify(usersList) }).promise();

    return deletedUser;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId: number, user: { name: string; age: number }) => {
  try {
    const data = await s3.getObject().promise();
    console.log(data, 'data');
    if (!data.Body) {
      throw new Error('No data found in S3');
    }

    const usersList: Array<TUser> = JSON.parse(data.Body?.toString());

    usersList[userId - 1] = { id: userId, ...user };
    await s3.putObject({ ...s3Params, Body: JSON.stringify(usersList) }).promise();
    return usersList[userId - 1];
  } catch (error) {
    throw error;
  }
};

export const listUsers = async () => {
  try {
    const data = await s3.getObject().promise();
    console.log(data, 'data');
    if (!data.Body) {
      throw new Error('No data found in S3');
    }

    const usersList: Array<TUser> = JSON.parse(data.Body?.toString());

    return usersList || [];
  } catch (error) {
    throw error;
  }
};
