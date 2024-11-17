import { View, TextInput, TouchableOpacity, Text } from 'react-native';

const RegisterScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Hello, Welcome to Reddit</Text>
                <View style={styles.inputWrapper}>
                    <TextInput placeholder='Name' style={styles.textinput} />
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput placeholder='Username' style={styles.textinput} />
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput placeholder='Email' style={styles.textinput} />
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput secureTextEntry
                        placeholder='Password'
                        style={styles.textinput}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.loginButton}>
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