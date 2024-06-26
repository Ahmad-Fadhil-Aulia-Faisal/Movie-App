import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { API_ACCESS_TOKEN } from '@env';

interface Movie {
  id: number;
  title: string;
}

const SearchResults = (): JSX.Element => {
  const route = useRoute();
  const navigation = useNavigation();
  const { genreId } = route.params as { genreId: number };
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMoviesByGenre = async (genreId: number): Promise<void> => {
    try {
      const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesByGenre(genreId);
  }, [genreId]);

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
            data={movies}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.movieItem}
                    onPress={() => {
                        navigation.navigate('MovieDetail', { id: item.id });
                    }}
                >
                    <ImageBackground
                        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                        style={styles.movieImage}
                        imageStyle={{ borderRadius: 8 }}
                    >
                        <View style={styles.titleContainer}>
                        <Text style={styles.ratingText}>⭐{item.vote_average}</Text>
                            <Text style={styles.movieTitle}>{item.title}</Text>
                            
  
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`} // Use a combination of id and index
            showsVerticalScrollIndicator={false}
            numColumns={3}
        />
    </View>
  );
  };
  
  const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    padding: 8,
    backgroundColor: '#fff',
  },
  movieItem: {
    flex: 1,
    margin: 4,
  },
  movieImage: {
    aspectRatio: 2 / 3, // Adjust the aspect ratio as needed
    justifyContent: 'flex-end',
  },
  titleContainer: {
    height:'30%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 4,
  },
  movieTitle: {
    fontSize: 12,
    fontWeight:'bold',
    color: '#fff',
    textAlign: 'center',
  },
  ratingText: {
    fontSize:10,
    color: 'yellow',
    marginTop: 5,
    paddingBottom:2
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchResults;
