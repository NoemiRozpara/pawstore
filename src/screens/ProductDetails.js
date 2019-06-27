import React from 'react';
import { SafeAreaView, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Images from '../utils/images';

import { products } from '../data/products.json';

const ProductDetails = props => {
  const item = products[0];
  console.log(item);
  const image = item.imageName && Images[item.imageName];
  return item ? (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {image ? <Image source={image} resizeMode="contain" style={styles.productImage} /> : null}
        <View style={styles.productNameContainer}>
          <Text style={styles.productNameText}>{item.name}</Text>
        </View>
        <Text style={styles.productDescription}>{item.description}</Text>
        <View style={styles.purchaseContainer}>
          <Text style={styles.price}>{item.price}🐾</Text>
          <TouchableOpacity onPress={() => {}} style={styles.purchaseButton}>
            <Text style={styles.purchaseButtonText}>Add to cart »</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  productNameContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  productNameText: {
    fontSize: 25,
  },
  productDescription: {
    fontSize: 20,
  },
  purchaseContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    marginTop: 15,
  },
  price: {
    fontSize: 20,
    flex: 0.3,
    paddingVertical: 10,
  },
  purchaseButton: {
    backgroundColor: '#BDBF09',
    paddingVertical: 10,
    paddingHorizontal: 30,
    flex: 0.7,
    alignItems: 'center',
  },
  purchaseButtonText: {
    fontSize: 20,
    color: '#FFF',
  },
});

export default ProductDetails;
