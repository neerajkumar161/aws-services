### AWS - Amazon Web Service that provides multiple cloud services so you don't need to manage on your own.
  - 
### EC2 - Elastic Computing Cloud or Infrastucture as a Service
  - A cloud computer provided by the AWS, so we run anything on the platform without any need to purchase any h/w. Means Virtual Computer on AWS. You can setup your servers, on anything on it.
  - Capabilities
    - Renting Virtual machines [EC2]
    - Store data on virtual drives [EBS]
    - Distributing load across machines [ELB]
    - Scaling the services using an auto-scaling group.
  - EC2 Sizing and Configurations options:
   - OS - Linux or Windows
   - CPU, RAM, Storage Space, Network card, Firewall rules, Bootstrap Script (configure at first launch)
   - 5 types of EC2 instances available.

### LAMBDA - Functions as a Service (FaaS), aks Serverless.
  -  Why we need to purchase complete server while we can run `functions` to do some tasks on the cloud.
  - Simply upload your code and choose `event` that should decide when should your code runs.
  - Traffic Scaling and Networking are all things are that happen entirely in the backgroud.
  - And unlike a `complete server`, you pay for as per `request` and `computing time` that you use.

### S3 - Simple Storage Service. First product offered by AWS
  - To upload files on the AWS.
  - Any type of file or object can be store on s3.
  - More than a storage 
   - Data Ingestion Pipeline -> To consume Stock Market Data
      - Some Service -> Dump to S3
      - Contains S3 event so you can notify things using for example AWS lambda
      - Event trigger from s3 bucket -> invoke the Lambda function.
    - Analytics and Dashboarding
    - Event Driven Architectures -> 
      - Cutomer -> Image Upload to S3 bucket -> use s3 PUT event -> invoke the AWS lambda function to things on image -> Notify user using GraphQL service provided by AWS Appsync

### DynamoDB - Document Database or NoSQL databse.
  - https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html
  - Very easy to scale horizontally.
  - Scales, Fast and Cheap. [Provides fast read performance]
  - No Joins and Limited Queries.
  - Fully Managed NoSQL database service.
  - High availability and durability

### Amazon Route 53 - DNS service provided by AWS with 100% availability.
  - DNS is like a phonebook for the internet, that translate your url address to IP address.
  - Distributed nature of the service.
  - Can be used to link other AWS Services like S3, EC2, Lambda.
  <!-- https://chatgpt.com/share/67fbe3c0-c373-4619-8da6-41df2d61b573 -->
  - Key concepts:
    - Domain Registration: Can purchase and manage domain name in Route 53
    - DNS Routing: Translate human redable url to IP address.
    - Health Checks: Router 53 can monitor the health of your resources and route traffic only to healthy instances.
    - Traffic Policies: Create traffic policies for complex routing configurations.
  - Basic Components:
    - Hosted zones: A container for records, defines where you want to route traffic for a specific domain.
    - Record Sets: Individual DNS records within hosted zones that specify how you want to route traffic of a particular domain or subdomain. 
  - Example, you have domain www.neerajkumar.com and one ec2 instance for a node server or web application.
  - Now using Router 53, when user goes to www.neerajkumar.com it should redirect to ec2 nodejs instance,
  - So using Route 53, we can create records set to redirect to ec2 instance.
  - we can create alias for sub domain as well. eg. users.neerajkumar161.com