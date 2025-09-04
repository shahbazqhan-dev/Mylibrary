import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  Keyboard,
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
import { Background, Button } from '@react-navigation/elements';
import {
  createUserWithEmailAndPassword,
  firebase,
  getAuth,
} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../Contexts/Authcontexts';
import AntDesign from '@react-native-vector-icons/ant-design';
import firestore from '@react-native-firebase/firestore';

function RegisterScreen() {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const { signIn } = React.useContext(AuthContext);

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const checkEmail = (text: string) => {
    if (!validateEmail(text)) {
      setEmailError('Invalid Email');
    } else {
      setEmailError(''); // Clear error if valid
    }
  };
  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+=])(?!.*\s).{8,}$/;
    return passwordRegex.test(password);
  };
  const checkPassword = (text: string) => {
    if (!validatePassword(text)) {
      setPasswordError(
        'Password should be Minimum eight characters, at least one letter, one number and one special character ',
      );
    } else {
      setPasswordError(''); // Clear error if valid
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f2dfaa',
      }}
    >
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 40,
            fontWeight: 'bold',
            padding: 90,
          }}
        >
          Sign Up
        </Text>
      </View>
      <View
        style={{
          width: '90%',
        }}
      >
        <View>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Username </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginVertical: 10,
              borderRadius: 10,
            }}
            //value={Text}
            placeholder="set you username"
            onChangeText={setUsername}
          />
        </View>
        <View>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Email</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              marginVertical: 10,
              borderRadius: 10,
            }}
            //value={Text}
            keyboardType={'email-address'}
            placeholder="Email"
            value={email}
            onChangeText={text => {
              checkEmail(text);
              setEmail(text);
            }}
          />
          {emailError ? (
            <Text style={{ color: 'red' }}>{emailError}</Text>
          ) : null}
        </View>
        <View style={{ width: '100%' }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Password</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'gray',
              marginTop: 10,
            }}
          >
            <TextInput
              style={{
                height: 40,
                width: '90%',
              }}
              //value={Text}
              keyboardType={'visible-password'}
              placeholder="enter password"
              value={password}
              secureTextEntry={secureTextEntry}
              onChangeText={text => {
                checkPassword(text), setPassword(text);
              }}
            />
            <TouchableOpacity
              style={{}}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            >
              <AntDesign
                name={secureTextEntry ? 'eye' : 'eye-invisible'}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={{ color: 'red' }}>{passwordError}</Text>
          ) : null}
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            borderRadius: 20,
            paddingLeft: 50,
            paddingRight: 50,
            paddingBottom: 10,
            paddingTop: 10,
            backgroundColor: '#705f2e',
            marginTop: 20,
            marginBottom: 10,
          }}
          onPress={() => {
            createUserWithEmailAndPassword(getAuth(), email, password)
              .then(async res => {
                console.log('registration successful', res.user.uid);
                firestore()
                  .collection('Users')
                  .doc(res.user.uid)
                  .set({ username, email })
                  .then(async response => {
                    console.log('registered');
                    await AsyncStorage.setItem('userToken', res.user.uid);
                    signIn(res.user.uid);
                  })
                  .catch(err => {
                    console.log(err, 'dsfghjkl');
                  });
              })
              .catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                  console.log('That email address is already in use!');
                }

                if (err.code === 'auth/invalid-email') {
                  console.log('That email address is invalid!');
                }
                console.log(err, 'ERROR');
              });
          }}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default RegisterScreen;
