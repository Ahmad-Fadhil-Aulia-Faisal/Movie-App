import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../screens/Home';
import MovieDetail from '../screens/MovieDetail';

const stack =createNativeStackNavigator()

const HomeStackNavigator =() :JSX.Element => (
    <stack.Navigator initialRouteName="Home">
        <stack.Screen
        name="HOME"
        component={Home}
        />
        <stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        />
    </stack.Navigator>
)

export default HomeStackNavigator