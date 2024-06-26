import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';

const KeywordSearch = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]); // State untuk menyimpan hasil pencarian
  const navigation = useNavigation();

  const handleSearch = () => {
    if (!keyword) {
      return; // Jika keyword kosong, tidak melakukan apa-apa
    }

    const apiKey = '36d8bb74c2783824660e91206238e669'; // Ganti dengan kunci API TMDb Anda
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(keyword)}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Search results:', data);
        setSearchResults(data.results); // Menyimpan hasil pencarian ke dalam state searchResults
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Tambahkan penanganan kesalahan sesuai kebutuhan Anda
      });
  };

  const navigateToMovieDetail = (id: number) => {
    console.log('Navigating to MovieDetail with ID:', id);
    navigation.dispatch(StackActions.push('MovieDetail', { id }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by keyword"
          onChangeText={text => setKeyword(text)}
          value={keyword}
          onSubmitEditing={handleSearch}
        />
        <Button
          title="Search"
          onPress={handleSearch}
          disabled={keyword === ""}
        />
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>Search Results:</Text>
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => { navigateToMovieDetail(item.id); }}
              style={styles.resultItem}
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.poster}
              />
              <View style={styles.resultDetails}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieOverview} numberOfLines={2}>{item.overview}</Text>
                <Text style={styles.movieReleaseDate}>Release Date: {item.release_date}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    borderRadius: 8,
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  resultsContainer: {
    
  },
  resultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
  },
  resultDetails: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  movieOverview: {
    fontSize: 14,
    marginBottom: 4,
  },
  movieReleaseDate: {
    fontSize: 12,
    color: '#666',
  },
});

export default KeywordSearch;
