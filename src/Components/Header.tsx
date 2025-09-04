import AntDesign from '@react-native-vector-icons/ant-design';
import * as React from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Popover from 'react-native-popover-view';
import { AuthContext } from '../Contexts/Authcontexts';
import {
  signOut as firebaseSignOut,
  getAuth,
} from '@react-native-firebase/auth';
import { useIsSignedIn } from '../Hooks/AuthHooks';
import firestore from '@react-native-firebase/firestore';
import SignInContext from '../Contexts/SignInContext';

export function Header() {
  const { signOut } = React.useContext(AuthContext);
  const { token, username } = React.useContext(SignInContext);
  const isSignedIn = useIsSignedIn();
  if (!isSignedIn) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 25, fontWeight: '700' }}> My Library </Text>
      <View
        style={{
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 35,
          padding: 5,
          marginRight: 20,
        }}
      >
        <Popover
          popoverStyle={{
            borderWidth: 1,
            borderRadius: 10,
            width: 150,
            height: 100,
            padding: 10,
            paddingLeft: 20,
            alignItems: 'center',
          }}
          from={
            <TouchableOpacity>
              <AntDesign name="user" color="#231e1eff" size={20} />
            </TouchableOpacity>
          }
        >
          <View>
            <Text style={{ fontSize: 18, marginBottom: 5 }}>
              Hi, {username}
            </Text>

            <TouchableOpacity
              style={{
                padding: 7,
                alignItems: 'center',
                backgroundColor: 'grey',
                borderWidth: 1,
                borderRadius: 10,
              }}
              onPress={async () => {
                await firebaseSignOut(getAuth());
                signOut();
              }}
            >
              <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </Popover>
      </View>
    </View>
  );
}
