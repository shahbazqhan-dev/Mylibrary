import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import SavedBooksContext from '../../Contexts/SavedBooksContext';
import { useState, useEffect } from 'react';
import { AntDesign } from '@react-native-vector-icons/ant-design';

function BookScreen() {
  const [data, setData] = useState(null);
  const { toRead, removeItem } = React.useContext(SavedBooksContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {toRead?.length ? (
        <FlatList
          data={toRead}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
                backgroundColor: '#dddddd',
                margin: 10,
                borderRadius: 10,
                borderColor: '#dddddd',
                elevation: 10,
              }}
            >
              <Image
                source={{
                  uri: `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`,
                }}
                style={{ width: 75, height: 100 }}
              />
              <View style={{ width: '60%' }}>
                <Text style={{ fontWeight: 'bold', color: 'black' }}>
                  Title: {item.title}{' '}
                </Text>
                <Text style={{ color: 'black' }}>
                  Author Key : {item.author_key}{' '}
                </Text>
                <Text style={{ color: 'black' }}>
                  Author Name : {item.author_name}{' '}
                </Text>
                <Text style={{ color: 'black' }}>
                  First publish year: {item.first_publish_year}{' '}
                </Text>
                <Text style={{ color: 'black' }}>
                  Cover ID: {item.cover_i}{' '}
                </Text>
                <Text style={{ fontWeight: 'bold', color: 'black' }}>
                  Ebook_access: {item.ebook_access}{' '}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    borderRadius: 20,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  onPress={() => removeItem(item.cover_i)}
                >
                  <AntDesign name="delete" color="#231e1eff" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <View>
          <Text>Nothing saved Yet!!</Text>
          {/* <ActivityIndicator size="large" color="#0000ff" /> */}
        </View>
      )}
      ;
    </View>
  );
}

export default BookScreen;
