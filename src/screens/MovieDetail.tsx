import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export default function MovieDetail({navigation}:any): JSX.Element {
    return (
        <View style={styles.container}>
            <Text>Movie Detail Page</Text>
            <Button 
            title='Kembali'
            onPress={()=>navigation.goBack()}
            />
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