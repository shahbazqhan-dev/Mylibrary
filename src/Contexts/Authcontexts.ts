import * as React from 'react';
const defaultValue={signIn:(uid:string)=>{},signOut:()=>{}}

export const AuthContext = React.createContext(defaultValue);