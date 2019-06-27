import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import ProductTile from '../components/ProductTile';
import DraggableCart from '../components/DraggableCart';
import { products } from '../data/products.json';

const FeaturedProducts = props => (
  <SafeAreaView>
    <DraggableCart />
    <ScrollView>
      {products.map((item, index) => (
        <ProductTile key={index} item={item} onPress={() => {}} />
      ))}
    </ScrollView>
  </SafeAreaView>
);

export default FeaturedProducts;
