/* eslint-disable no-unused-vars */
import React from "react";
import { shallow } from "enzyme";
import TimerButton from "./TimerButton";
import checkPropTypes from "check-prop-types"

const setUp = (props = {}) => {
    const component = shallow(<TimerButton {...props} />);
    return component;
};

describe("Unit Testing of Timer Button", () => {
    let timerButton_component;
    beforeEach(() => {
        //timerButton_component = setUp();
    });
  it("Check Rendering of Timer Button", () => {
    // should include one div element
    // should include one p element
  });

    it("Checking Proptypes", () => {
      const propsErr=checkPropTypes
  });
});
