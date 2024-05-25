import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';

const SearchBar = ({value,onChangeText}) => {
 
  


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Product..."
        value={value}
        onChangeText={onChangeText}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:20
  },
  searchBar: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor:"#FFF"
  },
  itemText: {
    padding: 10,
    fontSize: 18,
  },
});

export default SearchBar;
