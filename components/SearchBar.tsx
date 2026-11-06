import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBar = ({value, onChangeText}: SearchBarProps) => (
  <TextInput
    style={styles.input}
    placeholder="Search menu by name"
    value={value}
    onChangeText={onChangeText}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
});

export default SearchBar;
