import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

import shoppingCart from '../assets/icons/shoppingCart.png';

const DraggableCart = props => (
  <View style={styles.box}>
    <Image source={shoppingCart} style={{ width: 26, height: 26 }} />
  </View>
);

const styles = StyleSheet.create({
  box: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2292A4',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default DraggableCart;
