import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Easing
} from 'react-native'
var styles = require('./styles');

export default class ShowImage extends Component {
  componentWillMount() {
    this.animatedFrontValue = new Animated.Value(0);
    this.animatedBackValue = new Animated.Value(0);
    this.spinFrontValue = new Animated.Value(0);
    this.spinBackValue = new Animated.Value(0);
    this.value = 0;
    this.animatedFrontValue.addListener(({ value }) => {
      this.value = value;
    })
  }
  flipCard(side, id) {
    if (side == 'reset') {
      Animated.timing(this.animatedFrontValue, {
        toValue: 0,
        duration: 10,
        easing: Easing.linear
      }).start();
      Animated.timing(this.spinFrontValue, {
        toValue: 0,
        duration: 10,
        easing: Easing.linear
      }).start();
      Animated.timing(this.animatedBackValue, {
        toValue: 0,
        duration: 10,
        easing: Easing.linear
      }).start();
      Animated.timing(this.spinBackValue, {
        toValue: 0,
        duration: 10,
        easing: Easing.linear
      }).start();
    } else if (side == 'back') {
      Animated.timing(this.animatedFrontValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      }).start();
      Animated.timing(this.spinFrontValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear
      }).start();
      Animated.timing(this.animatedBackValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear
      }).start();
      Animated.timing(this.spinBackValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear
      }).start();
    } else if (side == 'front') {
      this.props.showImage(id);
      Animated.timing(this.animatedFrontValue, {
        toValue: 150,
        duration: 500,
        easing: Easing.linear
      }).start();
      Animated.timing(this.spinFrontValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear
      }).start();
      Animated.timing(this.animatedBackValue, {
        toValue: 150,
        duration: 500,
        easing: Easing.linear
      }).start();
      Animated.timing(this.spinBackValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear
      }).start();
    }
  }
  render() {
    const interpolateFrontColor = this.animatedFrontValue.interpolate({
      inputRange: [0, 150],
      outputRange: [0, 1],
    })
    const spinFront = this.spinFrontValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['-180deg', '0deg']
    })
    const animatedFrontStyle = {
      opacity: interpolateFrontColor,
      transform: [{ rotateY: spinFront }]
    }
    const interpolateBackColor = this.animatedBackValue.interpolate({
      inputRange: [0, 150],
      outputRange: [1, 0],
    })
    const spinBack = this.spinBackValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    })
    const animatedBackStyle = {
      opacity: interpolateBackColor,
      transform: [{ rotateY: spinBack }]
    }
    const {
      el,
      i,
      width,
      height,
      imageId,
      visible,
      clicked,
      numberOfClicks,
      imagesType,
      newGame,
      numbersToMix
    } = this.props;
    const colors = [
      require('../../images/colors/01.png'),
      require('../../images/colors/02.png'),
      require('../../images/colors/03.png'),
      require('../../images/colors/04.png'),
      require('../../images/colors/05.png'),
      require('../../images/colors/06.png'),
      require('../../images/colors/07.png'),
      require('../../images/colors/08.png'),
      require('../../images/colors/09.png'),
      require('../../images/colors/10.png'),
      require('../../images/colors/11.png'),
      require('../../images/colors/12.png'),
    ]
    const fruits = [
      require('../../images/fruits/01.png'),
      require('../../images/fruits/02.png'),
      require('../../images/fruits/03.png'),
      require('../../images/fruits/04.png'),
      require('../../images/fruits/05.png'),
      require('../../images/fruits/06.png'),
      require('../../images/fruits/07.png'),
      require('../../images/fruits/08.png'),
      require('../../images/fruits/09.png'),
      require('../../images/fruits/10.png'),
      require('../../images/fruits/11.png'),
      require('../../images/fruits/12.png'),
    ]
    const marks = [
      require('../../images/marks/01.png'),
      require('../../images/marks/02.png'),
      require('../../images/marks/03.png'),
      require('../../images/marks/04.png'),
      require('../../images/marks/05.png'),
      require('../../images/marks/06.png'),
      require('../../images/marks/07.png'),
      require('../../images/marks/08.png'),
      require('../../images/marks/09.png'),
      require('../../images/marks/10.png'),
      require('../../images/marks/11.png'),
      require('../../images/marks/12.png'),
    ]
    let images = [];
    switch (imagesType) {
      case 'fruits':
        images = fruits;
        break;
      case 'colors':
        images = colors;
        break;
      case 'marks':
        images = marks;
        break;
      default:
        break;
    }
    let img = '';
    switch (imageId) {
      case 1:
        img = images[numbersToMix[0]]
        break;
      case 2:
        img = images[numbersToMix[1]]
        break;
      case 3:
        img = images[numbersToMix[2]]
        break;
      case 4:
        img = images[numbersToMix[3]]
        break;
      case 5:
        img = images[numbersToMix[4]]
        break;
      case 6:
        img = images[numbersToMix[5]]
        break;
      case 7:
        img = images[numbersToMix[6]]
        break;
      case 8:
        img = images[numbersToMix[7]]
        break;
      case 9:
        img = images[numbersToMix[8]]
        break;
      case 10:
        img = images[numbersToMix[9]]
        break;
      case 11:
        img = images[numbersToMix[10]]
        break;
      case 12:
        img = images[numbersToMix[11]]
        break;
      default:
        break;
    }
    (numberOfClicks >= 2) ?
      setTimeout(
        () => this.flipCard('back')
        , 1000)
      : null;
    (numberOfClicks == 1 && newGame) ?
      this.flipCard('reset')
      : null;
    let imageBack =
      <Image
        style={{
          width: width,
          height: height,
          resizeMode: 'contain',
        }}
        source={require('../../images/memoo-logo.png')} />
    let imageFront =
      <Image
        style={{
          width: width,
          height: height,
          resizeMode: 'contain',

        }}
        source={img} />
    let field =
      (visible) ?
        (numberOfClicks < 2 && !clicked) ?
          <TouchableOpacity
            style={{ position: 'relative', margin: 2, }}
            onPress={() => this.flipCard('front', i)}
          >
            <Animated.View style={[
              animatedBackStyle,
              styles.box,
              styles.flipCardBack,
            ]} >
              {imageBack}
            </Animated.View>
            <Animated.View style={[
              animatedFrontStyle,
              styles.box
            ]}>
              {imageFront}
            </Animated.View>
          </TouchableOpacity>
          :
          <TouchableOpacity
            style={{ position: 'relative', margin: 2, }}
          >
            <Animated.View style={[
              animatedBackStyle,
              styles.box,
              styles.flipCardBack,
            ]} >
              {imageBack}
            </Animated.View>
            <Animated.View style={[
              animatedFrontStyle,
              styles.box
            ]}>
              {imageFront}
            </Animated.View>
          </TouchableOpacity>
        :
        <View
          style={{
            width: width,
            height: height,
            margin: 2
          }}
        />
    return (
      <View>
        {field}
      </View>
    )
  }
}
