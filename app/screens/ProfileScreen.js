import { useQuery } from "@apollo/client"
import { GET_PROFILE } from "../queries"
import { View, Text, Button } from "react-native"
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store'
import { useEffect } from "react";

const Profile = (props) => {
    const { navigation } = props;
    const navigate = useNavigation();

    const { loading, error, data } = useQuery(GET_PROFILE);

    const logout = async () => {
        await SecureStore.deleteItemAsync("access_token")
        navigate.navigate('Login')
    }

    const renderProfileCard = () => {
        return (
            <>
                <View style={styles.profileCard}>
                    <Text>Username: </Text>
                    <Text>{data.getProfile.username}</Text>
                </View>
                <View style={styles.profileCard}>
                    <Text>Name: </Text>
                    <Text>{data.getProfile.name}</Text>
                </View>
                <View style={styles.profileCard}>
                    <Text>Followers: </Text>
                    <Text>{data.getProfile.Followers?.length}</Text>
                </View>
                <View style={styles.profileCard}>
                    <Text>Following: </Text>
                    <Text>{data.getProfile.Followings?.length}</Text>
                </View>
            </>
        )
    }

    if (loading) return
    <View style={styles}>
        <Text>Loading ...</Text>
    </View>
    if (error) console.log(error);

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Profile</Text>
                {renderProfileCard()}
                {/* <Text>Username: {data.getProfile.username}</Text>
                <Text>name: {data.getProfile.name}</Text>
                <Text>Followers: {data.getProfile.Followers.name}</Text>
                <Text>Followings: {data.getProfile.Followings.name}</Text> */}
                <Button title='Logout' onPress={logout} />
            </View>
        </>
    )
}

export default Profile

const styles = {
    container: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    profileCard: {
        flexDirection: 'row',
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#dadada',
        backgroundColor: '#fafafa',
        justifyContent: 'space-between',
        marginBottom: 10,
    }
}