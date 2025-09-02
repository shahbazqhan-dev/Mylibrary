import * as React from 'react';
import auth from '@react-native-firebase/auth';
import {
  View,
  Text,
  Alert,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {
  createStaticNavigation,
  StaticParamList,
  useNavigation,
} from '@react-navigation/native';
import { AuthContext } from '../../Contexts/Authcontexts';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import { getAuth } from '@react-native-firebase/auth';
import { signInWithEmailAndPassword } from '@react-native-firebase/auth';
import AntDesign from '@react-native-vector-icons/ant-design';

const LoginScreen: React.FC = () => {
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const { signIn } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const checkEmail = () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid Email');
    } else {
      setEmailError(''); // Clear error if valid
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f2dfaa',
      }}
    >
      <Text
        style={{
          color: 'black',
          fontSize: 40,
          fontWeight: 'bold',
          padding: 90,
        }}
      >
        Welcome
      </Text>
      <View style={{ width: '90%' }}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Username</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 10,
            marginBottom: 10,
          }}
          placeholder="your email here"
          keyboardType={'email-address'}
          value={email}
          onChangeText={setEmail}
          onBlur={checkEmail}
        />
        {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
      </View>
      <View style={{ width: '90%' }}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Password</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            borderWidth: 1,
            borderColor: 'gray',
            marginTop: 10,
          }}
        >
          <TextInput
            style={{
              height: 40,
              width: '90%',
              padding: 10,
            }}
            placeholder="password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity
            style={{}}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          >
            {/* You can use an icon library here, or simple text */}
            <AntDesign
              name={secureTextEntry ? 'eye' : 'eye-invisible'}
              size={20}
            />
            {/* Example with an icon (if you have react-native-vector-icons installed) */}
            {/* <Icon name={secureTextEntry ? 'eye-off' : 'eye'} size={24} color="gray" /> */}
          </TouchableOpacity>
        </View>
      </View>
      {loginError ? <Text style={{ color: 'red' }}>{loginError}</Text> : null}
      <TouchableOpacity
        style={{
          alignItems: 'center',
          borderRadius: 20,
          paddingLeft: 50,
          paddingRight: 50,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: '#705f2e',
          marginTop: 10,
          marginBottom: 10,
        }}
        onPress={() => {
          signInWithEmailAndPassword(getAuth(), email, password)
            .then(async res => {
              await AsyncStorage.setItem('userToken', res.user.uid);
              signIn(res.user.uid);
            })
            .catch(err => {
              if (err.code === 'auth/invalid-credential') {
                setLoginError('Incorrecr email/password');
              }
              console.log(err, loginError);
            });
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: 'white',
          }}
        >
          Login
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ color: 'black', alignSelf: 'flex-start' }}>
          Dont have an account?
        </Text>
        <TouchableOpacity
          style={{ borderRadius: 10, paddingLeft: 5 }}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={{ color: 'black', alignSelf: 'flex-end' }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LoginScreen;
