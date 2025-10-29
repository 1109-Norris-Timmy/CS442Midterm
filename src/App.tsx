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
import { generateClient } from 'aws-amplify/data';
import outputs from '../amplify_outputs.json';

/**
 * @type {import('aws-amplify/data').Client<ImportAttributes('../amplify/data/resource').Schema>}}
 */

Amplify.configure(outputs);

const client = generateClient({
    authMode: "userPool",
});

export default function App() {
    const [userprofiles, setUserProfiles]= useState([]);
    const {signOut} = useAuthenticator((context) => [context.user]);

    useEffect(() => {
        fetchUserProfiles();
    }, []);

    async function fetchUserProfiles() {
        const result = await client.query.userprofile.findMany();
        setUserProfiles(result);
    }

    return (
        <View padding="20px">
            <Flex direction="row" justifyContent="space-between" alignItems="center">
                <Heading level={3}>User Profiles</Heading>
                <Button onClick={signOut}>Sign Out</Button>
            </Flex>
            <Divider orientation="horizontal" margin="10px 0" />
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


