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
import {useNavigation} from '@react-navigation/native';

const handleRotation = progress => {
  'worklet';

  return `${progress.value * 2 * Math.PI}rad`;
};

export default function Home() {
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

  const navigation = useNavigation();

  function navigationToTwo() {
    navigation.navigate('Animation-2');
  }

  function navigationThree() {
    navigation.navigate('Animation-3');
  }
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
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
        </View>
      </SafeAreaView>
      <Button title="Animation Part two ->" onPress={navigationToTwo} />
      <Button title="Animation Part two ->" onPress={navigationThree} />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
  },
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderWidth: 1,
  },
});
