import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ADD_POST, GET_POST } from "../queries"
import { useNavigation } from "@react-navigation/native"
import { View, Text, TouchableOpacity, TextInput } from "react-native"

const addPost = (props) => {
    const { navigation } = props
    const navigate = useNavigation()
    const [input, setInput] = useState({
        content: '',
        imgUrl: '',
        tags: '',
    })
    const [addMutation, { loading, error, data }] = useMutation(ADD_POST, { refetchQueries: [GET_POST] })

    const handleSumbitPost = () => {
        if (!input.content || !input.imgUrl || !input.tags) {
            console.log("content, imageUrl, and tags is required")
            throw new Error("content, imageUrl, and tags is required")
        }

        addMutation({
            variables: {
                input: input
            }
        })

        navigate.navigate("MainTab")
    }

    const onChangeText = (type, value) => {
        setInput((prev) => {
            return {
                ...prev,
                [type]: value
            }
        })
    }

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={styles.postInput}
                    multiline
                    placeholder="What are you thinking?"
                    onChangeText={(val) => onChangeText('content', val)}
                />
                <TextInput
                    placeholder="Image URl"
                    style={styles.textinput}
                    onChangeText={(val) => onChangeText('imgUrl', val)}
                />
                <TextInput
                    placeholder="Tags"
                    style={styles.textinput}
                    onChangeText={(val) => onChangeText('tags', val)}
                />
                <TouchableOpacity style={styles.submitButton}
                    onPress={handleSumbitPost}
                >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default addPost





const styles = {
    container: {
        flex: 1,
        paddingTop: 0,
        paddingHorizontal: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    postInput: {
        borderWidth: 1,
        borderColor: '#dadada',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        height: 200,
        backgroundColor: '#fff',
        marginTop: 20,
    },
    submitButton: {
        padding: 20,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#f54242',
        marginBottom: 30,
    },
    submitButtonText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    textinput: {
        borderWidth: 1,
        borderColor: '#dadada',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
    }
};