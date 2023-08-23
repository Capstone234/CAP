
import React, {useState} from 'react'
import MyCheckbox from '../MyCheckbox';
import {fireEvent, render, screen} from "@testing-library/react-native";
import {StyleSheet} from "react-native";


describe("<MyCheckbox />", () => {

    it("is unchecked by default", () => {
        render(<MyCheckbox onUpdate={() => {}}/>);
        expect(screen.queryByTestId("checkmark")).toBeNull();
    });

    it("is checked when pressed", () => {
        let checked = false;
        const checkBox = <MyCheckbox onUpdate={() => checked = !checked} />;
        expect(checked).toBeFalsy();
        fireEvent(checkBox, 'onUpdate', {nativeEvent: {}});
        expect(checked).toBeTruthy();
    });

    it("is unchecked when pressed twice", () => {
        let checked = false;
        const checkBox = <MyCheckbox onUpdate={() => checked = !checked} />;
        expect(checked).toBeFalsy();
        fireEvent(checkBox, 'onUpdate', {nativeEvent: {}});
        expect(checked).toBeTruthy();
        fireEvent(checkBox, 'onUpdate', {nativeEvent: {}});
        expect(checked).toBeFalsy();
    });

    it("calls onUpdate when pressed", () => {
        const onUpdate = jest.fn();
        const checkBox = <MyCheckbox onUpdate={onUpdate} />;
        expect(onUpdate).toHaveBeenCalledTimes(0);
        fireEvent(checkBox, 'onUpdate', {nativeEvent: {}});
        expect(onUpdate).toHaveBeenCalledTimes(1);
    });

    it("has no checkmark when checked is false", () => {
        render(<MyCheckbox checked={false} />);
        expect(screen.queryByTestId("checkmark")).toBeNull();
    });

    it("calls onCheckmarkPress when pressed", () => {
        const pressedCallback = jest.fn();
        const checkbox = <MyCheckbox onPress={pressedCallback}/>;
        expect(pressedCallback).toHaveBeenCalledTimes(0);
        fireEvent(checkbox, 'onPress', {nativeEvent: {}});
        expect(pressedCallback).toHaveBeenCalledTimes(1);
    });

    it("works", () => {
        const onUpdateMock = jest.fn();
        render(<MyCheckbox onUpdate={onUpdateMock} />);

        expect(onUpdateMock).toHaveBeenCalledTimes(0);
        expect(screen.queryByTestId("checkmark")).toBeNull();

        const pressable = screen.getByTestId("Pressable");
        fireEvent.press(pressable);

        expect(onUpdateMock).toHaveBeenCalledTimes(1);
    });

});