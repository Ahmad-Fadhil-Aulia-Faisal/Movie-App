import React from 'react'
import { View, Text, Button } from 'react-native'

const MovieDetail = ({ navigation }: any): any => {
  const fetchData = (): void => {
    // Gantilah dengan akses token Anda
    const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWQxZDQ1MWVkZTc3NTMwZjYwZDRhNjE0OTk2YzQwMCIsIm5iZiI6MTcxOTI5MTk3OC4xNDI3OSwic3ViIjoiNjY3YTQzNmVhMzI5YTgzODUzMDc4NThmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1GQUn_7WDAnqY_Det8rNutJ0Ak7GLKwEkIuxOYSgBYQ'

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