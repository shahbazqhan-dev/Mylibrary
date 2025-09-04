import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home';
import BookScreen from '../Screens/MyBooks';
import { createStaticNavigation } from '@react-navigation/native';
import AntDesign from '@react-native-vector-icons/ant-design';
const MyTabs = createBottomTabNavigator({
  
  screenOptions: ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'MyBooks') {
        iconName = 'book';
      }

      // You can return any component that you like here!
      return <AntDesign name={iconName} size={size} color={color} />;
    },
  }),
  screens: {
    Home: HomeScreen,
    MyBooks: BookScreen,
  },
});

export default MyTabs;
