import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import type { MovieListProps, Movie } from '../../types/app';
import MovieItem from '../../components/movies/MovieItem'; // Import komponen MovieItem

const coverImageSize = {
  backdrop: {
    width: 280,
    height: 160,
  },
  poster: {
    width: 100,
    height: 160,
  },
};

const MovieList = ({ title, coverType, movies }: MovieListProps): JSX.Element => {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.purpleLabel}></View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        style={{
          ...styles.movieList,
          maxHeight: coverImageSize[coverType].height,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={movies}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            size={coverImageSize[coverType]}
            coverType={coverType}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginLeft: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  purpleLabel: {
    width: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8978A4',
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
  },
  movieList: {
    paddingLeft: 4,
    marginTop: 8,
  },
});

export default MovieList;
