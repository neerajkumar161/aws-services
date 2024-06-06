import { createFile, readFilePromise, writeFilePromise } from './utils';
export type TUser = {
  id: number;
  name: string;
  age: number;
};
export const userLists: Array<TUser> = [];
// create CRUD functions that exposes and store the usersLists data in db.json file in current directory
export const createUser = async (user: { name: string; age: number }) => {
  await createFile();
  const content = await readFilePromise('/tmp/db.json', { encoding: 'utf-8' });

  const userList: Array<TUser> = JSON.parse(content);
  const userContent: TUser = { id: userList.length + 1, ...user };
  // Add user to the list
  userList.push(userContent);
  // Write file db.json
  await writeFilePromise('/tmp/db.json', JSON.stringify(userList));

  return userContent;
};

export const readUser = async (userId: number) => {
  // Read file db.json
  const content = await readFilePromise('/tmp/db.json', { encoding: 'utf-8' });

  const userList: Array<TUser> = JSON.parse(content);
  const userContent: TUser = userList[userId - 1];

  return userContent;
};

export const deleteUser = async (userId: number) => {
  // Read file db.json
  const content = await readFilePromise('/tmp/db.json', { encoding: 'utf-8' });

  const userList: Array<TUser> = JSON.parse(content);
  // Remove user from the list
  userList.splice(userId - 1, 1);
  // Write file db.json
  await writeFilePromise('/tmp/db.json', JSON.stringify(userList));

  return userList;
};

export const updateUser = async (userId: number, user: { name: string; age: number }) => {
  // Read file db.json
  const content = await readFilePromise('/tmp/db.json', { encoding: 'utf-8' });

  const userList: Array<TUser> = JSON.parse(content);
  userList[userId - 1] = { id: userId, ...user };
  // Write file db.json
  await writeFilePromise('/tmp/db.json', JSON.stringify(userList));

  return userList[userId - 1];
};

export const listUsers = async () => {
  // Read file db.json
  const content = await readFilePromise('/tmp/db.json', { encoding: 'utf-8' });

  const userList: Array<TUser> = JSON.parse(content);

  return userList;
};
