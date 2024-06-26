import React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Home from '../screens/Home';
import MovieDetail from '../screens/MovieDetail';

const Stack = createNativeStackNavigator();

type HomeStackParamList = {
    HOME: undefined;
    MovieDetail: { movieId: string }; // Define the parameter type for MovieDetail screen
    // Add other screens here if needed
};


const HomeStackNavigator = (): JSX.Element => (
    <Stack.Navigator initialRouteName="HOME">
        <Stack.Screen
            name="HOME"
            component={Home}
        />
        <Stack.Screen
            name="MovieDetail"
            component={MovieDetail}
        />
    </Stack.Navigator>
);

export default HomeStackNavigator;
