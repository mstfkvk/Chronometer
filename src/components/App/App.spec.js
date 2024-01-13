import React from "react";
import { shallow } from "enzyme";
import App from "./App";

/**
 * Testing of outer App container
 */
describe("App Component", () => {
  it("Should render without error, check <Timer/> ", () => {
    const component = shallow(<App />);
    console.log(component.debug());
    const container = component.find(".app-container").children(); // return 1, because only 1 <Timer/>
    expect(container.length).toBe(1);
  });
});
