import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    FlatList,
    Alert
} from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { BaseStyle, BaseColor } from "@config";
import { SafeAreaView, Text, Button, Icon, Header } from "@components";

import db, { signup, useAuth, login, logout } from '../../services/firebase'
import * as Location from 'expo-location';

import { onSnapshot, collection } from 'firebase/firestore'
//import db, { signup, useAuth, login, logout } from '../../services/firebase'
import styles from './styles'

const HomePage = (props) => {
    //VARIABLES
    const currentUser = useAuth()
    const [latitude, setLatitud] = useState()
    const [longitude, setLongitud] = useState()
    const [a, setLatitudeDelta] = useState()
    const [b, setLongitudeDelta] = useState()
    const [location, setLocation] = useState()
    const [datos, setDatos] = useState()
    const [flag, setFlag] = useState(true)
    //FUNCIONES
    async function Logout() {
        try {
            await logout()
            props.navigation.navigate('Auth')
        } catch {
            alert("error")
        }
    }

    useEffect(() => {
        CheckIfLocationEnabled()
        GetCurrentLocation()
    }) 


    if (flag) {
        onSnapshot(collection(db, "Ubicaciones"), (snapShot) => {
            var docs = []
            snapShot.docs.map(doc => docs.push(doc.data()))
            setDatos(docs)
            //console.log(docs)
        })
        setFlag(false)
    }

    const CheckIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();

        if (!enabled) {
            Alert.alert(
                'Servicio de ubicación no habilitado',
                'Habilite sus servicios de ubicación para continuar',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        } else {
            //console.log(enabled)
            //setLocationServiceEnabled(enabled);
        }
    };
    const GetCurrentLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Permisos requeridos',
                    'Acepte los usos de permisos para poder usar la aplicación',
                    [{ text: 'OK' }],
                    { cancelable: false }
                );
            }
            try {
                let { coords } = await Location.getCurrentPositionAsync({ accuracy: 6 });
                if (coords) {
                    const { latitude, longitude } = coords;
                    let response = await Location.reverseGeocodeAsync({
                        latitude,
                        longitude
                    });
                    setLatitud(coords.latitude)
                    setLongitud(coords.longitude)
                    setLatitudeDelta(0.0922)
                    setLongitudeDelta(0.0421)
                    for (let item of response) {
                        let address = `${item.street} ${item.name}, ${item.city}`;
                        //console.log(address)
                        setLocation(address)
                        //setDisplayCurrentAddress(address);
                    }
                    const loca = {
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: 0.001,
                        longitudDelta: 0.001
                    }
                    //setRegion(loca)
                }
            } catch (e) {
                console.log('getCurrentPositionAsync error', e);
                let location = await Location.getLastKnownPositionAsync();
                if (location == null) {
                    Alert.alert(
                        "Geolocation failed",
                        "Your position could not be detected",
                        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                    );
                } else {
                    //console.log(location.coords.latitude + " " + location.coords.longitude)
                    setLatitud(location.coords.latitude)
                    setLongitud(location.coords.longitude)
                    setLatitudeDelta(0.0922)
                    setLongitudeDelta(0.0421)
                    const loca = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudDelta: 0.001
                    }
                    //setRegion(loca)
                    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.coords.latitude + ',' + location.coords.longitude
                        + '&key=AIzaSyC2lXFhtyWxIwnmcqTfYCS3B8uX7uamOn0')
                        .then(res => res.json())
                        .then(response => {
                            //console.log(response.results)
                            setLocation(response.results[0].address_components[1].long_name + " " + response.results[0].address_components[0].long_name + ", " + response.results[0].address_components[2].long_name);
                            //console.log(response.results[0].address_components[1].long_name + " " + response.results[0].address_components[0].long_name + ", " + response.results[0].address_components[2].long_name);
                        },
                            (error) => {
                                setErrorMsg(error);
                            })
                }
            }
        } catch (e) {
            console.log('askAsync error', e);
            GetCurrentLocation()
        }
    };

    return (

        <View style={{
            flex: 1
        }}>
            <Header
                title={currentUser?.email}

                renderRight={() => {
                    return (
                        <Icon name="sign-out-alt" size={20} color={BaseColor.primaryColor} />
                    );
                }}
                onPressRight={
                    () => Logout()
                }
            />
            {
                latitude &&
                <MapView
                    showsUserLocation
                    followsUserLocation
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0022,
                        longitudeDelta: 0.0121,
                    }}
                    style={styles.mapView}
                    onPress={() => { }//setVisible(false)
                    }>
                    {
                        datos
                        && datos.map((friend) => (
                            <Marker
                                coordinate={{
                                    latitude: friend.location.latitude,
                                    longitude: friend.location.longitude
                                }}
                            >
                                <Icon name="street-view" size={35} color={BaseColor.primaryColor} solid />
                            </Marker>
                        ))


                    }

                </MapView>
            }

        </View>
    )
}

export default HomePage

