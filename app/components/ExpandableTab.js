import * as React from 'react';
import { Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import { useState, useRef } from 'react';
import { back, ease } from 'react-native/Libraries/Animated/Easing';

const ExpandableTab = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const heightAnim = useRef(new Animated.Value(0)).current;
	const buttonAnim = useRef(new Animated.Value(1)).current;

	const onPress = () => {
		if(props.children != null){
			setIsOpen((current) => {
				if(current){
					Animated.timing(heightAnim, {
						toValue: 0,
						duration: 300,
						useNativeDriver: false, // unfortunately we can't use the native driver for animating the height :(
					  }).start();	
				}else{
					Animated.timing(heightAnim, {
						toValue: 1000,
						duration: 500,
						useNativeDriver: false,
					  }).start();
				}
				return !current;
			});
			
		}
	};

	const onPressIn = () => {
		Animated.timing(buttonAnim, {
			toValue: 1.02,
			duration: 200,
			useNativeDriver: true,
		  }).start();
	};

	const onPressOut = () => {
		Animated.timing(buttonAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		  }).start();
	};

	return (
		<Animated.View style={{transform: [{scale: buttonAnim}]}}>
			<Pressable style={[styles.container, {borderColor: props.color}]} onPress={() => {onPress(); if(props.onPress) props.onPress()}} onPressIn={onPressIn} onPressOut={onPressOut}>
				<View style={styles.topRowContainer}>
					<Text style={[styles.titleText, {backgroundColor: props.color, borderColor: props.color}]}>{props.title}</Text>
					<Text style={styles.infoText}>{props.subtitle}</Text>
				</View>
				<Animated.View style={[styles.collapsableContainer, {borderColor: props.color}, {maxHeight: heightAnim}]}>
					{props.header && <Text style={[styles.footer, {backgroundColor: props.color, borderColor: "white", borderWidth: 10}]}>{props.header}</Text> }  
					<View style={styles.childrenContainer}>{props.children}</View>
					{props.footer && <Text style={[styles.footer, {backgroundColor: props.color}]}>{props.footer}</Text> }  
				</Animated.View>
			</Pressable>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderColor: "red",
		borderWidth: 3,
		borderRadius: 2,
		margin: 10,
		backgroundColor: "white"
	},

	titleText: {
		color: "white",
		fontWeight: "bold",
		borderColor: "red",
		backgroundColor: "red",
		borderWidth: 5,
		padding: 10,
		alignSelf: "stretch",
		flex: 1,
		textAlign: "center"
	},

	infoText: {
		fontSize: 12,
		padding: 10,
		flex: 4,
		textAlign: "center",
		textTransform: "uppercase"
	},

	topRowContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: 'space-between',
	},

	tabBase: {
		width: 300,
		height: 100,
	},

	collapsableContainer: {
		overflow: "hidden",
		display: "flex",
		justifyContent: "center",
		alignItems: "stretch",
	},

	footer: {
		color: "white",
		fontWeight: "bold",
		padding: 10,
		textAlign: "center",
	},

	childrenContainer: {
		padding: 10,
	}
});

export default ExpandableTab;