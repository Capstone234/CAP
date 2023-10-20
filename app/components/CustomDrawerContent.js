import React from 'react';
import { useContext, useState, useRef, useEffect } from 'react';
import { DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import { Alert, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserContext,
    UserRepoContext } from './GlobalContextProvider';
import styles from '../styles/CustomDrawerContentStyle';

const getIsSignedIn = () => {
    // check if profile logged in or not
    const [user] = useContext(UserContext);
    if (user.uid == 0) {
        return false;
    }
    return true;
};

const getUserName = () => {
    const [user] = useContext(UserContext);
    if (user.uid != 0) {
        return "Welcome back,\n" + user.fname;
    } else {
        return "Welcome, Guest";
    }
};

const CustomDrawerContent = (props) => {
    const [users, setUsers] = useState([]);
    const userRepoContext = useContext(UserRepoContext);
    const isSignedIn = getIsSignedIn();
    const navigation = useNavigation();
    const [userSet, toggleUserSet] = useState(true);
    const [user, setUser] = useContext(UserContext);

    // this function sets current user as default user (logs out user)
    const fetchGuestUser = async () => {
        try {
          const pts = await userRepoContext.getAllUsers();
          setUsers(pts);

        } catch (error) {
          console.log(error);
          navigation.navigate("Home Page");
        }
    };

    useEffect(() => {
        if (users.length > 0) {
          for (let i = 0; i < users.length; i++) {
            if (users[i].uid === 0 && users[i].username === 'Guest') {
              console.log("logged out");
              setUser(users[i]);
              break;
            }
          }
        }
    }, [users]);

    return (
        <View style={{flex:1}}>
        <DrawerContentScrollView testID='drawer_scrollView' accessible={true} accessibilityLabel={'drawer_scrollView'} {...props}
            contentContainerStyle={{backgroundColor:'#349BEB'}}>
          <ImageBackground source={require('../../assets/shorter_b1.png')} style={styles.image}>
            <Image source={require('../../assets/logo.png')} style={styles.imageProfile}></Image>
           <Text style={styles.textProfile}>{ getUserName() }</Text>
          </ImageBackground>
          <View style={styles.drawerItems}>
          <DrawerItemList testID='drawerItemList' {...props} />
        </View>
        </DrawerContentScrollView>
        <View style={styles.bottomItemsBigView}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Test List');
            }} style={styles.bottomItems}>
              <View style={styles.bottomItemsSmallView}>
                <Ionicons name="arrow-forward-outline" size={25} color="#003A67" />
                <Text style={styles.bottomItemsText}>
                  Continue Tests
                </Text>
              </View>
            </TouchableOpacity>
            {isSignedIn ? (
              <>
            <TouchableOpacity onPress={() => {
                Alert.alert("Log Out", "Are you sure you want to logout?", [
                    {
                      text: "Log Out",
                      onPress: () => {
                          navigation.navigate('Home Page');
                          fetchGuestUser();
                      },
                    },
                    {
                      text: "Cancel",
                      onPress: () => navigation.goBack(),
                    },
                  ]);
            }} style={styles.bottomItems} >
              <View style={styles.bottomItemsSmallView}>
                    <Ionicons name="log-out-outline" size={25} color="#003A67" />
                    <Text style={styles.bottomItemsText}>
                      Log Out
                    </Text>
              </View>
            </TouchableOpacity>
            </>
              ) :
               <TouchableOpacity onPress={() => { navigation.navigate('Continue Tests', { screen: 'Login' })}} style={styles.bottomItems} >
                 <View style={styles.bottomItemsSmallView}>
                       <Ionicons name="log-in-outline" size={25} color="#003A67" />
                       <Text style={styles.bottomItemsText}>
                         Login
                       </Text>
                 </View>
               </TouchableOpacity>}
        </View>
        </View>
    );
}

export default CustomDrawerContent;