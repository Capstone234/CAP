import React from 'react';
import { useContext, useState, useRef, useEffect } from 'react';
import { DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Alert, View, Text, ImageBackground, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { UserContext, UserRepoContext } from './GlobalContextProvider';
import styles from '../styles/CustomDrawerContentStyle';

const getIsSignedIn = () => {
    // check if profile logged in or not
    const [user] = useContext(UserContext);
    if (user.uid == 0) {
        return false;
    }
    return true;
};

const CustomDrawerContent = (props) => {
    const [users, setUsers] = useState([]);
    const userRepoContext = useContext(UserRepoContext);
    const isSignedIn = getIsSignedIn();
    const navigation = useNavigation();
    const mounted = useRef(false);
    const focussed = useIsFocused();
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        mounted.current = true;
        return () => {
          mounted.current = false;
        };
      }, []);

    useEffect(() => {
        if (focussed) {
            // Everytime there is a new userRepoContext we get users from it.
            if (userRepoContext !== null) {
                userRepoContext.getAllUsers().then((pts) => {
                if (mounted.current) {
                    setUsers(pts);
                }
            });}
        }
    }, [focussed]);

    // this function sets current user as default user (logs out user)
    const setGuestUser = () => {
        if (userRepoContext !== null) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].uid == 0 && users[i].username == 'Guest')
                {
                  setUser(users[i]);
                  return true;
                }
              }
        }
        return false;
    }

    return (
        <View style={{flex:1}}>
        <DrawerContentScrollView testID='drawer_scrollView' accessible={true} accessibilityLabel={'drawer_scrollView'} {...props}
            contentContainerStyle={{backgroundColor:'#349BEB'}}>
          <ImageBackground source={require('../../assets/shorter_b1.png')} style={styles.image}>
            <Image source={require('../../assets/logo.png')} style={styles.imageProfile}></Image>
           <Text style={styles.textProfile}>User Name</Text>
          </ImageBackground>
          <View style={styles.drawerItems}>
          <DrawerItemList testID='drawerItemList' {...props} />
          {isSignedIn ? (
              <>
                  <View>
                      <DrawerItem
                        label={() => <Text style={styles.labelStyle}>Log Out</Text>}
                        icon={() => <Ionicons name="log-out-outline" size={25} color="#003A67" />}
                        onPress={() => {
                          Alert.alert("Log Out", "Are you sure you want to logout?", [
                            {
                              text: "Log Out",
                              onPress: () => {
                                  setGuestUser(),
                                  navigation.navigate('Home Page')},
                            },
                            {
                              text: "Cancel",
                              onPress: () => navigation.goBack(),
                            },
                          ]);
                         }}
                      />
                  </View>
              </>
          ) : null }
        </View>
        </DrawerContentScrollView>
        <View>
            <Text>blahblah ignore me</Text>
        </View>
        </View>
    );
}

export default CustomDrawerContent;