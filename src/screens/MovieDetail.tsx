import React from 'react'
import { View, Text, Button } from 'react-native'

const MovieDetail = ({ navigation }: any): any => {
    const fetchData = (): void => {
        // Gantilah dengan akses token Anda
        const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzI5ZWE2NzBlOTAzMDgzODRhMjc1N2MxNTI3YzNiZCIsIm5iZiI6MTcxOTMwNzk5NC43NjcwMjMsInN1YiI6IjY2N2E4YmQ3NGFmOTM1YTgwY2Y2OWE3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OXZXdWsk5imXuUF72CEtaFcexxF_BsB8GaPoLjP32FY'

        const url =
            'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        }

        fetch(url, options)
            .then(async (response) => await response.json())
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Movie Detail Page</Text>
            <Button
                title="Fetch Data"
                onPress={() => {
                    fetchData()
                }}
            />
        </View>
    )
}

export default MovieDetail