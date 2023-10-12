import React from 'react';
import { View, Text, PanResponder } from 'react-native';

const CustomSlider = ({ value, onValueChange, minimumValue, maximumValue, step }) => {
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      const width = maximumValue - minimumValue;
      const thumbValue = Math.round(
        ((gestureState.moveX - 30) / 250) * width + minimumValue
      );

      if (thumbValue >= minimumValue && thumbValue <= maximumValue) {
        onValueChange(thumbValue);
      }
    },
  });

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: '#003A67',
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>{value}</Text>
        </View>
        <View
          {...panResponder.panHandlers}
          style={{
            width: 250,
            height: 30,
            backgroundColor: '#ddd',
            marginLeft: 10,
          }}
        >
          <View
            style={{
              width: ((value - minimumValue) / (maximumValue - minimumValue)) * 250,
              height: 30,
              backgroundColor: '#003A67',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CustomSlider;
