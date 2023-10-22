import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/VerbalTestsStyles/VTStyle';

function VTOne({ navigation }) {
  const getHeader = () => {
    return <>
      <View style={styles.stackedTextBoxFlatListTop}>
        <Text style={styles.stackedText}>
          On the following screen will be 5 questions.
          Ask the person to answer and tick the box if they give the appropriate response.
          {'\n'}{'\n'}
          Pay attention to their answers. Are they:
        </Text>
      </View>
    </>;
  };

  const getFooter = () => {
      return <>
        <View style={styles.stackedTextBoxFlatListBottom}>
            <Text style={styles.stackedText}>
            </Text>
        </View>
      </>;
    };

  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={uiStyle.container} testID="VTOne_screen">
        <Text style={[uiStyle.titleText, uiStyle.titleTextBox]}>Verbal Test</Text>
        <ImageBackground style={styles.image}
            source = {require('../../../assets/b3.png')}>
          <SafeAreaView style={uiStyle.infoTextContainer}>
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
                <View style={styles.stackedTextBoxFlatListMiddle}>
                  <Text style={styles.listText}>{`\u2022 ${item.key}`}</Text>
                </View>
              );
            }}
            ListHeaderComponent={getHeader}
            ListFooterComponent={getFooter}
          />
          </SafeAreaView>

          <View style={uiStyle.bottomContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Verbal Test 2')}
              style={[styles.bottomButton, uiStyle.shadowProp]}
            >
              <Text style={uiStyle.buttonLabel}>I Understand</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export default VTOne;
