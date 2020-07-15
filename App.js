import React, { Component } from "react";
import { View, AppRegistry, YellowBox } from "react-native";
import App from "./src/Page/index.js";
export default class testRN extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  render() {
    return (
        <App />
    )
  }
}