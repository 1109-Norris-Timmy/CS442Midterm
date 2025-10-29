import outputs from '../amplify_outputs.json';

// Lightweight shim: convert amplify_outputs.json to the shape Amplify.configure expects.
// This file intentionally doesn't call Amplify.configure itself; it only exports the config object
// so that existing imports (`import awsconfig from './aws-exports'`) resolve.

const awsconfig = {
  aws_project_region: outputs.aws_project_region || 'us-east-1',
  Auth: {
    // Amplify expects these keys when configuring Auth
    region: outputs.aws_cognito_region || outputs.aws_project_region || 'us-east-1',
    userPoolId: outputs.aws_user_pools_id || undefined,
    userPoolWebClientId: outputs.aws_user_pools_web_client_id || undefined,
    identityPoolId: outputs.aws_cognito_identity_pool_id || undefined,
  },
  aws_appsync_graphqlEndpoint: outputs.aws_appsync_graphqlEndpoint,
  aws_appsync_region: outputs.aws_appsync_region || outputs.aws_project_region,
  aws_appsync_authenticationType: outputs.aws_appsync_authenticationType,
};

export default awsconfig;
