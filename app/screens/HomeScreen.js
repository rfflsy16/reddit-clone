import { View, FlatList, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useQuery } from '@apollo/client';
import { GET_POST } from '../queries';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment/moment';

const HomeScreen = (props) => {
    const access_token = SecureStore.getItem('access_token');
    const { navigation } = props;
    const navigate = useNavigation();
    const { loading, error, data } = useQuery(GET_POST);

    if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
    if (error) console.log(error);

    const logout = async () => {
        await SecureStore.deleteItemAsync("access_token");
        navigation.push('Login');
    };

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
        } = item;

        return (
            <View style={styles.cardItem}>
                {imgUrl && (
                    <Image
                        style={styles.cardImage}
                        source={{ uri: imgUrl }}
                        resizeMode="contain"
                    />
                )}
                <View style={styles.cardContent}>
                    <Text style={styles.cardText}>{content}</Text>
                    <Text style={styles.postedDate}>Posted on {moment(createdAt).format('DD MMM \'YY')}</Text>
                </View>
                <View style={styles.cardFooter}>
                    <View style={styles.actionIcons}>
                        <FontAwesome5 name="comment" style={styles.icon} />
                        <Text style={styles.iconText}>{comments?.length} Comments</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <>
            <View style={styles.topAction}>
                <TextInput placeholder='Search' style={styles.searchBox} />
                <TouchableOpacity style={styles.addButton} onPress={() => navigate.navigate('AddPost')}>
                    <FontAwesome name="plus" style={styles.addIcon} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={data.getPost}
                renderItem={renderItem}
                keyExtractor={(it, idx) => `list-item-${idx.toString()}`}
                contentContainerStyle={styles.listContainer}
            />
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f8',
    },
    topAction: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchBox: {
        flex: 1,
        height: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        fontSize: 16,
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addIcon: {
        color: '#ffffff',
        fontSize: 20,
    },
    listContainer: {
        paddingHorizontal: 15,
    },
    cardItem: {
        marginBottom: 15,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 16 / 9,
        resizeMode: 'contain',
        backgroundColor: '#f0f0f0',
    },
    cardContent: {
        padding: 15,
    },
    cardText: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 10,
    },
    postedDate: {
        fontSize: 14,
        color: '#888888',
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
    },
    actionIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: 18,
        color: '#007bff',
        marginRight: 5,
    },
    iconText: {
        fontSize: 14,
        color: '#555555',
    },
    loadingText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
    },
});
