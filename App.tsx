/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { StatusBar, useColorScheme } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Navigation } from './src/Navigation/RootNavigator';
import SignInContext, {
  defaultValue,
  signInReducer,
} from './src/Contexts/SignInContext';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './src/Contexts/Authcontexts';
import SavedBooksContext from './src/Contexts/SavedBooksContext';
import {
  defaultValue as booksDefault,
  SavedBooksReducer,
} from './src/Contexts/SavedBooksContext';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from './src/Components/Header';
import firestore from '@react-native-firebase/firestore';

function App() {
  const [state, dispatch] = React.useReducer(signInReducer, defaultValue);
  const [booksState, booksDispatch] = React.useReducer(
    SavedBooksReducer,
    booksDefault,
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let savedBooks;
      let user;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        savedBooks = await AsyncStorage.getItem('userBooks');
        if (userToken) {
          user = await firestore().collection('Users').doc(userToken).get();
          console.log('yaha dekho', user.data().username);
          dispatch({ type: 'SET_USERNAME', payload: user.data().username });
        }

        console.log(savedBooks);
        if (savedBooks)
          booksDispatch({
            type: 'RESTORE_BOOKS',
            payload: JSON.parse(savedBooks),
          });
      } catch (e) {}
      if (userToken) dispatch({ type: 'RESTORE_TOKEN', payload: userToken });
    };

    bootstrapAsync();
  }, []);
  ``;

  const authContext = React.useMemo(
    () => ({
      signIn: async (uid: string) => {
        dispatch({ type: 'SIGN_IN', payload: uid });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    [],
  );
  const colorScheme = useColorScheme(); // 'light' or 'dark'
  <StatusBar
    barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
    backgroundColor={colorScheme === 'dark' ? '#000000' : '#FFFFFF'} // Example: Black for dark, white for light
  />;
  const bookContext = React.useMemo(
    () => ({
      addItem: async (item: any) => {
        booksDispatch({ type: 'ADD_ITEM', payload: item });
      },
      removeItem: (item: string) =>
        booksDispatch({ type: 'REMOVE_ITEM', payload: item }),
      restoreBooks: (books: any[]) => {
        booksDispatch({ type: 'RESTORE_BOOKS', payload: books });
      },
    }),
    [],
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={colorScheme === 'dark' ? '#000000' : '#FFFFFF'} // Example: Black for dark, white for light
        />
        <AuthContext.Provider value={authContext}>
          <SignInContext.Provider value={state}>
            <SavedBooksContext.Provider
              value={{ ...bookContext, toRead: booksState.toRead }}
            >
              <Header />
              <Navigation />
            </SavedBooksContext.Provider>
          </SignInContext.Provider>
        </AuthContext.Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
