import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import Search from '../screens/Search'
import Favorite from '../screens/Favorite'
import HomeStackNavigator from './HomeStackNavigation'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = (): JSX.Element => (
    <Tab.Navigator>
        <Tab.Screen
            name="HomeStack"
            component={HomeStackNavigator}
            options={{
                tabBarIcon: ({ color }) => (
                    <Feather name="home" size={28} color={color} />
                ),
                headerShown: false,
            }}
        />
        <Tab.Screen
            name="Search"
            component={Search}
            options={{
                tabBarIcon: ({ color }) => (
                    <Feather name="search" size={28} color={color} />
                ),
                headerShown: false,
            }}
        />
        <Tab.Screen
            name="Favorite"
            component={Favorite}
            options={{
                tabBarIcon: ({ color }) => (
                    <Feather name="heart" size={28} color={color} />
                ),
                headerShown: false,
            }}
        />
    </Tab.Navigator>
)

export default BottomTabNavigator