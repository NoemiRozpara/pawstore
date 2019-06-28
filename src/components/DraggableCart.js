import React from 'react';
import { StyleSheet, Image, View, Dimensions } from 'react-native';
import { PanGestureHandler, ScrollView, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import shoppingCart from '../assets/icons/shoppingCart.png';

const { event, Value, cond, add, multiply, eq, set, interpolate, Extrapolate, block, call } = Animated;

class DraggableCart extends React.Component {
  constructor(props) {
    super(props);
    this._gestureX = new Value(0);
    this._gestureY = new Value(0);
    this._gestureState = new Value(0);

    // store gesture values
    this.onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationX: this._gestureX,
            translationY: this._gestureY,
            state: this._gestureState,
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

    // the same as setOffset in animated
    this._translateX = this.showFeedbackOrSave(this._gestureX, this._gestureState);
    this._translateY = this.showFeedbackOrSave(this._gestureY, this._gestureState);

    // check once, not every render
    this.windowSize = Dimensions.get('window');
    this.cartSize = { width: 70, height: 70 };

    // don't allow component movement outside the screen - X axis
    this.constrainedX = block([
      // call side effect here as this value will be called from render
      call([this._translateX], translation => this.props.onMove(translation)),
      interpolate(this._translateX, {
        inputRange: [-this.windowSize.width + this.cartSize.width, 0],
        outputRange: [-this.windowSize.width + this.cartSize.width, 0],
        extrapolate: Extrapolate.CLAMP,
      }),
    ]);

    // don't allow component movement outside the screen - Y axis
    this.constrainedY = interpolate(this._translateY, {
      inputRange: [-this.windowSize.height + this.cartSize.height, 0],
      outputRange: [-this.windowSize.height + this.cartSize.height, 0],
      extrapolate: Extrapolate.CLAMP,
    });
  }

  showFeedbackOrSave = (gestureTranslation, gestureState) => {
    const dragging = new Value(0);
    const start = new Value(0);
    const position = new Value(0);

    // reanimated conditional API: https://github.com/kmagiera/react-native-reanimated#cond
    return cond(
      // check if user is dragging
      eq(gestureState, State.ACTIVE),
      //if true
      [
        // if dragging flag not set yet
        cond(
          dragging,
          0,
          // set dragging and set start position from stored position
          [set(dragging, 1), set(start, position)]
        ),
        // add current gesture translation to position
        set(position, add(start, gestureTranslation)),
      ],

      // if false turn off dragging flag and store position
      [set(dragging, 0), position]
    );
  };

  render() {
    return (
      <PanGestureHandler {...this.props} onGestureEvent={this.onGestureEvent} onHandlerStateChange={this.onGestureEvent}>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [{ translateX: this.constrainedX }, { translateY: this.constrainedY }],
            },
          ]}
        >
          <Image source={shoppingCart} style={{ width: 26, height: 26 }} />
        </Animated.View>
      </PanGestureHandler>
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
