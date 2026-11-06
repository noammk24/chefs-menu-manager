import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type MenuItemImageProps = {
  imageUri?: string;
  height?: number;
  marginTop?: number;
  marginBottom?: number;
};

const MenuItemImage = ({
  imageUri,
  height = 160,
  marginTop = 0,
  marginBottom = 0,
}: MenuItemImageProps) => {
  const imageStyle = [
    styles.image,
    {height, marginTop, marginBottom},
  ];

  if (!imageUri) {
    return (
      <View style={[imageStyle, styles.placeholder]}>
        <Text style={styles.placeholderText}>No picture selected</Text>
      </View>
    );
  }

  return (
    <Image
      source={{uri: imageUri}}
      style={imageStyle}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    borderRadius: 8,
  },
  placeholder: {
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#777777',
    fontSize: 14,
  },
});

export default MenuItemImage;
