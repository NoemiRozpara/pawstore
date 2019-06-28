import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { PanGestureHandler, ScrollView, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import shoppingCart from '../assets/icons/shoppingCart.png';

const { event, Value, cond, add, multiply, eq, set } = Animated;

class DraggableCart extends React.Component {
  constructor(props) {
    super(props);
    this._gestureX = new Value(0);
    this._gestureY = new Value(0);
    this._gestureState = new Value(0);

    // store gesture values
    this._onGestureEvent = event(
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
        useNativeDriver: true,
      }
    );
    this._translateX = this.showFeedbackOrSave(this._gestureX, this._gestureState);
    this._translateY = this.showFeedbackOrSave(this._gestureY, this._gestureState);
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
      <PanGestureHandler {...this.props} onGestureEvent={this._onGestureEvent} onHandlerStateChange={this._onGestureEvent}>
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
