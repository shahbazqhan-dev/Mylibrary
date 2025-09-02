
import * as React from 'react';

const defaultValue = {
    token:'',
    email:'',
    isSignedIn:false
}
const SignInContext = React.createContext(defaultValue)
export {defaultValue};

// @ts-ignore
export const signInReducer =  (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            token: action.payload,
            isSignedIn:true
          }
        case 'SET_EMAIL':
          return {
            ...prevState,
            email: action.payload,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignedIn: true,
            token:action.payload,
          };
          case 'SIGN_OUT':
          return {
            ...prevState,
            isSignedIn: false,
            userToken: "",
          };
      }
    }


export default SignInContext


