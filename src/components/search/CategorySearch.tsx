import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  CategorySearch: { categoryId: string };
  MovieDetail: { movieId: string };
};

type CategorySearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CategorySearch'
>;

type CategorySearchScreenRouteProp = RouteProp<
  RootStackParamList,
  'CategorySearch'
>;

type Props = {
  navigation: CategorySearchScreenNavigationProp;
  route: CategorySearchScreenRouteProp;
};

const CategorySearch: React.FC<Props> = ({ route, navigation }) => {
  const { categoryId } = route.params;

  return (
    <View>
      <Text>Category Search Screen</Text>
      <Text>Category ID: {categoryId}</Text>
      <Button
        title="Go to Movie Detail"
        onPress={() => navigation.navigate('MovieDetail', { movieId: '123' })}
      />
    </View>
  );
};

export default CategorySearch;
