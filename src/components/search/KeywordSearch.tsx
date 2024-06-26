import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet, Image } from 'react-native';

const KeywordSearch = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]); // State untuk menyimpan hasil pencarian

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
          disabled={!keyword}
        />
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>Search Results:</Text>
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.poster}
              />
              <View style={styles.movieDetails}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieOverview}>{item.overview}</Text>
                <Text style={styles.movieReleaseDate}>Release Date: {item.release_date}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 5,
  },
  resultsContainer: {
    flex: 1,
    marginTop: 20,
  },
  resultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 5,
    marginRight: 10,
  },
  movieDetails: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  movieOverview: {
    fontSize: 14,
    marginBottom: 5,
  },
  movieReleaseDate: {
    fontSize: 12,
    color: '#666',
  },
});

export default KeywordSearch;
