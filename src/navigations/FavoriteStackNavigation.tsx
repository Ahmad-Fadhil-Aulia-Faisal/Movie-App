import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorite from '../screens/Favorite';
import MovieDetail from '../screens/MovieDetail';

const Stack = createNativeStackNavigator();

const FavoriteStackNavigation = (): JSX.Element => (
  <Stack.Navigator initialRouteName="Favorite">
    <Stack.Screen
      name="Favorite"
      component={Favorite}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetail}
      options={{ title: 'Movie Detail' }}
    />
  </Stack.Navigator>
);

export default FavoriteStackNavigation;
