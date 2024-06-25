import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import type { MovieListProps, Movie } from '../../types/app';
import { API_ACCESS_TOKEN } from '@env';
import MovieItem from './MovieItem';

const MovieList = ({ title, path, coverType }: MovieListProps): JSX.Element => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    useEffect(() => {
        const getMovieList = async (): Promise<void> => {
            const url = `https://api.themoviedb.org/3/${path}`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
                },
            };

            try {
                const response = await fetch(url, options);
                const data: { results: Movie[] } = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        getMovieList().catch((error) => {
            console.error('Error in useEffect:', error);
        });
    }, [path]);

    return (
        <View>
            <View style={styles.header}>
                <View style={styles.purpleLabel}></View>
                <Text style={styles.title}>{title}</Text>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
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
            )}
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
