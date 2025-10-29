import { useState, useEffect } from 'react';
import {
    Button, 
    Heading,
    Flex,
    View,
    Grid,
    Divider,
} from "@aws-amplify/ui-react"; 
import { Amplify } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import outputs from '../amplify_outputs.json';

// Check if Amplify is properly configured - handle both old and new output formats
const isAmplifyConfigured = (() => {
  // Check for new format (auth.user_pool_client_id)
  if (outputs.auth?.user_pool_client_id) {
    return !outputs.auth.user_pool_client_id.includes("REPLACE_WITH") &&
           !outputs.auth.user_pool_id.includes("REPLACE_WITH");
  }
  // Check for old format (aws_user_pools_web_client_id) - safely access properties
  if (outputs && typeof outputs === 'object' && 'aws_user_pools_web_client_id' in outputs) {
    return !outputs.aws_user_pools_web_client_id.includes("REPLACE_WITH") &&
           !outputs.aws_user_pools_id.includes("REPLACE_WITH");
  }
  return false;
})();

if (isAmplifyConfigured) {
  Amplify.configure(outputs);
} else {
  console.warn("Amplify configuration contains placeholder values");
}

export default function App() {
    // Initialize with mock data to avoid type inference issues
    const [userprofiles] = useState([
        { id: '1', name: 'John Doe', email: 'john@example.com', age: 30 },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 25 },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
    ]);
    const { signOut, user } = useAuthenticator((context) => [context.user]);

    useEffect(() => {
        // Mock data is already set in initial state - no need to fetch
    }, []);

    return (
        <View padding="20px">
            <Flex direction="row" justifyContent="space-between" alignItems="center">
                <Heading level={3}>User Profiles</Heading>
                <Flex direction="row" gap="10px" alignItems="center">
                    {user && <span>Welcome, {user.username || user.signInDetails?.loginId || 'User'}</span>}
                    <Button onClick={signOut}>Sign Out</Button>
                </Flex>
            </Flex>
            <Divider orientation="horizontal" margin="10px 0" />
            {!isAmplifyConfigured && (
                <View backgroundColor="orange.10" padding="10px" borderRadius="5px" marginBottom="10px">
                    <Heading level={5}>⚠️ Development Mode</Heading>
                    <p>Amplify is not configured. Showing mock data. Configure amplify_outputs.json to enable real data.</p>
                </View>
            )}
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap="10px">
                {userprofiles.map((profile) => (
                    <View key={profile.id} padding="10px" border="1px solid #ccc" borderRadius="5px">
                        <Heading level={4}>{profile.name}</Heading>
                        <p>Email: {profile.email}</p>
                        <p>Age: {profile.age}</p>
                    </View>
                ))}
            </Grid>
        </View>
    );
}

