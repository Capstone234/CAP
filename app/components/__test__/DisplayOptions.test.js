// unit test for DisplayOptions function

it("has correct return styles", () => {
    const DisplayOptions = require("../MemoryTests/DisplayOptions");
    const updateOption = jest.fn();
    const options = ["option1", "option2"];
    const result = DisplayOptions.default({ updateOption, options });
    expect(result.props.style).toEqual({
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        margin: 10,
        color: "white"
    });
});

it("has correct return children", () => {
    const DisplayOptions = require("../MemoryTests/DisplayOptions");
    const updateOption = jest.fn();
    const options = ["option1", "option2"];
    const result = DisplayOptions.default({ updateOption, options });
    expect(result.props.children).toHaveLength(2);
    expect(result.props.children[0].key).toEqual("option1");
    expect(result.props.children[1].key).toEqual("option2");
});

it("has correct return children styles", () => {
    const DisplayOptions = require("../MemoryTests/DisplayOptions");
    const updateOption = jest.fn();
    const options = ["option1", "option2"];
    const result = DisplayOptions.default({ updateOption, options });
    expect(result.props.children[0].props.style).toEqual({
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        margin: 1
    });
    expect(result.props.children[1].props.style).toEqual({
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        margin: 1
    });
});

it("has correct optionElements", () => {
    const DisplayOptions = require("../MemoryTests/DisplayOptions");
    const updateOption = jest.fn();
    const options = ["option1", "option2"];
    const result = DisplayOptions.default({ updateOption, options });
    expect(result.props.children[0].props.children).toHaveLength(2);
    expect(result.props.children[1].props.children).toHaveLength(2);
});