import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { REGISTER } from '../queries';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

const RegisterScreen = (props) => {
    const { navigation } = props
    const [input, setInput] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    })
    const [RegisterFn, { data, loading, error }] = useMutation(REGISTER)

    const onPressRegister = () => {
        if (!input.name || !input.username || !input.email || !input.password) {
            console.log('Name, Username, Email, and Password is required')

            return
        }

        console.log('INPUT REGISTER', input);
        RegisterFn({
            variables: {
                newUser: input
            }
        })

        navigation.push("Login")
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Hello, Welcome to Reddit</Text>
                <View style={styles.inputWrapper}>
                    <TextInput placeholder='Name'
                        autoCapitalize='none'
                        style={styles.textinput}
                        value={input.name}
                        onChangeText={(text) => setInput({
                            ...input,
                            name: text
                        })} />
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput placeholder='Username'
                        autoCapitalize='none'
                        style={styles.textinput}
                        value={input.username}
                        onChangeText={(text) => setInput({
                            ...input,
                            username: text
                        })} />
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput placeholder='Email'
                        autoCapitalize='none'
                        style={styles.textinput}
                        value={input.email}
                        inputMode='email'
                        onChangeText={(text) => setInput({
                            ...input,
                            email: text
                        })} />
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput secureTextEntry
                        autoCapitalize='none'
                        placeholder='Password'
                        style={styles.textinput}
                        value={input.password}
                        onChangeText={(text) => {
                            setInput({
                                ...input,
                                password: text
                            })
                        }}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={onPressRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RegisterScreen;

const styles = {
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    form: {
        flex: 1
    },
    inputWrapper: {

    },
    textinput: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#DADADA',
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: '#DEDEDE'
    },
    loginButton: {
        padding: 20,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#f54242',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
    }
};