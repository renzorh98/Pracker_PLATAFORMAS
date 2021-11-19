import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    Image,
    ScrollView,
} from 'react-native'
import * as Animatable from 'react-native-animatable'

import { BaseStyle, BaseColor } from "@config";
import { SafeAreaView, Text, Button, Icon, Header } from "@components";
import styles from "./styles";

import { onSnapshot, collection } from 'firebase/firestore'
import db, { signup, useAuth, login, logout } from '../../services/firebase'
const DURATION = 300
const Register = (props) => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [confirnPassword, setConfirnPassword] = useState('')
    const [idValidate, setIdValidate] = useState(true);
    const [secure, setSecure] = useState(true);
    const [secure2, setSecure2] = useState(true);
    const currentUser = useAuth()
    const [passwordValidate, setPasswordValidate] = useState(true);
    const [loading, setLoading] = useState(false);

    console.log(currentUser)
    async function handleSignup() {
        try {
            await signup(user, password)
        } catch {
            alert("error")
        }
    }
    async function Logout() {
        try {
            await logout()
        } catch {
            alert("error")
        }
    }

    async function handleLogin() {
        setLoading(true)
        try {
            await login(user, password)
            setLoading(false)
            props.navigation.navigate('HomePage')
        } catch {
            setLoading(false)
            alert("error")
        }
    }

    async function pickValidate() {
        if (user === '' || password === '' || confirnPassword === '') {
            setIdValidate(false)
            setPasswordValidate(false)
        } else {
            setIdValidate(true)
            setPasswordValidate(true)

            if (password !== confirnPassword) {
                alert("Contraseñas incorrectas")
            } else {
                setLoading(true)
                handleSignup()
                setLoading(false)
                props.navigation.navigate('HomePage')
            }
        }
    }

    useEffect(() => {
        onSnapshot(collection(db, "Ubicaciones"), (snapShot) => {
            console.log(snapShot.docs.map(doc => doc.data()))
        })
    })

    return (
        <View style={{ flex: 1 }}>
            <View style={[StyleSheet.absoluteFillObject,
            {
                backgroundColor: '#9FD7F1',
                height: Dimensions.get('window').height * 0.3 + 32
            }]} />
            <Header
                title="Registrate"
                renderLeft={() => {
                    return (
                        <Icon
                            name="arrow-left"
                            size={20}
                            color={BaseColor.primaryColor}
                        />
                    );
                }}
                onPressLeft={() => {
                    props.navigation.goBack();
                }}

            />

            <Image source={{ uri: "https://image.flaticon.com/icons/png/256/435/435045.png" }} style={styles.image}></Image>

            <View style={styles.bg}>
                <ScrollView>
                    <View style={styles.contain}>

                        <Animatable.View
                            style={{ width: '100%' }}
                            animation='fadeInDownBig'
                            delay={DURATION}>
                            <TextInput
                                style={[BaseStyle.textInput, { marginTop: 15, backgroundColor: 'white', fontFamily: 'Raleway' }]}
                                //onChangeText={text => setPerson({ ...person, email: text })}
                                onChangeText={text => setUser(text)}
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholder="E-mail"
                                placeholderTextColor={
                                    idValidate
                                        ? BaseColor.grayColor
                                        : BaseColor.primaryColor
                                }
                                //value={person.email}
                                value={user}
                                selectionColor={BaseColor.primaryColor}
                            />
                        </Animatable.View>

                        <Animatable.View
                            animation='fadeInDownBig'
                            delay={DURATION * 2}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1
                            }}>
                            <TextInput
                                style={[BaseStyle.textInput, { marginTop: 10, backgroundColor: 'white', fontFamily: 'Raleway' }]}
                                //onChangeText={text => setPerson({ ...person, password: text })}
                                onChangeText={text => setPassword(text)}
                                autoCorrect={false}
                                placeholder="Password"
                                secureTextEntry={secure}
                                placeholderTextColor={
                                    passwordValidate
                                        ? BaseColor.grayColor
                                        : BaseColor.primaryColor
                                }
                                //value={person.password}
                                value={password}
                                required
                                minLength={5}
                                errorText="Por favor ingrese una contraseña válida"
                                selectionColor={BaseColor.primaryColor}

                            />
                            <Icon style={{
                                right: 10,
                                alignItems: 'center',
                                position: 'absolute',
                            }}
                                name={secure ? "eye-slash" : 'eye'}
                                size={20} color={BaseColor.primaryColor}
                                onPress={() => setSecure(!secure)}
                            />
                        </Animatable.View>

                        <Animatable.View
                            animation='fadeInDownBig'
                            delay={DURATION * 3}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1
                            }}>
                            <TextInput
                                style={[BaseStyle.textInput, { marginTop: 10, backgroundColor: 'white', fontFamily: 'Raleway' }]}
                                //onChangeText={text => setPerson({ ...person, password: text })}
                                onChangeText={text => setConfirnPassword(text)}
                                /* onFocus={() => {
                                   this.setState({
                                     success: {
                                       ...this.state.success,
                                       password: true
                                     }
                                   });
                                 }}*/
                                autoCorrect={false}
                                placeholder="Confirmar Password"
                                secureTextEntry={secure2}
                                placeholderTextColor={
                                    passwordValidate
                                        ? BaseColor.grayColor
                                        : BaseColor.primaryColor
                                }
                                //value={person.password}
                                value={confirnPassword}
                                required
                                minLength={5}
                                errorText="Por favor ingrese una contraseña válida"
                                selectionColor={BaseColor.primaryColor}

                            />
                            <Icon style={{
                                right: 10,
                                alignItems: 'center',
                                position: 'absolute',
                            }}
                                name={secure2 ? "eye-slash" : 'eye'}
                                size={20} color={BaseColor.primaryColor}
                                onPress={() => setSecure2(!secure2)} />
                        </Animatable.View>


                        <Animatable.View
                            style={{ width: '100%' }}
                            animation='fadeInDownBig'
                            delay={DURATION * 4}
                        >
                            <Button
                                full
                                loading={loading}
                                style={{ marginTop: 20 }}
                                //onPress={() => props.navigation.navigate("BottomTabNavigator")}
                                onPress={pickValidate}
                            >
                                Registrarse
                            </Button>
                        </Animatable.View>
                    </View>
                </ScrollView>

            </View>
        </View>
    )
}

export default Register;

