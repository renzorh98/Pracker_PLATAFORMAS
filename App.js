import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import * as Font from 'expo-font'
import AppLoading from "expo-app-loading";
import { BaseColor } from "@config";

import Router from './navigation/router';


export default function App() {
  useEffect(() => {
    StatusBar.setBackgroundColor(BaseColor.primaryColor, true);
  });

  const fetchFonts = () => {
    return Font.loadAsync({
      'Raleway': require('./assets/fonts/OperatorMono-LightItalic.otf')
    });
  };

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)} />
    )
  }

  return (
    <Router />
  );
}