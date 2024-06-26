import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/Search';
import MovieDetail from '../screens/MovieDetail';
import SearchResults from '../screens/SearchResultCategory';
import FavoriteStackNavigation from './FavoriteStackNavigation'; // Pastikan ini diimpor dengan benar

const Stack = createNativeStackNavigator();

const SearchStackNavigation = (): JSX.Element => (
  <Stack.Navigator initialRouteName="Search">
    <Stack.Screen
      name="SEARCH"
      component={Search}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SearchResults"
      component={SearchResults}
      options={{ title: 'Search Results' }}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetail}
      options={{ title: 'Movie Detail' }}
    />
    <Stack.Screen
      name="FavoriteDetail"
      component={FavoriteStackNavigation}
      options={{ headerShown: false }} // Sesuaikan dengan kebutuhan Anda
    />
  </Stack.Navigator>
);

export default SearchStackNavigation;
