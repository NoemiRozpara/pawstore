import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';

import ProductTile from '../components/ProductTile';
import DraggableCart from '../components/DraggableCart';
import { products } from '../data/products.json';

class FeaturedProducts extends React.Component {
  state = {
    cartPositionX: 0,
    array: [1, 2, 3],
  };

  updatePosition = cartPositionX => {
    let array = [];
    for (let i = 0; i < Math.abs(cartPositionX); i++) {
      array.push(Math.random());
    }
    this.setState({ cartPositionX, array });
  };

  render() {
    return (
      <SafeAreaView>
        <DraggableCart onMove={this.updatePosition} />
        <ScrollView>
          <View style={styles.testOutputBox}>
            {this.state.array.map(item => (
              <Text key={item}>ITEM {item}</Text>
            ))}
          </View>
          <Text>Gesture state X is: {this.state.cartPositionX}</Text>
          {products.map((item, index) => (
            <ProductTile key={index} item={item} onPress={() => {}} />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  testOutputBox: {
    height: 50,
    width: '100%',
    overflow: 'hidden',
  },
});

export default FeaturedProducts;
