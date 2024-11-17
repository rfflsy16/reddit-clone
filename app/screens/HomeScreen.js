import { View, FlatList, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const data = [
    {
        id: "",
        content: "Test content",
        tags: "",
        imgUrl: "",
        authorId: "an author",
        comments: [1, 2],
        likes: "",
        createdAt: "2024-11-01",
        updatedAt: "",

    }
]
const HomeScreen = (props) => {
    const { navigation } = props;

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
                <View style={styles.cardItemTop}>
                    <Text>{content}</Text>
                    <Text>{authorId}</Text>
                </View>
                <View style={styles.cardItemBottom}>
                    <View style={styles.cardItemActions}>
                        <Text>{comments?.length}</Text>
                        <FontAwesome5 name="comment" style={{ fontSize: 20, marginLeft: 5, }} />
                    </View>
                    <Text>{createdAt}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(it, idx) => `list-item-${idx.toString()}`}
            />
        </View>
    )
}

export default HomeScreen;

const styles = {
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
    }
};