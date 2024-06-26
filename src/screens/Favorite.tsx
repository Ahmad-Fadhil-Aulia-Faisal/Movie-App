import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import type { Movie } from '../types/app';

const Favorite = (): JSX.Element => {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const navigation = useNavigation();

    const fetchFavorites = async (): Promise<void> => {
        try {
            const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
            if (initialData != null) {
                const parsedData: Movie[] = JSON.parse(initialData);
                setFavorites(parsedData);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchFavorites().catch(console.error);
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
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
                            <FontAwesome 
                                        name={ 'heart'} 
                                        size={20} 
                                        color={ 'red'} 
                                    />
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
});

export default Favorite;
