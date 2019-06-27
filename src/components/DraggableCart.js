import React from 'react';
import { StyleSheet, Image, PanResponder, Dimensions, Animated } from 'react-native';

import shoppingCart from '../assets/icons/shoppingCart.png';

class DraggableCart extends React.Component {
  constructor(props) {
    super(props);
    // init future transform value
    this.animatedValue = new Animated.ValueXY();

    // init helper for keeping transform between gestures - without this component would jump on every new gesture
    this._value = { x: 0, y: 0 };
    this.animatedValue.addListener(value => (this._value = value));

    // init pan responder
    this.panResponder = PanResponder.create({
      // ask for permissions
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      // on gesture start start counting from stored values
      onPanResponderGrant: (e, gestureState) => {
        this.animatedValue.setOffset({
          x: this._value.x,
          y: this._value.y,
        });
        this.animatedValue.setValue({ x: 0, y: 0 });
      },

      // update transform value using gesture movement delta
      onPanResponderMove: (event, gestureState) => {
        this.animatedValue.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
    });
  }

  render() {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const cartSize = { width: 70, height: 70 };

    // don't allow component movement outside the screen
    const constrainedX = this.animatedValue.x.interpolate({
      inputRange: [-screenWidth + cartSize.width, 0],
      outputRange: [-screenWidth + cartSize.width, 0],
      extrapolate: 'clamp',
    });
    const constrainedY = this.animatedValue.y.interpolate({
      inputRange: [-screenHeight + cartSize.height, 0],
      outputRange: [-screenHeight + cartSize.height, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ translateX: constrainedX }, { translateY: constrainedY }],
          },
        ]}
        {...this.panResponder.panHandlers}
      >
        <Image source={shoppingCart} style={{ width: 26, height: 26 }} />
      </Animated.View>
    );
  }
}

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
