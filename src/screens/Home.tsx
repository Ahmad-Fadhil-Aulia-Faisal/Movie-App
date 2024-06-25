import React, { useState, useEffect } from 'react';
import { ScrollView, View, StatusBar, StyleSheet } from 'react-native';
import type { MovieListProps } from '../types/app';
import MovieList from '../components/movies/MovieList';
import { API_ACCESS_TOKEN } from '@env';

const movieLists: MovieListProps[] = [
  {
    title: 'Now Playing in Theater',
    path: 'movie/popular?language=en-US&page=1',
    coverType: 'backdrop',
    movies: []
  },
  {
    title: 'Upcoming Movies',
    path: 'movie/popular?language=en-US&page=1',
    coverType: 'poster',
    movies: []
  },
  {
    title: 'Top Rated Movies',
    path: 'movie/popular?language=en-US&page=1',
    coverType: 'poster',
    movies: []
  },
  {
    title: 'Popular Movies',
    path: 'movie/popular?language=en-US&page=1',
    coverType: 'poster',
    movies: []
  },
];

const Home = (): JSX.Element => {
  const [movieData, setMovieData] = useState<Record<string, any>>({}); // State untuk menyimpan data film

  useEffect(() => {
    fetchMovieData(); // Memanggil fungsi fetchMovieData() sekali ketika komponen di-mount
  }, []);

  const fetchMovieData = async () => {
    const promises = movieLists.map((movieList) =>
      fetch(`https://api.themoviedb.org/3/${movieList.path}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      }).then((response) => response.json())
    );

    try {
      const responses = await Promise.all(promises);
      const data = responses.reduce((acc, response, index) => {
        const { title } = movieLists[index];
        acc[title] = response.results; // Menyimpan hasil dari setiap kategori film berdasarkan judul
        return acc;
      }, {});
      setMovieData(data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {movieLists.map((movieList) => (
          <MovieList
            key={movieList.title}
            title={movieList.title}
            coverType={movieList.coverType}
            movies={movieData[movieList.title] || []} // Mengirimkan data film sesuai kategori
            path={''}          />
        ))}
        <StatusBar translucent={false} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 32,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 16,
  },
});

export default Home;
