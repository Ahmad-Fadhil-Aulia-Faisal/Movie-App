import React, { useCallback, useState, } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
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
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('MovieDetail', { id: item.id });
                        }}
                    >
                        <View style={styles.movieItem}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                style={styles.movieImage}
                            />
                            <Text style={styles.movieTitle}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => `${item.id}-${index}`} // Use a combination of id and index
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:'10%',
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    movieItem: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        alignItems: 'stretch'
    },
    movieImage: {
        width: '20%',
        height: 100,
        borderRadius: 8,
        marginRight: 16,
    },
    movieTitle: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        color:'white',
    },
});

export default Favorite;
