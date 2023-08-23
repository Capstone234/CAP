import { Text, View, StyleSheet } from 'react-native';

function Badge(props) {
	return (
		<View style={[styles.container, {backgroundColor: props.color}]}>
			<Text style={styles.text}>{props.children}</Text>
		</View>
	)
};

export default Badge;

const styles = StyleSheet.create({
	container: {
		borderRadius: 5,
		margin: 5,
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10,
		alignSelf: "center"
	},
	text: {
		fontSize: 16,
		color: "white",
		textTransform: "uppercase",
		fontWeight: "bold",
		textAlign: "center",
	}
});
