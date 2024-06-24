import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export default function MovieDetail({navigation}:any): JSX.Element {
    return (
        <View style={styles.container}>
            <Text>Movie Page</Text>
            <Button 
            title='Pergi Ke Movie Detail'
            onPress={()=>navigation.navigate('MovieDetail')}
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