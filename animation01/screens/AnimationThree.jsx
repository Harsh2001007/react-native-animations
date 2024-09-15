import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import Page from '../components/Page';

const WORDS = ["What's", 'up', 'overthinker?'];

export default function AnimationThree() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    console.log(event.contentOffset.x);
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      horizontal
      style={styles.container}
      onScroll={scrollHandler}
      scrollEventThrottle={16}>
      {WORDS.map((title, index) => {
        return (
          <Page
            key={index.toString()}
            title={title}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff',
  },
});
