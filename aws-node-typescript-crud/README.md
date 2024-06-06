### AWS Lambda TypeScript
 ```bash
 ### Invoke a function
  > serverless invoke local --function create
 ### Using a body
  serverless invoke local --function create --data '{"body":{"name":"Neeraj Kumar","age":23}}'
  
  serverless invoke --function create --data '{"body":{"name":"Neeraj Kumar","age":23}}'
  # Use Function URL to invoke the functions using URLs. 
  curl -X POST https://cn4z25yla5ntkjkmg4kztiyd4i0ibtxz.lambda-url.us-east-1.on.aws/ -H "Content-Type: application/json" -d '{"name":"Neeraj Kumar 2","age":23}'
  
  ### Read User
  serverless invoke local --function read --data '{"body":{"id": 1}}'
  serverless invoke --function read --data '{"body":{"id": 1}}'

  ### Update User
  serverless invoke local --function update --data '{"body":{"id": 1, "name":"Neeraj Kumar Updated","age":20}}'
  serverless invoke --function update --data '{"body":{"id": 1, "name":"Neeraj Kumar Updated","age":20}}'

  ### List All Users
  serverless invoke local --function listAll
  serverless invoke --function listAll

  ### Delete User
  serverless invoke local --function delete --data '{"body": {"id": 1}}'
  serverless invoke --function delete --data '{"body": {"id": 1}}'
  ```
```ts
JSON.stringify({
  body: {
    name: 'Neeraj Kumar',
    age: 23
  }
});
```
  ### Credentials Path 
    > "~/.aws/credentials"