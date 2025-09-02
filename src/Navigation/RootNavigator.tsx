import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {
  createStaticNavigation,
  StaticParamList,
  useNavigation,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';
import LoginScreen from '../Screens/Login';
import RegisterScreen from '../Screens/Register';
import TabNavigation from '../Navigation/TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsSignedIn, useIsSignedOut } from '../Hooks/AuthHooks';

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  groups: {
    LoggedIn: {
      if: useIsSignedIn,
      screens: {
        Tab: TabNavigation,
      },
    },
    LoggedOut: {
      if: useIsSignedOut,
      screens: {
        Login: LoginScreen,
        Register: RegisterScreen,
      },
    },
  },
});

type UNAUTHENCATED_STACK_TYPE = {
  Login: undefined;
  Register: undefined;
};

const unauthenticatedStack =
  createNativeStackNavigator<UNAUTHENCATED_STACK_TYPE>({
    initialRouteName: 'Login',
    screenOptions: {
      headerShown: false,
      headerStyle: { backgroundColor: 'tomato' },
    },

    screens: {
      Login: LoginScreen,
      Register: {
        screen: RegisterScreen,
        options: {
          title: 'Sign Up',
        },
      },
    },
  });

export const Navigation = createStaticNavigation(RootStack);

const UnauthenticatedStackNavigation =
  createStaticNavigation(unauthenticatedStack);
export default function RootNavigator() {
  return <UnauthenticatedStackNavigation />;
}
