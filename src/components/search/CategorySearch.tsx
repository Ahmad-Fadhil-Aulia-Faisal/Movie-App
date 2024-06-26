import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_ACCESS_TOKEN } from '@env';

interface Genre {
  id: number;
  name: string;
}

const CategorySearch = (): JSX.Element => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  const fetchGenres = async (): Promise<void> => {
    try {
      const url = 'https://api.themoviedb.org/3/genre/movie/list';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleGenrePress = (id: number): void => {
    setSelectedGenre((prevSelectedGenre) => (prevSelectedGenre === id ? null : id));
  };

  const handleSearchPress = (): void => {
    if (selectedGenre) {
      navigation.navigate('SearchResults', { genreId: selectedGenre });
    } else {
      console.log('No genre selected');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={genres}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
          style={[
            styles.genreItem,
            { backgroundColor: selectedGenre === item.id ? '#8978A4' : '#C0B4D5' },
          ]}
          onPress={() => handleGenrePress(item.id)}
          >
            <Text style={styles.genreText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={styles.genreList}
        contentContainerStyle={styles.genreListContainer}
        
        />
      
      {selectedGenre &&(
        <View style={styles.footer}>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
            <Text style={styles.searchButtonText}>SEARCH</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genreList: {
    justifyContent: 'space-between',
  },
  genreListContainer: {
    paddingBottom: 100, // Provide some bottom padding to ensure space for the button
  },
  genreItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genreText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    paddingBottom: 16,
    paddingTop:5,
    backgroundColor:'#fff',
    
    borderColor: '#ccc',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#8978A4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CategorySearch;
