import React from 'react'
import { View, Text, StyleSheet  } from 'react-native'

export default function Favorite(): JSX.Element {
    return (
        <View style={styles.container}>
            <Text>Favorite</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'

    },
})