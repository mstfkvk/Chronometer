/* eslint-disable no-unused-vars */
import React from "react";
import { shallow } from "enzyme";
import TimerButton from "./TimerButton";

const setUp = (props = {}) => {
  const component = shallow(<TimerButton {...props} />);
  return component;
};

describe("Unit Testing of Timer Button", () => {
  let timerButton_component;
  let props = {
    buttonAction: () => {
      console.log("test");
    },
    buttonValue: "test",
  };
  beforeEach(() => {
    timerButton_component = setUp(props);
  });
  it("Check Rendering of Timer Button", () => {
    // should include one div element
    const outerContainer = timerButton_component.find(".button-container");
    expect(outerContainer.length).toEqual(1);

    // should include one p element
    const innerContainer = timerButton_component.find(".button-value");
    expect(innerContainer.length).toEqual(1);
  });
});
