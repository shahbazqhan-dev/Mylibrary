import * as React from 'react';
import {
  ToastAndroid,
  ActivityIndicator,
  Image,
  View,
  Text,
  TextInput,
  Touchable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../Contexts/Authcontexts';
import { useState, useEffect } from 'react';
import { AntDesign } from '@react-native-vector-icons/ant-design';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Picker } from '@react-native-picker/picker';
import {
  signOut as firebaseSignOut,
  getAuth,
} from '@react-native-firebase/auth';
import SavedBooksContext, {
  bookcontext,
} from '../../Contexts/SavedBooksContext';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import firestore from '@react-native-firebase/firestore';

function HomeScreen() {
  const [data, setData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filter, setfilter] = useState('now');
  const [trending, setTrending] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { signOut } = React.useContext(AuthContext);
  const { addItem, removeItem, toRead } = React.useContext(SavedBooksContext);
  const ref = React.useRef(null);
  useEffect(() => {
    fetchtrending();
  }, [filter]);

  const showToast = () => {
    ToastAndroid.show(
      'The Book has been saved to your collection',
      ToastAndroid.SHORT,
    );
  };

  // useEffect(() => {
  //   if (searchText.length > 0) {
  //     fetchData(); // Call your API function
  //   } else {
  //     setSearchResults([]); // Clear results if search text is empty
  //   }
  // }, [searchText]);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchText}`,
      );
      const json = await response.json();
      //setSearchResults(data);
      setData(json.docs);
      setIsLoading(false);
      console.log(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchtrending = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://openlibrary.org/trending/${filter}.json`,
      );
      const json = await response.json();
      //setSearchResults(data);
      setTrending(json.works);
      setIsLoading(false);
      console.log(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TextInput
          placeholder="Search"
          style={{ borderWidth: 1, borderRadius: 15, width: '75%' }}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={fetchData}
        />
        <TouchableOpacity
          style={{
            borderRadius: 20,
            padding: 10,
            margin: 10,
            backgroundColor: 'gray',
          }}
          onPress={fetchData}
        >
          <Text
            style={{
              color: 'black',
            }}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: 350,
          flexDirection: 'row',
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Text>Filter</Text>

        <Picker
          style={{
            height: 50,
            width: 30,
            borderColor: 'black',
            borderWidth: 1,
          }}
          selectedValue={filter}
          onValueChange={itemValue => {
            setfilter(itemValue), setSearchText('');
          }}
        >
          <Picker.Item label="Now" value="now" />
          <Picker.Item label="Daily " value="daily" />
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="Monthly" value="monthly" />
        </Picker>
      </View>
      <View style={{ borderRadius: 10 }}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            paddingBottom: 20,
            fontWeight: 'bold',
            alignItems: 'center',
            borderRadius: 15,
          }}
        >
          Here are the books available to borrow
        </Text>
      </View>
      {(data || trending) && !isLoading ? (
        <FlatList
          data={searchText == '' ? trending : data}
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
                elevation: 12,
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
                  onPress={() => {
                    addItem(item);
                    showToast();
                  }}
                >
                  <AntDesign name="save" color="#231e1eff" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
}
export default HomeScreen;
