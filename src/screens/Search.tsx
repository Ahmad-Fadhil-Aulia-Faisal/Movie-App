import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import KeywordSearch from '../components/search/KeywordSearch';
import CategorySearch from '../components/search/CategorySearch';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigations/RootStackNavigation'; // Pastikan untuk mengganti path ini dengan path yang sesuai

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Search'
>;

const Search: React.FC<{ navigation: SearchScreenNavigationProp }> = ({ navigation }) => {
  const [selectedBar, setSelectedBar] = useState<'keyword' | 'category'>('keyword');

  const handleBarPress = (item: 'keyword' | 'category') => {
    setSelectedBar(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        {['keyword', 'category'].map((item) => (
          <TouchableOpacity
            key={item}
            activeOpacity={0.9}
            style={{
              ...styles.topBar,
              backgroundColor: item === selectedBar ? '#8978A4' : '#C0B4D5',
              borderTopLeftRadius: item === 'keyword' ? 100 : 0,
              borderBottomLeftRadius: item === 'keyword' ? 100 : 0,
              borderTopRightRadius: item === 'category' ? 100 : 0,
              borderBottomRightRadius: item === 'category' ? 100 : 0,
            }}
            onPress={() => handleBarPress(item as 'keyword' | 'category')}
          >
            <Text style={styles.topBarLabel}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Konten tab */}
      <View style={styles.contentContainer}>
        {selectedBar === 'keyword' ? (
          <KeywordSearch navigation={navigation} route={undefined as any} />
        ) : (
          <CategorySearch navigation={navigation} route={undefined as any} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topBarContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 60,
  },
  topBarLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  contentContainer: {
    flex: 1,
  },
});

export default Search;
