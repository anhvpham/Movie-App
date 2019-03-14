import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';


import List  from '../screens/List';
import NowPlaying from '../screens/NowPlaying';
import SearchSection from '../screens/SearchSection';

const NowPlayingStack = createStackNavigator({
  NowPlaying: NowPlaying,
});

NowPlayingStack.navigationOptions = {
  tabBarLabel: 'Now Playing',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const SearchSectionStack = createStackNavigator({
  SearchSection: SearchSection,
});

SearchSectionStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const ListStack = createStackNavigator({
  List: List,
});

ListStack.navigationOptions = {
  tabBarLabel: 'Lists',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  NowPlayingStack,
  SearchSectionStack,
  ListStack,
});
