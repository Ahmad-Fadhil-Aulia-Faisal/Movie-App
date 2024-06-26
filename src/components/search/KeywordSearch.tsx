import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  KeywordSearch: { keyword: string };
  MovieDetail: { movieId: string };
};

type KeywordSearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'KeywordSearch'
>;

type KeywordSearchScreenRouteProp = RouteProp<
  RootStackParamList,
  'KeywordSearch'
>;

type Props = {
  navigation: KeywordSearchScreenNavigationProp;
  route: KeywordSearchScreenRouteProp;
};



const KeywordSearch: React.FC<Props> = ({ route, navigation }) => {
  const { keyword } = route.params;

  return (
    <View>
      <Text>Keyword Search Screen</Text>
      <Text>Keyword: {keyword}</Text>
      <Button
        title="Go to Movie Detail"
        onPress={() => navigation.navigate('MovieDetail', { movieId: '456' })}
      />
    </View>
  );
};

export default KeywordSearch;
