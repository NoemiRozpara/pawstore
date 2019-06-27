import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

import Images from '../utils/images';

const ProductTile = props => {
  if (!props.item || !props.onPress) return null;

  const { name, price, imageName } = props.item;
  const image = imageName && Images[imageName];

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.tile}>
      {image ? <Image source={image} resizeMode="contain" style={styles.productImage} /> : null}
      <View style={styles.infoRow}>
        <Text style={[styles.font, styles.name]}>{name}</Text>
        <Text style={styles.font}>{price}🐾</Text>
      </View>
      <View style={styles.learnMoreButton}>
        <Text style={[styles.font, styles.learnMoreText]}>Learn more »</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductTile;

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 20,
  },
  productImage: {
    flexDirection: 'row',
    flex: 1,
    height: 200,
    marginBottom: 10,
  },
  infoRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    flex: 1,
  },
  name: {
    flex: 0.8,
  },
  learnMoreButton: {
    backgroundColor: '#D96C06',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  learnMoreText: {
    color: '#FFF',
  },
  font: {
    fontSize: 20,
  },
});
