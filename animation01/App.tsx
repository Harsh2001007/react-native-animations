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

const handleRotation = (progress: Animated.SharedValue<number>) => {
  'worklet';

  return `${progress.value * 2 * Math.PI}rad`;
};

const App = () => {
  const progress = useSharedValue(0);
  const scale = useSharedValue(3);
  const bgColor = useSharedValue('purple');

  const reaimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{scale: scale.value}, {rotate: handleRotation(progress)}],
      backgroundColor: bgColor.value,
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, {duration: 3000}), 3, true);
    scale.value = withRepeat(withSpring(1, {duration: 3000}), 4, true);
    bgColor.value = withRepeat(withTiming('red', {duration: 3000}), 3, true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          {
            height: 100,
            width: 100,
            backgroundColor: 'purple',
            borderRadius: 10,
          },
          reaimatedStyle,
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
