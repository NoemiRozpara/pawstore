# pawstore 🐾 
  
### ⚠ Warning! for now the repository wasn't integrated to use on Android

This repository is a sample React Native app with usage of following APIs: 
* React Navigation
* React Native Navigation
* React Animated
* React Reanimated  

![screenshot](https://github.com/NoemiRozpara/pawstore/blob/master/screens.png)

APIs are splitted on branches, so every branch show only neccessary changes. 

## Contents: 
* [master](https://github.com/NoemiRozpara/pawstore/new/master "master") - styled screens and components used in the next examples 
* [react-navigation](https://github.com/NoemiRozpara/pawstore/tree/react-navigation "react-navigation") - usage of `React Navigation` library, makes possible to open single product details' screen
* [react-navigation-test](https://github.com/NoemiRozpara/pawstore/tree/react-navigation-test "react-navigation-test") - branch [react-navigation](https://github.com/NoemiRozpara/pawstore/tree/react-navigation "react-navigation") extended by performance test - additional popups 
* [react-native-navigation](https://github.com/NoemiRozpara/pawstore/tree/react-native-navigation "react-native-navigation") - the same functionality as on [react-navigation](https://github.com/NoemiRozpara/pawstore/tree/react-navigation "react-navigation") branch, but created using `React Native Navigation` (Wix) API
* [react-native-navigation-test](https://github.com/NoemiRozpara/pawstore/new/react-native-navigation-test "react-native-navigation-test") - the same test as on [react-navigation-test](https://github.com/NoemiRozpara/pawstore/tree/react-navigation-test "react-navigation-test") branch, but using `React Native Navigation` (Wix) API
* [animated](https://github.com/NoemiRozpara/pawstore/new/animated "animated") - floating cart component (similar to FB messenger) created using `React Animated` API and `PanResponder`
* [animated-test](https://github.com/NoemiRozpara/pawstore/new/animated-test "animated-test") - cart performance test where side effect is called every gesture event to load JS thread
* [reanimated](https://github.com/NoemiRozpara/pawstore/new/reanimated "reanimated") - the same component as on [animated](https://github.com/NoemiRozpara/pawstore/new/animated "animated") branch, but using `React Reanimated` and `React Native Gesture Handler` APIs
* [reanimated-test](https://github.com/NoemiRozpara/pawstore/new/reanimated-test "reanimated-test") - the test component as on [animated-test](https://github.com/NoemiRozpara/pawstore/new/animated-test "animated-test") branch, but using `React Reanimated` and `React Native Gesture Handler` APIs

## Usage  
App was bootstrapped using standard `react-native init`. As `Reanimated`, `React Native Gesture Handler`, `React Navigation` and `React Native Navigation` manipulate native modules in some way, most checkouts between branches require app rebuild. So after every checkout do the following: 
```
yarn 
react-native link 
react-native run-ios 
```
If you have required dependencies installed and linked and just want to run app again, use:
```
yarn start
```
All additional changes mentioned in documentations (especially React Native Navigation integration) are already included in this repo, no need to do anything else. 


