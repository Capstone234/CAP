import { StyleSheet, Dimensions } from "react-native";


export default StyleSheet.create({
    image: {
        height: Dimensions.get('window').height/5.5,
        padding: 20,
    },
    labelStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: -20,
        color: "#003A67"
    },
    imageProfile: {
        height: 70,
        width: 70,
        borderRadius: 40,
        marginBottom: 10,
    },
    textProfile: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    drawerItems: {
        backgroundColor: '#fff',
        paddingTop: 10,
        flex: 1,
    },
    bottomItemsBigView: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    bottomItemsSmallView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomItems: {
        paddingVertical: 10,
    },
    bottomItemsText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        color: "#003A67"
    },
});
