import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const KeywordSearch = () => {
  const [keyword, setKeyword] = useState<string>('');

  const handleSearch = () => {
    console.log('Searching for:', keyword);
    // Implement logic to perform actual search here
    // For example, you can send keyword to a search function or API call
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by keyword"
        onChangeText={text => setKeyword(text)}
        value={keyword}
        onSubmitEditing={handleSearch} // Triggers search when "Enter" is pressed
      />
      <Button
        title="Search"
        onPress={handleSearch}
        disabled={!keyword} // Disables button if keyword is empty
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default KeywordSearch;
