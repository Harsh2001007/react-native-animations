import 'react-native-gesture-handler';
import {View, Text, SafeAreaView, Button, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import AnimationTwo from './screens/AnimationTwo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

const handleRotation = (progress: Animated.SharedValue<number>) => {
  'worklet';

  return `${progress.value * 2 * Math.PI}rad`;
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="App">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home screen',
          }}
        />
        <Stack.Screen
          name="Animation-2"
          component={AnimationTwo}
          options={{
            title: 'Animation - part two',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
