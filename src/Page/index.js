'use strict'
import React, { Component } from "react";
import { Image, View, StyleSheet, YellowBox, TouchableOpacity } from "react-native";
import landing from "./landing.js";
import areas from "./detailPage"
import splashscreen from "./splashscreen"
import detailPage from "./detailPage"
import { Icon, } from "native-base";
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
const SplashNavigator = createSwitchNavigator(
  {
    splashscreen: { screen: splashscreen, navigationOptions: { header: null }},
  },
  {
    headerMode: 'none',
    navigationOptions: ({ navigation }) => ({
      headerVisible: false,
      tabBarVisible: navigation.state.index < 1,
    })
  }
)
const MainScreenNavigator = createStackNavigator(
  {
    landing: { screen: landing, navigationOptions: { header: null }},
    detailPage: { screen: detailPage, navigationOptions: { header: null }},
  },
  {
    headerMode: 'none',
    navigationOptions: ({ navigation }) => ({
      headerVisible: false,
      tabBarVisible: navigation.state.index < 1,
    })
  }
)
const App =
  createSwitchNavigator({
    Splash: {
      screen: SplashNavigator,
    },
    App: {
      screen: MainScreenNavigator,
    },
  })


export default createAppContainer(App)