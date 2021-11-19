import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import LoginPage from '../screens/LoginPage/LoginPage';
import Register from '../screens/Register/Register';

const AuthStack = createStackNavigator({
    Login: LoginPage,
    Register: Register,
}, {
    initialRouteName: 'Login',
    headerMode: "none"
})

export default AuthStack