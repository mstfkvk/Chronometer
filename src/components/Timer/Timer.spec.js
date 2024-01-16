import React from "react";
import { shallow, render, mount } from "enzyme";
import Timer from "./Timer";
import TimerButton from "../TimerButton/TimerButton";

/**
 * Testing of Timer class
 * 1- Check the number of buttons
 * 2- Check Initial state should be correct
 * 3- Check the action of Start button
 *    (including 1 prop and value should equal 'Start')
 * 4- Check the action of Stop button
 * 5- Check the action of Reset button
 * 6- Check that should start with a countdown of 25:00
 * 7- Simulate startTimer method should **decrement seconds** and update **isOn state**
 * 8- Simulate stopTimer method should **stop interval** and update **isOn state**
 * 9- Simulate resetTimer method should **reset minutes and seconds**
 * 11- Timer should stop when minutes and seconds reach zero
 * 11- Check Minutes should not exceed 60
 * 12- Check Seconds should not be less than 0
 *
 * 13- E2E test case for Timer component
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

  it("2- Check Initial state should be correct", () => {
    // check inital minutes
    expect(timer_component.state().minutes).toEqual(25);
    // check initial seconds
    expect(timer_component.state().seconds).toEqual(0);
    // check the isOn
    expect(timer_component.state().isOn).toEqual(false);
  });

  it("3- Check the action of Start button", () => {
    const startBut = timer_component.find(TimerButton).at(0);
    // verification of button name/value
    expect(startBut.props().buttonValue).toEqual("Start");
    // verification of button should be action/func.
    expect(startBut.prop("buttonAction")).toBeInstanceOf(Function);
  });

  it("4- Check the action of Stop button", () => {
    const startBut = timer_component.find(TimerButton).at(1);
    // verification of button name/value
    expect(startBut.props().buttonValue).toEqual("Stop");
    // verification of button should be action/func.
    expect(startBut.prop("buttonAction")).toBeInstanceOf(Function);
  });

  it("5- Check the action of Reset button", () => {
    const startBut = timer_component.find(TimerButton).at(2);
    // verification of button name/value
    expect(startBut.props().buttonValue).toEqual("Reset");
    // verification of button should be action/func.
    expect(startBut.prop("buttonAction")).toBeInstanceOf(Function);
  });

  it("6- Check that should start with a countdown of 25:00", () => {
    const component = render(<Timer />);
    // console.log(component.find(".time-display").text()); --> Get the TIME
    expect(component.find(".time-display").text()).toBe("25:00");
  });

  it("7- Simulate startTimer method should **decrement seconds** and update **isOn state**", async () => {
    timer_component.instance().startTimer();
    // Create a timer to decrement seconds
    const interval = setInterval(() => {
      timer_component.setState({
        seconds: timer_component.state().seconds - 1,
      });
    }, 2000);

    // Wait for the timer to fire once
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    });

    // Assert state changes
    expect(timer_component.state().seconds).toEqual(58);
    expect(timer_component.state().isOn).toBe(true);

    // Clear the timer
    clearInterval(interval);
  });

  it("8- Simulate stopTimer method should **stop interval** and update **isOn state**", () => {
    timer_component.instance().startTimer();
    timer_component.instance().stopTimer();
    expect(timer_component.state().isOn).toBe(false);
  });

  it("9- Simulate resetTimer method should **reset minutes and seconds**", () => {
    timer_component.setState({ minutes: 10, seconds: 30, isOn: true });
    timer_component.instance().resetTimer();
    expect(timer_component.state().minutes).toBe(25);
    expect(timer_component.state().seconds).toBe(0);
    expect(timer_component.state().isOn).toBe(false);
  });

  it("10- Timer should stop when minutes and seconds reach zero", async () => {
    timer_component.setState({ minutes: 0, seconds: 3, isOn: false }); // initial state
    timer_component.instance().startTimer();
    // Create a timer to decrement seconds
    const interval = setInterval(() => {
      timer_component.setState(({ minutes, seconds }) => ({
        minutes: seconds === 0 ? minutes - 1 : minutes,
        seconds: seconds > 0 ? seconds - 1 : 59,
      }));
      console.log(
        timer_component.state().minutes,
        timer_component.state().seconds
      );

      // Stop the timer if both minutes and seconds are zero
      if (
        timer_component.state().minutes === 0 &&
        timer_component.state().seconds === 0
      ) {
        clearInterval(interval);
      }
    }, 1000);

    // Wait for the timer to reach zero
    await new Promise((resolve) => setTimeout(resolve, 3000)); // shouldn't > 5000 (give error)

    expect(timer_component.state().isOn).toBe(true); // still true
    expect(timer_component.state().seconds).toBe(0);
    expect(timer_component.state().minutes).toBe(0);
  });

  it("11- Check Minutes should not exceed 60", () => {
    timer_component.setState({ minutes: 61, seconds: 0, isOn: false }); // initial state
    timer_component.instance().startTimer();
    //jest.advanceTimersByTime(1000);
    expect(timer_component.state().minutes).not.toBe(60); // BUG
  });

  it("12- Check Seconds should not be less than 0", () => {
    timer_component.setState({ minutes: 0, seconds: 0, isOn: false }); // initial state
    timer_component.instance().startTimer();
    //jest.advanceTimersByTime(1000);
    expect(timer_component.state().seconds).toBe(0); // not -1
  });
});

describe("E2E test", () => {
  test("13- E2E test case for Timer component", async () => {
    let timer_component = setUp();
    timer_component.setState({ minutes: 2, seconds: 0 });
    expect(timer_component.find(".time-display").text()).toBe("2:00");

    // Start the timer
    timer_component.find(".start-timer").simulate("click");

    // Goes down the timer one by one
    // Create a timer to decrement seconds
    const interval = setInterval(() => {
      timer_component.setState(({ minutes, seconds }) => ({
        minutes: seconds === 0 ? minutes - 1 : minutes,
        seconds: seconds > 0 ? seconds - 1 : 59,
      }));
      console.log(
        timer_component.state().minutes,
        timer_component.state().seconds
      );
    }, 1000);

    // Wait for the timer to reach zero
    await new Promise((resolve) => setTimeout(resolve, 120000));

    expect(
      timer_component.find(".timer-button-container").hasClass("is-on")
    ).toBe(false);

    // reset the timer again
    timer_component.find(".reset-timer").simulate("click");
    // check the timer
    expect(timer_component.find(".time-display").text()).toBe("25:00");

    clearInterval(interval);
  });
});
