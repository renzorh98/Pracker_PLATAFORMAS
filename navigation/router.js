import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import HomePage from '../screens/HomePage/HomePage';
import AuthStack from './auth';
import Loading from '../screens/Loading/Loading';

const AppStack = createSwitchNavigator(
    {
        Loading: Loading,
        HomePage: HomePage,
        Auth: AuthStack,
    },
    {
        initialRouteName : 'Loading'
    }
)

const Navigator = createAppContainer(AppStack)

export default function Router(props){
    return(
        <Navigator />
    )
}