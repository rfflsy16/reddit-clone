import { View, FlatList, TextInput, TouchableOpacity, Text, Image, Button } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store'
import { useMutation, useQuery } from '@apollo/client';
import { GET_POST } from '../queries';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment/moment';

// const data = [
//     {
//         id: "",
//         content: "Test content",
//         tags: "",
//         imgUrl: "",
//         authorId: "an author",
//         comments: [1, 2],
//         likes: "",
//         createdAt: "2024-11-01",
//         updatedAt: "",

//     }
// ]


const HomeScreen = (props) => {
    const access_token = SecureStore.getItem('access_token')
    const { navigation } = props;
    const navigate = useNavigation()
    const { loading, error, data } = useQuery(GET_POST)

    if (loading) return <Text>Loading ... </Text>
    if (error) console.log(error)

    const logout = async () => {
        await SecureStore.deleteItemAsync("access_token")
        navigation.push('Login')
    }
    const renderItem = ({ item }) => {
        const {
            id,
            content,
            tags,
            imgUrl,
            authorId,
            comments,
            likes,
            createdAt
        } = item

        return (
            <View style={styles.cardItem}>
                <View style={styles.cardItemTop}>
                    <Text>{content}</Text>
                    {
                        imgUrl ?
                            <Image
                                style={{ flex: 1, }}
                                source={{ uri: imgUrl }}
                                resizeMode='contain'
                            /> : null
                    }
                    {/* <Text>{authorId}</Text> */}
                </View>
                <View style={styles.cardItemBottom}>
                    <View style={styles.cardItemActions}>
                        <Text>{comments?.length}</Text>
                        <FontAwesome5 name="comment" style={{ fontSize: 20, marginLeft: 5, }} />
                    </View>
                    <Text>Posted at {moment(createdAt).format('DD MMM \'YY')}</Text>
                </View>
            </View>
        )
    }

    return (
        <>
            <View style={styles.topAction}>
                <TextInput placeholder='Search' style={styles.searchBox} />
                <TouchableOpacity style={{ padding: 5 }} onPress={() => navigate.navigate('AddPost')}>
                    <FontAwesome name="plus" style={{ fontSize: 24 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={data.getPost}
                    renderItem={renderItem}
                    keyExtractor={(it, idx) => `list-item-${idx.toString()}`}
                />
            </View>

        </>

    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: 20,
    },
    cardItem: {
        borderWidth: 1,
        height: 200,
        borderColor: '#DEDEDE',
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
    cardItemTop: {
        flex: 1,
    },
    cardItemBottom: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    cardItemActions: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profile: {
        padding: 20,
        textAlign: 'center',
        alignItems: 'center',

        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#f54242',
        marginBottom: 30,
    },
    topAction: {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchBox: {
        borderWidth: 1,
        borderColor: '#dadada',
        borderRadius: 5,
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginRight: 10,
    }

});