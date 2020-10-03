import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import ViewBuyer from '../screens/ViewBuyer';
import ViewSeller from '../screens/ViewSeller';
import ViewCategory from '../screens/ViewCategory';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Main"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'file-document-edit-outline'
              : 'file-document-edit-outline';
          } else if (route.name === 'ViewCategory') {
            iconName = focused ? 'eye-outline' : 'eye-outline';
          } else if (route.name === 'ViewBuyer') {
            iconName = focused
              ? 'clipboard-arrow-up-outline'
              : 'clipboard-arrow-up-outline';
          } else {
            iconName = focused
              ? 'clipboard-arrow-down-outline'
              : 'clipboard-arrow-down-outline';
          }

          // You can return any component that you like here!
          return <MCI name={iconName} size={40} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#6ead3a',
        inactiveTintColor: '#222022',
      }}>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="ViewCategory" component={ViewCategory} />
      <Tabs.Screen name="ViewBuyer" component={ViewBuyer} />
      <Tabs.Screen name="ViewSeller" component={ViewSeller} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
