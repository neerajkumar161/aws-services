import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'aws-node-typescript-crud',
  frameworkVersion: '3.38.0',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',  // Not used Node.js18.x because,there are major changes in AWS SDKv3, since Node.js 18 uses AWS SDKv3, it is not compatible with the current code.
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'
    }
  },

  // Import function via paths
  functions: {
    create: {
      handler: 'functions/create.createHandler',
      events: [
        {
          http: {
            method: 'post',
            path: 'create'
          }
        }
      ]
    },
    read: {
      handler: 'functions/read.readHandler',
      events: [
        {
          http: {
            method: 'post',
            path: 'read'
          }
        }
      ]
    },
    delete: {
      handler: 'functions/delete.deleteHandler',
      events: [
        {
          http: {
            method: 'post',
            path: 'delete'
          }
        }
      ]
    },
    update: {
      handler: 'functions/update.updateHandler',
      events: [
        {
          http: {
            method: 'post',
            path: 'update'
          }
        }
      ]
    },
    listAll: {
      handler: 'functions/listAll.listAllHandler',
      events: [
        {
          http: {
            method: 'post',
            path: 'listAll'
          }
        }
      ]
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      // exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10
    }
  }
};

module.exports = serverlessConfiguration;
