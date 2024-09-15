import {Text, StyleSheet, View, SafeAreaView} from 'react-native';
import React, {Component} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SIZE = 70.0;
const CIRCLE_RADIUS = SIZE * 2;

export default function AnimationTwo() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={styles.circle}>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[styles.square, rStyle]} />
          </PanGestureHandler>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderWidth: 1,
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0,0,256,0.5)',
    borderRadius: 10,
  },
  circle: {
    height: CIRCLE_RADIUS * 2,
    width: CIRCLE_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0,0,256,0.5)',
  },
});
