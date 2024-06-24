import React from 'react'
import { View, Text, StyleSheet  } from 'react-native'

export default function Search(): JSX.Element {
    return (
        <View style={styles.container}>
            <Text>Search</Text>
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