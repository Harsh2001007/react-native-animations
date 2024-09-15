import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {watchFolders} from '../metro.config';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const SIZE = width * 0.7;

export default function Page({index, title, translateX}) {
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, SIZE / 2, 0],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{scale}],
      borderRadius,
    };
  });
  return (
    <View
      style={[
        styles.pageContainer,
        {backgroundColor: `rgba(0,0,256,0.${index + 2})`},
      ]}>
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={{position: 'absolute'}}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0,0,256,0.4)',
  },
  text: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
