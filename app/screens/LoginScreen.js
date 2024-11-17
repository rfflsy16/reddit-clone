import { View, TextInput, TouchableOpacity, Text, Button } from 'react-native';

import { LoginContext } from '../contexts/LoginContext';
import { LOGIN } from '../queries';
import * as SecureStore from 'expo-secure-store'
import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = (props) => {
    const [access_token, setAccessToken] = useState(SecureStore.getItem("access_token"))
    const { navigation } = props;
    const navigate = useNavigation()
    const authContext = useContext(LoginContext)
    const [loginFn, { loading, error, data }] = useMutation(LOGIN);

    // console.log(data)

    useEffect(() => {
        if (access_token) {
            // authContext.setIsLogin(true)
            navigation.push('MainTab')
        }
    }, [access_token])

    useEffect(() => {
        if (data) {
            SecureStore.setItem("access_token", data.login.access_token)
            if (data.login.access_token) {
                setAccessToken(data.login.access_token)
            }
        }
    }, [data])

    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const onRegisterPress = () => {
        navigation.push('Register')
    }
    const onPressLogin = () => {
        // if (!input.email || !input.password) throw new Error("Email and password is required");

        loginFn({
            variables: {
                user: input
            }
        })

        if (access_token) {
            navigate.navigate("MainTab")
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View>
                    <TouchableOpacity style={styles.registerButton}
                        onPress={onRegisterPress}
                    >
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>Enter Your Login Information</Text>
                <View style={styles.inputWrapper}>
                    <TextInput placeholder='Email'
                        autoCapitalize='none'
                        style={styles.textinput}
                        value={input.email}
                        inputMode='email'
                        onChangeText={(text) => {
                            setInput({
                                ...input,
                                email: text
                            })
                        }} />
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput secureTextEntry
                        placeholder='Password'
                        style={styles.textinput}
                        autoCapitalize='none'
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
            <TouchableOpacity style={styles.loginButton} onPress={() => onPressLogin()}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.buttonToken}>
                <Button title='Check access_token' onPress={() => console.log(SecureStore.getItem("access_token"), "<<<<<<<<<<<<")} />
            </View>
        </View>
    )
}

export default LoginScreen;

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
    },
    registerButton: {
        alignSelf: 'flex-end',
        paddingVertical: 20,
        marginBottom: 30,
    },
    buttonToken: {
        padding: 0,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    }
};