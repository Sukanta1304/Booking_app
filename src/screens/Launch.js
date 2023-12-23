import {Animated, Easing} from 'react-native';
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Button} from '@rneui/base';
import {heading, text} from '../constants/globalStyles';

const Launch = ({route, navigation}) => {
  const headingAnim = useRef(new Animated.Value(-100)).current;
  const imageAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headingAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
      Animated.timing(imageAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Animated.Text
          style={[heading, {marginLeft: headingAnim}]}>
          Booking.com
        </Animated.Text>
      </View>
      <View style={styles.textContainer}>
        <Animated.Image
          source={require('../images/logo.png')}
          style={[styles.imageStyle, {opacity: imageAnim}]}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={heading}>Welcome to Booking.com</Text>
        <Text style={text}>
          Discover a wide range of flight, hotels and cars
        </Text>
      </View>
      <View>
        <Button
          title={'Go ahead'}
          containerStyle={{
            width: '90%',
            borderRadius: 10,
            alignSelf: 'center',
            marginVertical: 10,
          }}
          buttonStyle={{backgroundColor: 'white'}}
          titleStyle={{color: 'black'}}
          onPress={() => navigation.navigate('Main',{screen:'Home'})}
        />
        <Button
          title={'Login'}
          containerStyle={{width: '90%', borderRadius: 10, alignSelf: 'center'}}
          onPress={()=>navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

export default Launch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginTop: 20,
  },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 100,
  },
});
