import { View, TextInput, TouchableOpacity, Text } from 'react-native';

const LoginScreen = (props) => {
    const { navigation } = props;

    const onRegisterPress = () => {
        navigation.push('Register')
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
                <Text style={styles.title}>Masukkan Informasi Login Kamu</Text>
                <View style={styles.inputWrapper}>
                    <TextInput placeholder='Username' style={styles.textinput} />
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput secureTextEntry
                        placeholder='Password'
                        style={styles.textinput}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
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
    }
};