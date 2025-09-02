import * as React from 'react'
import SignInContext from "../Contexts/SignInContext";
import auth from '@react-native-firebase/auth';

export function useIsSignedIn() {
  const userData = React.useContext(SignInContext);
  const user = auth().currentUser;
  console.log(user,userData)
  return userData["isSignedIn"] && (userData.token!=""||userData.token!=null) && !!user
}

export function useIsSignedOut() {
  return !useIsSignedIn();
}