import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  FlatList
} from 'react-native';
import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/VerbalTestsStyles/VTStyle';

function VTOne({ navigation }) {
    const getHeader = () => {
       return <><View style={uiStyle.container}>
                   <Text style={uiStyle.titleText}>Verbal Test</Text>
                   <Text style={styles.stackedText}>On the following screen will be 5 questions. Ask the person to answer and tick the box if they give the appropriate response.
                   {'\n'} {'\n'}
                   Pay attention to their answers. Are they:</Text>
               </View></>;
    };

  return (
    <View style={uiStyle.container} testID="VTOne_screen">
        <ImageBackground style={styles.image}
            source = {require('../../../assets/b3.png')}>

            <SafeAreaView style={uiStyle.container}>
                <FlatList
                  data={[
                    { key: 'Confused' },
                    { key: 'Unsure' },
                    { key: 'Not Responding Appropriately' },
                    { key: 'Unable to Respond' },
                    { key: 'Responding Incomprehensibly' }
                  ]}
                  renderItem={({ item }) => {
                    return (
                      <View style={uiStyle.container}>
                        <Text style={styles.listText}>{`\u2022 ${item.key}`}</Text>
                      </View>
                    );
                  }}
                  ListHeaderComponent={getHeader}
                />
            </SafeAreaView>
              <TouchableOpacity
                onPress={() => navigation.navigate('Verbal Test 2')}
                style={[styles.bottomButton, uiStyle.shadowProp]}
              >
                <Text style={uiStyle.buttonLabel}>I understand</Text>
              </TouchableOpacity>
        </ImageBackground>
      </View>


  );
}

export default VTOne;