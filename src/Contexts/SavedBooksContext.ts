import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';

const defaultValue = {
  toRead: [],
  addItem: (item: any) => {},
  removeItem: (item: string) => {},
  restoreBooks: (books: any[]) => {},
};
const SavedBooksContext = React.createContext(defaultValue);
export { defaultValue };

// const savedBooksList = [...prevState.toRead,action.payload]
// await AsyncStorage.setItem('userBooks', JSON.stringify(savedBooksList))
// @ts-ignore
export const SavedBooksReducer = (prevState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const savedBooksList = [...prevState.toRead, action.payload];
      AsyncStorage.setItem('userBooks', JSON.stringify(savedBooksList));

      return {
        ...prevState,
        toRead: [...prevState.toRead, action.payload],
      };
    case 'REMOVE_ITEM':
      const updatedBooks = [...prevState.toRead, action.payload];
      AsyncStorage.setItem(
        'userBooks',
        JSON.stringify(
          prevState.toRead.filter(item => item.cover_i !== action.payload),
        ),
      );
      return {
        ...prevState,
        toRead: prevState.toRead.filter(
          item => item.cover_i !== action.payload,
        ),
      };

    case 'RESTORE_BOOKS':
      return {
        ...prevState,
        toRead: action.payload,
      };
  }
};

export default SavedBooksContext;
