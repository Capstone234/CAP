import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { format, subMonths, addMonths } from 'date-fns';


const MonthPicker = ({ date, onChange }) => {

    const handlePrev = () => {
        const newDate = subMonths(date, 1);
        onChange(newDate);
    };

    const handleNext = () => {
        const newDate = addMonths(date, 1);
        onChange(newDate);
    };

    return (
        <View style={styles.row}>
            <IconButton icon='arrow-left' onPress={handlePrev} />
            <Text>{format(date, 'MMMM, yyyy')}</Text>
            <IconButton icon='arrow-right' onPress={handleNext} />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#eee',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderBottomColor: "rgba(21,21,21,0.2)",
        borderBottomWidth: 2,
    }
})

export default MonthPicker;