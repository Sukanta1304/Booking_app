import React, { useRef, useEffect } from 'react';
import { Animated, Dimensions, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import Icon from '../components/Icon';
import { heading, text } from '../constants/globalStyles';
import { Button } from '@rneui/base';

const { height, width } = Dimensions.get('window');

const YourLogo = () => (
  <Image
    source={require('../images/logo.png')} // Update with the correct path to your logo
    style={{ width: 100, height: 100, borderRadius: 100, resizeMode: 'cover' }}
  />
);

const Login = ({ route, navigation }) => {
  const animatedTextOpacity = useRef(new Animated.Value(0)).current;
  const animatedLogoTranslateX = useRef(new Animated.Value(-100)).current;
  const animatedHeaderPosition = useRef(new Animated.Value(-100)).current;
  const animatedTextPosition = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    // Animation for the "Sign in for easier access" text
    Animated.parallel([
      Animated.timing(animatedTextOpacity, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(animatedTextPosition, {
        toValue: 0,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation for the logo to enter from the left side
    Animated.timing(animatedLogoTranslateX, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // Animation for the header to come from the top
    Animated.timing(animatedHeaderPosition, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [animatedTextOpacity, animatedTextPosition, animatedLogoTranslateX, animatedHeaderPosition]);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[styles.header, { transform: [{ translateY: animatedHeaderPosition }] }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon library={'AntDesign'} name={'close'} color={'white'} />
        </TouchableOpacity>
        <Text style={[heading, { color: 'white' }]}>Booking.com</Text>
      </Animated.View>
      <View>
        <Animated.Text
          style={[
            heading,
            { margin: 15, opacity: animatedTextOpacity, transform: [{ translateY: animatedTextPosition }] },
          ]}>
          Sign in for easier access
        </Animated.Text>
      </View>
      <Animated.View style={[styles.logoContainer, { transform: [{ translateX: animatedLogoTranslateX }] }]}>
        <YourLogo />
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Button
          title={'Continue with Google'}
          icon={{
            type: 'antdesign',
            name: 'google',
            size: 30,
            color: 'blue',
          }}
          buttonStyle={{ backgroundColor: 'transparent' }}
          containerStyle={styles.socialBtn}
          titleStyle={{ color: 'black' }}
        />
        <Button
          title={'Continue with Facebook'}
          icon={{
            type: 'font-awesome',
            name: 'facebook-f',
            size: 30,
            color: 'blue',
          }}
          buttonStyle={{ backgroundColor: 'transparent' }}
          containerStyle={styles.socialBtn}
          titleStyle={{ color: 'black' }}
        />
        <Button title={'Continue with Email'} />
      </View>
      <View style={styles.statementText}>
        <Text style={text}>
          By signing in or creating an account, you agree with our
          <Text style={[heading, { fontSize: 15 }]}>Terms & conditions</Text> and{' '}
          <Text style={[heading, { fontSize: 15 }]}>Privacy policy</Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  header: {
    width: width,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    padding: 10,
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  socialBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  statementText: {
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
