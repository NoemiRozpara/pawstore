import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { PanGestureHandler, ScrollView, State } from 'react-native-gesture-handler';
import { Animated } from 'react-native-reanimated';

import shoppingCart from '../assets/icons/shoppingCart.png';

export default class DraggableCart extends Component {

  constructor(props) {
    super(props);
    this._translateX = new Animated.Value(0);
    this._translateY = new Animated.Value(0);
    this._lastOffset = { x: 0, y: 0 };
    this._onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this._translateX,
            translationY: this._translateY,
          },
        },
      ],
      {
        listener: event => {
          const { translationX, translationY } = event.nativeEvent;
          this.props.onMove(translationX, translationY);
        },
        useNativeDriver: true,
      }
    );
  }

  _onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastOffset.x += event.nativeEvent.translationX;
      this._lastOffset.y += event.nativeEvent.translationY;
      this._translateX.setOffset(this._lastOffset.x);
      this._translateX.setValue(0);
      this._translateY.setOffset(this._lastOffset.y);
      this._translateY.setValue(0);
    }
  };

  render() {
    return(
      <PanGestureHandler {...this.props} onGestureEvent={this._onGestureEvent} onHandlerStateChange={this._onHandlerStateChange}>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [{ translateX: this._translateX }, { translateY: this._translateY }],
            },
            this.props.boxStyle,
          ]}
        >
          <Image source={shoppingCart} style={{ width: 26, height: 26 }} />
        </Animated.View>
      </PanGestureHandler>
    )
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
