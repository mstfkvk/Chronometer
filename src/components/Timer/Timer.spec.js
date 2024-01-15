/* eslint-disable no-unused-vars */
import React from "react";
import { shallow, render, mount } from "enzyme";
import Timer from "./Timer";
import TimerButton from "../TimerButton/TimerButton";

/**
 * Testing of Timer class
 * 1- Check the number of buttons
 * 2- Check the action of Start button
 *    (including 1 prop and value should equal 'Start')
 * 3- Check the action of Stop button
 * 4- Check the action of Reset button
 * 5- Check that should start with a countdown of 25:00
 */

const setUp = (props = {}) => {
  const component = shallow(<Timer {...props} />);
  return component;
};

describe("Timer Component Unit Tests", () => {
  let timer_component;
  beforeEach(() => {
    timer_component = setUp();
  });

  it("1- Check the number of buttons", () => {
    //const timer_component = shallow(<Timer />);
    //console.log(timer_component.debug());

    const timerButton_contatiner = timer_component
      .find(".timer-button-container")
      .children();
    expect(timerButton_contatiner.length).toBe(3);
  });

  it("2- Check the action of Start button", () => {
    const startBut = timer_component.find(TimerButton).at(0);
    // verification of button name/value
    expect(startBut.props().buttonValue).toEqual("Start");
    // verification of button should be action/func.
    expect(startBut.prop("buttonAction")).toBeInstanceOf(Function);
  });
  it("3- Check the action of Stop button", () => {
    const startBut = timer_component.find(TimerButton).at(1);
    // verification of button name/value
    expect(startBut.props().buttonValue).toEqual("Stop");
    // verification of button should be action/func.
    expect(startBut.prop("buttonAction")).toBeInstanceOf(Function);
  });
  it("4- Check the action of Reset button", () => {
    const startBut = timer_component.find(TimerButton).at(2);
    // verification of button name/value
    expect(startBut.props().buttonValue).toEqual("Reset");
    // verification of button should be action/func.
    expect(startBut.prop("buttonAction")).toBeInstanceOf(Function);
  });
  it("5- Check that should start with a countdown of 25:00", () => {
    const component = render(<Timer />);
    // console.log(component.find(".time-display").text()); --> Get the TIME
    expect(component.find(".time-display").text()).toBe("25:00");
  });
});
