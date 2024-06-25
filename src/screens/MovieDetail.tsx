import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { API_ACCESS_TOKEN } from '@env';
import { useNavigation, StackActions, } from '@react-navigation/native';
import type { Movie, Recommendation, } from '../types/app';

const MovieDetail = ({ route }: any): JSX.Element => {
    const { id } = route.params;
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchMovieDetail = async (): Promise<void> => {
            try {
                const url = `https://api.themoviedb.org/3/movie/${id}`;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
                    },
                };
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Movie = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchRecommendations = async (): Promise<void> => {
            try {
                const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
                    },
                };
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecommendations(data.results as Recommendation[]);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchMovieDetail().catch(console.error);
        fetchRecommendations().catch(console.error);
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {movie != null && (
                    <>
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${(movie.backdrop_path.length > 0) ? movie.backdrop_path : movie.poster_path}` }}
                            style={styles.backdrop}
                        />
                        <Text style={styles.title}>{movie.title}</Text>
                        <View style={styles.rating}>
                            <Text style={styles.ratingText}>⭐ {movie.vote_average}</Text>
                        </View>
                        <Text style={styles.overview}>{movie.overview}</Text>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>Original Language: {movie.original_language}</Text>
                            <Text style={styles.infoText}>Popularity: {movie.popularity}</Text>
                            <Text style={styles.infoText}>Release Date: {movie.release_date.toString()}</Text>
                            <Text style={styles.infoText}>Vote Count: {movie.vote_count}</Text>
                        </View>
                    </>
                )}
                <Text style={styles.recommendationTitle}>Recommendations</Text>
                <FlatList
                    horizontal
                    data={recommendations}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.dispatch(StackActions.push('MovieDetail', { id: item.id }));
                            }}
                        >
                            <View style={styles.recommendationItem}>
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                    style={styles.recommendationImage}
                                />
                                <Text style={styles.recommendationTitleText}>{item.title}</Text>
                                <Text style={styles.recommendationRating}>⭐ {item.vote_average}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdrop: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 8,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    ratingText: {
        fontSize: 18,
        marginLeft: 4,
    },
    overview: {
        fontSize: 16,
        marginVertical: 8,
    },
    info: {
        marginVertical: 8,
    },
    infoText: {
        fontSize: 14,
        marginBottom: 4,
    },
    recommendationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    recommendationItem: {
        marginRight: 8,
    },
    recommendationImage: {
        width: 100,
        height: 150,
        borderRadius: 8,
    },
    recommendationTitleText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 4,
    },
    recommendationRating: {
        fontSize: 12,
    },
});

export default MovieDetail;
