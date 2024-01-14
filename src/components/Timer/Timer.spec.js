/* eslint-disable no-unused-vars */
import React from "react";
import { shallow } from "enzyme";
import Timer from "./Timer";

/**
 * Unit and Integration Testing of Timer class
 * 1-
 * 2-
 */

const setUp = (props = {}) => {
  const component = shallow(<Timer {...props} />);
  return component;
};

describe("Timer Component Tests", () => {
  let timer_component;
  beforeEach(() => {
    timer_component = setUp();
  });

  it("Check the number of Buttons", () => {
    //const timer_component = shallow(<Timer />);
    //console.log(timer_component.debug());

    const timerButton_contatiner = timer_component
      .find(".timer-button-container")
      .children();
    expect(timerButton_contatiner.length).toBe(3);
  });
});
