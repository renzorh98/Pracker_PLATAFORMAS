import React, { useState, useEffect } from 'react';
import styles from "./styles";
import { StatusBar, ActivityIndicator, View, Image, Animated } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { Images, BaseColor } from "@config";

import { useAuth } from '../../services/firebase';

export default function Loading(props) {
  const currentUser = useAuth()

  useEffect(() => {
    const timeout = setTimeout(() => {
      if( currentUser !== null){
        props.navigation.navigate('HomePage')
      }else{
        props.navigation.navigate('Auth')
      }
      //props.navigation.navigate('Auth')
    }, 1500);
  }, [currentUser]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='rgba(0,0,0,0.2)' />
      <Image
        source={Images.logo}
        style={styles.logo} resizeMode="contain" />
      <ActivityIndicator
        size="large"
        color={BaseColor.whiteColor}
        style={{
          marginTop: 20
        }}
      />
    </View>
  );
};