import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { API_ACCESS_TOKEN } from '@env';
import { useNavigation, StackActions, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import type { Movie, Recommendation } from '../types/app';

const MovieDetail = ({ route }: any): JSX.Element => {
    const { id } = route.params;
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const navigation = useNavigation();

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

    const checkIsFavorite = async (): Promise<void> => {
        try {
            const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
            if (initialData != null) {
                const favMovieList: Movie[] = JSON.parse(initialData);
                setIsFavorite(favMovieList.some(movie => movie.id === id));
            }
        } catch (error) {
            console.error('Error checking favorite status:', error);
        }
    };

    useEffect(() => {
        fetchMovieDetail().catch(console.error);
        fetchRecommendations().catch(console.error);
    }, [id]);

    useFocusEffect(
        useCallback(() => {
            checkIsFavorite().catch(console.error);
        }, [id])
    );

    const addFavorite = async (movie: Movie): Promise<void> => {
        try {
            const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
            let favMovieList: Movie[] = [];

            if (initialData !== null) {
                favMovieList = [...JSON.parse(initialData), movie];
            } else {
                favMovieList = [movie];
            }

            await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList));
            setIsFavorite(true);
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    const removeFavorite = async (id: number): Promise<void> => {
        try {
            const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
            if (initialData != null) {
                const favMovieList: Movie[] = JSON.parse(initialData);
                const updatedFavMovieList = favMovieList.filter(movie => movie.id !== id);
                await AsyncStorage.setItem('@FavoriteList', JSON.stringify(updatedFavMovieList));
                setIsFavorite(false);
            }
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    const handleFavoriteToggle = (): void => {
        if (movie != null) {
            if (isFavorite) {
                removeFavorite(movie.id).catch(console.error);
            } else {
                addFavorite(movie).catch(console.error);
            }
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
        <ScrollView>
            <View style={styles.container}>
                {movie != null && (
                    <>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${(movie.backdrop_path.length > 0) ? movie.backdrop_path : movie.poster_path}` }}
                                style={styles.backdrop}
                            />
                            <View style={styles.overlay}>
                                <View>
                                <Text style={styles.title}>{movie.title}</Text>
                                <Text style={styles.ratingText}>⭐{movie.vote_average}</Text>
                                </View>
                                <TouchableOpacity onPress={handleFavoriteToggle}>
                                    <FontAwesome 
                                        name={isFavorite ? 'heart' : 'heart-o'} 
                                        size={24} 
                                        color={isFavorite ? 'red' : 'white'} 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.overview}>{movie.overview}</Text>
                        <View style={styles.info}>
                            <View style={styles.infoColumn}>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Original Language</Text>
                                    <Text style={styles.infoValue}>{movie.original_language}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Release Date</Text>
                                    <Text style={styles.infoValue}>{movie.release_date.toString()}</Text>
                                </View>
                            </View>
                            <View style={styles.infoColumn}>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Popularity</Text>
                                    <Text style={styles.infoValue}>{movie.popularity}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Vote Count</Text>
                                    <Text style={styles.infoValue}>{movie.vote_count}</Text>
                                </View>
                            </View>
                        </View>
                    </>
                )}
                <View style={styles.RecommendationHeader}>
                    <View style={styles.purpleLabel}></View>
                    <Text style={styles.recommendationTitle}>Recommendation</Text>
                </View>
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
                                <View style={styles.recommendationOverlay}>
                                    <Text style={styles.recommendationTitleText}>{item.title}</Text>
                                    <Text style={styles.recommendationRating}>⭐ {item.vote_average}</Text>
                                </View>
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
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'relative',
    },
    backdrop: {
        width: '100%',
        height: 250,
        borderRadius: 8,
    },
    overlay: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 0,
        left: 0,
        right: 0,
        
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    ratingText: {
        fontSize: 18,
        color: 'yellow',
        marginTop: 8,
    },
    overview: {
        marginTop:'5%',
        fontSize: 16,
        marginVertical: 8,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    infoColumn: {
        width: '48%',
    },
    infoRow: {
        marginBottom: 7,
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    infoValue: {
        fontSize: 14,
    },
    recommendationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    recommendationItem: {
        marginRight: 8,
        position: 'relative',
    },
    recommendationImage: {
        width: 100,
        height: 150,
        borderRadius: 8,
    },
    recommendationOverlay: {
        position: 'absolute',
        bottom: 8,
        left: 8,
    },
    recommendationTitleText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    recommendationRating: {
        fontSize: 12,
        color: 'yellow',
        marginTop: 4,
    },
    purpleLabel: {
        width: 20,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#8978A4',
        marginRight: 12,
    },
    RecommendationHeader: {
        marginLeft: 6,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        marginTop: '5%',
    },
});

export default MovieDetail;
