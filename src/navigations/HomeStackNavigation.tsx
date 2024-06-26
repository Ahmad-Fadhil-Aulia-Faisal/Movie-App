// HomeStackNavigation.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Home from '../screens/Home';
import MovieDetail from '../screens/MovieDetail';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = (): JSX.Element =>  (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="HOME"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetail}
      options={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 16 }}
          >
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
        ),
        headerShown: true,
        title: 'Movie Detail',
      })}
    />
  </Stack.Navigator>
);

export default HomeStackNavigator;
