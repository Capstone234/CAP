import {StyleSheet} from 'react-native';
import uiStyle from '../../uiStyle';

export default StyleSheet.create({
  circleContainerTop: {
    ...uiStyle.contentContainer,
    justifyContent: 'flex-start',
  },
  circleContainerBot: {
    ...uiStyle.contentContainer,
    justifyContent: 'flex-end',
  },
});
