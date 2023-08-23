import React from 'react'
import renderer from 'react-test-renderer';
import ExpandableTab from '../ExpandableTab';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';

describe("<ExpandableTab />", () => { 
	it("contains expandable child", () => {
		const tree = renderer.create(<ExpandableTab color="green"><Text>child text</Text></ExpandableTab>).toJSON();
		expect(tree.children[0].children[1].children[0].children[0].children[0]).toBe('child text');
	});
	it("has colour based on prop", () => {
		const tree = renderer.create(<ExpandableTab color="green"></ExpandableTab>).toJSON();
		expect(tree.children[0].props.style[1].borderColor).toBe("green");
	});
	it("has the correct title", () => {
		const tree = renderer.create(<ExpandableTab title="TITLE IT HERE"></ExpandableTab>).toJSON();
		expect(tree.children[0].children[0].children[0].children[0]).toBe("TITLE IT HERE");
	});
	it("has the correct subtitle", () => {
		const tree = renderer.create(<ExpandableTab subtitle="SUBTITLE IS HERE"></ExpandableTab>).toJSON();
		expect(tree.children[0].children[0].children[1].children[0]).toBe("SUBTITLE IS HERE");
	});
	it("has the correct header", () => {
		const tree = renderer.create(<ExpandableTab header="HEADER"></ExpandableTab>).toJSON();
		expect(tree.children[0].children[1].children[0].children[0]).toBe("HEADER");
	});
	it("has the correct footer", () => {
		const tree = renderer.create(<ExpandableTab footer="FOOTER">child</ExpandableTab>).toJSON();
		expect(tree.children[0].children[1].children[1].children[0]).toBe("FOOTER");
	});
	it("expand callback is called when pressed", async () => {
		const pressedCallback = jest.fn();
        const { getByText } = render(<ExpandableTab onPress={pressedCallback} title="my tab">child text</ExpandableTab>);

		expect(pressedCallback).toHaveBeenCalledTimes(0);
        fireEvent.press(getByText("my tab"));
		expect(pressedCallback).toHaveBeenCalledTimes(1);
	});
});