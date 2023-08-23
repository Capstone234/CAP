import {View, Text} from 'react-native'
import React from 'react';

const Header = (props) => {
    return (
        <View style={{marginLeft: 15}}>
            <Text style={{fontWeight: '800', fontSize: 32, color:'#014173'}}>
                {props.name}
            </Text>
        </View>
    )
}

export default Header