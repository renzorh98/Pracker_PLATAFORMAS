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
const LoginPage = (props) => {

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [idValidate, setIdValidate] = useState(true);
  const [secure, setSecure] = useState(true);
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

  

  return (
    <View style={{ flex: 1 }}>
      <View style={[StyleSheet.absoluteFillObject,
      {
        backgroundColor: '#F3B000',
        height: Dimensions.get('window').height * 0.3 + 32
      }]} />
      <Header
        title="Inicio de Sesión"
      />

      <Image source={{ uri: "https://image.flaticon.com/icons/png/256/435/435036.png" }} style={styles.image}></Image>

      <View style={styles.bg}>
        <ScrollView>
          <View style={styles.contain}>
            <Animatable.View
              animation='fadeInDownBig'
              delay={DURATION}
            >
              <TouchableOpacity
                onPress={() => { props.navigation.navigate('Register') }}
              //onPress={() => props.navigation.navigate('RegisterC')}
              >
                <Text body1 grayColor style={{ marginTop: 10 }}>
                  Registrarme
                </Text>
              </TouchableOpacity>
            </Animatable.View>

            <Animatable.View
              style={{ width: '100%' }}
              animation='fadeInDownBig'
              delay={DURATION * 2}>
              <TextInput
                style={[BaseStyle.textInput, { marginTop: 15, backgroundColor: 'white', fontFamily: 'Raleway' }]}
                //onChangeText={text => setPerson({ ...person, email: text })}
                onChangeText={text => setUser(text)}
                /*onFocus={() => {
                  this.setState({
                    success: {
                      ...this.state.success,
                      id: true
                    }
                  });
                }}*/
                autoCapitalize='none'
                autoCorrect={false}
                placeholder="ID"
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
                onChangeText={text => setPassword(text)}
                /* onFocus={() => {
                   this.setState({
                     success: {
                       ...this.state.success,
                       password: true
                     }
                   });
                 }}*/
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
                onPress={() => setSecure(!secure)} />
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
                onPress={handleLogin}
              >
                Iniciar Sesión
              </Button>
            </Animatable.View>
            <Animatable.View
              animation='bounceInLeft'
              delay={DURATION * 5}
            >
              <TouchableOpacity
                onPress={() => { }}
              //onPress={_location}
              >
                <Text body1 grayColor style={{ marginTop: 25 }}>
                  Forgot your password?
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </ScrollView>

      </View>
    </View>
  )
}

export default LoginPage;

