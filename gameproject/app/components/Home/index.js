import React, { Component } from 'react'
import {
  Text,
  View,
  Alert,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  AsyncStorage,
  Dimensions,
} from "react-native";
import Sidebar from "../Sidebar";
import Options from '../Options';
import ShowImage from '../ShowImage';
import ModalName from "../ModalName";
import TopPlayers from "../TopPlayers";


var styles = require('./styles');

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      window: 'start',
      newGame: false,
      elements: [],
      numberOfFields: 12,
      numbersToMix: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      levels: [
        {
          id: 0,
          name: 'EASY',
          numberOfFields: 8
        },
        {
          id: 1,
          name: 'MEDIUM',
          numberOfFields: 12
        },
        {
          id: 2,
          name: 'HARD',
          numberOfFields: 24
        }
      ],
      numberOfClicks: 0,
      attempts: 0,
      time: 0,
      imagesType: 'fruits',
      flag: 'poland',
      show: 'start',
      icons: [
        {
          id: 0,
          name: 'fruits',
          img: require('../../images/icons/fruits.png')
        },
        {
          id: 1,
          name: 'colors',
          img: require('../../images/icons/colors.png')
        },
        {
          id: 2,
          name: 'marks',
          img: require('../../images/icons/marks.png')
        },
      ],
      language: [
        {
          id: 0,
          name: 'britain',
          img: require('../../images/flags/BritainFlag.png')
        },
        {
          id: 1,
          name: 'poland',
          img: require('../../images/flags/PolandFlag.png')
        },
        {
          id: 2,
          name: 'croatia',
          img: require('../../images/flags/CroatiaFlag.png')
        },
      ],
      texts: [],
      optionsButton: '',
      newgameButton: '',
      resetTop5: '',
      saveButton: '',
      backButton: '',
      textIndex: 0,
      startTexts: [
        {
          id: 1,
          newGame: require('../../images/nowaGra.png'),
          settings: require('../../images/opcjeGry.png'),
          top5: require('../../images/top5.png'),
          exit: require('../../images/koniec.png')
        },
        {
          id: 2,
          newGame: require('../../images/newGame.png'),
          settings: require('../../images/settings.png'),
          top5: require('../../images/top5.png'),
          exit: require('../../images/exit.png'),
        },
        {
          id: 3,
          newGame: require('../../images/novaIgra.png'),
          settings: require('../../images/opcijeIgre.png'),
          top5: require('../../images/top5.png'),
          exit: require('../../images/izlaz.png'),
        }
      ],
      modalVisible: false,
      playerName: '',
      bestResults: [],
      top5level1: [
        {
          playerName: '_ _ _ _ _ _ _ _ _ _ _ _ _',
          level: 1,
          finishAttempts: ''
        }
      ],
      top5level2: [
        {
        playerName: '_ _ _ _ _ _ _ _ _ _ _ _ _',
        level: 2,
        finishAttempts: ''
      }
    ],
      top5level3: [
        {
        playerName: '_ _ _ _ _ _ _ _ _ _ _ _ _',
        level: 3,
        finishAttempts: ''
      }
    ],
    }
  }

  componentDidMount() {
    this.loadTopPlayers();
    this.initializeGame();
    this.translate();

  }

  saveTopPlayers = () => {
    const { top5level1, top5level2, top5level3 } = this.state;
    AsyncStorage.setItem('top5level1', JSON.stringify(top5level1));
    AsyncStorage.setItem('top5level2', JSON.stringify(top5level2));
    AsyncStorage.setItem('top5level3', JSON.stringify(top5level3));
  }

  loadTopPlayers = async () => {
    try {
      let t5l1 = await AsyncStorage.getItem('top5level1');
      let top5level1 = JSON.parse(t5l1);
      let t5l2 = await AsyncStorage.getItem('top5level2');
      let top5level2 = JSON.parse(t5l2);
      let t5l3 = await AsyncStorage.getItem('top5level3');
      let top5level3 = JSON.parse(t5l3);
      if (top5level1 !== null && top5level2 !== null && top5level3 !== null) {
        this.setState({
          top5level1,
          top5level2,
          top5level3
        }, () => {
          for (let i = 1; i <= 3; i++) {
            this.insertToTop({
              playerName: '_ _ _ _ _ _ _ _ _ _ _ _ _',
              level: i,
              finishAttempts: ''
            });
          }
        })
      }
    } catch (error) {
      alert('nic nie ma')
    }
  }


  exit_function = () => {
    const { texts } = this.state;
    Alert.alert(
      texts[10],
      texts[11],
      [
        { text: texts[14], onPress: () => BackHandler.exitApp() },
        { text: texts[15], onPress: () => console.log() },
      ],
      { cancelable: false }
    );
  }

  exitModal = () => {
    this.showContent('start');
    this.setModalVisible(false)
  }

  setModalVisible(visible) {
    visible ? this.initializeGame()
      :
      null;
    this.setState({ modalVisible: visible });
  }

  mixNumbers = () => {
    let numbers = this.state.numbersToMix;
    let position;
    let el;
    for (let i = 0; i < numbers.length; i++) {
      position = Math.floor((Math.random() * numbers.length));
      el = numbers.slice(position, position + 1)[0];
      numbers.splice(position, 1);
      numbers.push(el);
    }
    this.setState({
      numbersToMix: numbers
    })
  }

  initializeGame = () => {
    this.mixNumbers();
    const { numberOfFields } = this.state;
    let elements = [];
    let numbers = [];
    let imageId;
    let element = {};
    let i = 0;
    while (i <= numberOfFields - 1) {
      randomNumber = Math.floor((Math.random() * (numberOfFields / 2)) + 1);
      if (numbers.filter(nr => nr == randomNumber).length < 2) {
        numbers.push(randomNumber);
        imageId = numbers[i++];
        element = {
          id: i,
          imageId,
          visible: true,
          clicked: false
        }
        elements.push(element);
      }
    }
    this.setState({
      elements,
      numberOfClicks: 0,
      newGame: false,
      attempts: 0,
    });
  }

  resetGame = () => {
    this.setState({
      newGame: true,
    });
    setTimeout(
      () => this.setModalVisible(true)
      , 100)
  }

  onNewGamePress = () => {
    const { texts } = this.state;
    Alert.alert(
      texts[10],
      texts[11],
      [
        { text: texts[14], onPress: () => this.resetGame() },
        { text: texts[15], onPress: () => console.log() },
      ],
      { cancelable: false }
    )
  }

  resetTop5 = () => {
    this.setState({
      top5level1: [],
      top5level2: [],
      top5level3: [],
    },() => {
      for (let i = 1; i <= 3; i++) {
        this.insertToTop({
          playerName: '_ _ _ _ _ _ _ _ _ _ _ _ _',
          level: i,
          finishAttempts: ''
        });
      }
    })
  }

  onResetTop5 = () => {
    const { texts } = this.state;
    Alert.alert(
      texts[17],
      texts[11],
      [
        { text: texts[14], onPress: () => this.resetTop5() },
        { text: texts[15], onPress: () => console.log() },
      ],
      { cancelable: false }
    )
  }

  addNewBest = (best, actualTop5) => {
    let newTop5 = actualTop5.filter(el => el.playerName !== '_ _ _ _ _ _ _ _ _ _ _ _ _');
    if (newTop5.length < 5) {
      if (best.playerName !== '_ _ _ _ _ _ _ _ _ _ _ _ _') {
        newTop5.push(best);
      }
      newTop5.sort((a, b) => a.finishAttempts - b.finishAttempts);
      while (newTop5.length < 5) {
        newTop5.push({
          playerName: '_ _ _ _ _ _ _ _ _ _ _ _ _',
          level: 1,
          finishAttempts: ''
        })
      }
    } else {
      const lastTop = newTop5[4];
      const lastTopAttempts = lastTop.finishAttempts;
      if (best.finishAttempts < lastTopAttempts) {
        if (best.playerName !== '_ _ _ _ _ _ _ _ _ _ _ _ _') {
          newTop5.splice(4, 1, best);
        }
        newTop5.sort((a, b) => a.finishAttempts - b.finishAttempts);
      }
    }
    return newTop5;
  }

  insertToTop = (best) => {
    const { top5level1, top5level2, top5level3 } = this.state;
    let actualTop5, newTop5;
    switch (best.level) {
      case 1:
        actualTop5 = top5level1.slice();
        newTop5 = this.addNewBest(best, actualTop5);
        this.setState({
          top5level1: newTop5,
        }, () => this.saveTopPlayers())
        break;
      case 2:
        actualTop5 = top5level2;
        newTop5 = this.addNewBest(best, actualTop5);
        this.setState({
          top5level2: newTop5,
        }, () => this.saveTopPlayers())
        break;
      case 3:
        actualTop5 = top5level3;
        newTop5 = this.addNewBest(best, actualTop5);
        this.setState({
          top5level3: newTop5
        }, () => this.saveTopPlayers())
        break;
      default:
        break;
    }
  }

  bestResults = () => {
    const { bestResults, attempts, playerName, numberOfFields } = this.state;
    let level = 0;
    switch (numberOfFields) {
      case 8:
        level = 1;
        break;
      case 12:
        level = 2;
        break;
      case 24:
        level = 3;
        break;
      default:
        break;
    }
    let finishAttempts = attempts + 1;
    let best = { level, playerName, finishAttempts };
    this.insertToTop(best)
  }

  hideElements = () => {
    const { numberOfClicks, elements, attempts, texts, playerName } = this.state;
    if (numberOfClicks >= 2) {
      let clickedElements = elements.filter(x => x.clicked == true);
      let newElements = elements.map(x => {
        return {
          ...x,
          clicked: false
        };
      });
      if (clickedElements &&
        clickedElements[0].imageId == clickedElements[1].imageId) {
        setTimeout(() => {
          newElements[clickedElements[0].id - 1].visible = false;
          newElements[clickedElements[1].id - 1].visible = false;
          if (newElements.filter(x => x.visible == true).length <= 0) {
            this.bestResults()
            Alert.alert(
              `${playerName}${texts[12]}`,
              `${texts[13]} ${this.state.attempts + 1}`,
              [
                { text: 'OK', onPress: () => this.setModalVisible(true) },
              ],
              { cancelable: false }
            )
          };
          this.setState({
            elements: newElements,
            numberOfClicks: 0,
            attempts: attempts + 1
          })
        }, 450);
      }
      else {
        setTimeout(() => {
          if (newElements.filter(x => x.visible == true).length <= 0) {
            Alert.alert(
              `${playerName}${texts[12]}`,
              `${texts[13]} ${this.state.attempts + 1}`,
              [
                { text: 'OK', onPress: () => this.initializeGame() },
              ],
              { cancelable: false }
            )
          };
          this.setState({
            elements: newElements,
            numberOfClicks: 0,
            attempts: attempts + 1
          })
        }, 1500);
      }
    }
  }



  showImage = (id) => {
    const { elements, numberOfClicks } = this.state;
    elements[id].clicked = true;
    this.setState({
      elements,
      numberOfClicks: numberOfClicks + 1
    }, () => this.hideElements())
  }
  showOptions = (arg) => {
    let show = arg;
    (show == 'start') ? this.initializeGame() : null;
    this.setState({
      show
    })
  }

  showOptionsPress = (arg) => {
    const { texts } = this.state;
    Alert.alert(
      texts[10],
      texts[11],
      [
        { text: texts[14], onPress: () => this.showOptions(arg) },
        { text: texts[15], onPress: () => console.log() },
      ],
      { cancelable: false }
    )
  }

  changeImages = (icon) => {
    let imagesType = icon;
    this.setState({
      imagesType
    })
  }
  changeLevel = (level) => {
    let numberOfFields = level;
    this.setState({
      numberOfFields
    })
  }
  changeModalText = (playerName) => {
    this.setState({ playerName })
  }
  translate = () => {
    const pol = [
      'Wybierz obrazki',
      'Poziom trudności',
      'Język',
      'Pokaż opcje',
      'Liczba prób',
      'Nowa gra', // 5
      'Zapisz',
      'Łatwy',
      'Średni',
      'Trudny',
      'Chcesz zakończyć grę!', // 10
      'Jesteś tego pewien?',
      ', jesteś zwycięzcą!',
      'Twój wynik to: ',
      'Tak',
      'Nie', // 15
      'Powrót',
      'Chcesz wyczyścić listę top5!',
      'Wyczyść listę',
      'Jak masz na imię?',
      'Wyjdź', // 20
      'Twoje imię',
    ];
    const ang = [
      'Choose pictures',
      'Difficulty level',
      'Language',
      'Show options',
      'Attempts',
      'New game', // 5
      'Save',
      'Easy',
      'Medium',
      'Hard',
      'You want to end this game!', // 10
      'Are you sure?',
      ', you are the winner!',
      'Your result is: ',
      'Yes',
      'No', // 15
      'Back',
      'You want to clear the list',
      'Clear the list',
      "What's your name?",
      'Exit', // 20
      'Your name',
    ];
    const cro = [
      'Odaberite slike',
      'Razina težine',
      'Jezik',
      'Prikaz opcija',
      'Broj pokušaja',
      'Nova igra', // 5
      'Spremi',
      'Lako',
      'Srednja',
      'Teška',
      'Želite okončati igru', // 10
      'Jeste li sigurni u to?',
      ', vi ste pobjednik!',
      'Vaš rezultat je: ',
      'Tako',
      'Nije', // 15
      'Natrag',
      'Želite izbrisati popis',
      'Izbrišite popis',
      'Kako se zoveš',
      'Izlaz', // 20
      'Tvoje ime',
    ];
    const { flag, levels } = this.state;
    let texts = '';
    let textIndex = 0;
    switch (flag) {
      case 'poland':
        texts = pol;
        textIndex = 0;
        break;
      case 'britain':
        texts = ang;
        textIndex = 1;
        break;
      case 'croatia':
        texts = cro;
        textIndex = 2;
        break;
      default:
        break;
    }
    levels[0].name = texts[7];
    levels[1].name = texts[8];
    levels[2].name = texts[9];

    this.setState({
      texts,
      textIndex,
      optionsButton: texts[3],
      newgameButton: texts[5],
      saveButton: texts[6],
      backButton: texts[16],
      resetTop5: texts[18],
      levels,
    })
  }
  changeLanguage = (lang) => {
    let flag = lang;
    this.setState({
      flag
    }, () => this.translate())
  }
  backToStart = () => {
    const { texts } = this.state;
    (this.state.show == 'game') ?
      Alert.alert(
        texts[10],
        texts[11],
        [
          { text: texts[14], onPress: () => this.showContent('start') },
          { text: texts[15], onPress: () => console.log() },
        ],
        { cancelable: false }

      )
      :
      this.showContent('start')
  }

  showContent = (content) => { // top5 do zrobienia
    if (content == 'game') { this.setModalVisible(true) }
    if (content !== 'start') {
      this.setState({
        window: content,
        show: content
      })
    } else {
      this.setState({
        window: content
      })
    }
  }

  render() {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;
    const {
      numberOfClicks,
      imagesType,
      newGame,
      show,
      numberOfFields,
      numbersToMix,
      texts,
      optionsButton,
      newgameButton,
      resetTop5,
      saveButton,
      backButton,
      startTexts,
      textIndex,
      modalVisible,
      playerName,
      top5level1,
      top5level2,
      top5level3,
    } = this.state;

    switch (numberOfFields) {
      case 8:
        widthEl = width/3;
        heightEl = height/8;
        break;
      case 12:
        widthEl = width/4;
        heightEl = height/8;
        break;
      case 24:
        widthEl = width/5;
        heightEl = height/11;
        break;
      default:
        break;
    }

    const allElements = this.state.elements.map((el, i) => {
      return (
        <ShowImage
          key={i}
          el={el}
          i={i}
          width={widthEl}
          height={heightEl}
          imageId={el.imageId}
          visible={el.visible}
          clicked={el.clicked}
          numberOfClicks={numberOfClicks}
          numbersToMix={numbersToMix}
          imagesType={imagesType}
          newGame={newGame}
          showImage={(id) => this.showImage(id)}
        />
      )
    })

    let mainField;
    if (show == 'game') {
      mainField =
        <View style={styles.board}>
          {allElements}
        </View>
    }
    if (show == 'options') {
      mainField =
        <Options
          changeImages={(icon) => this.changeImages(icon)}
          changeLevel={(level) => this.changeLevel(level)}
          changeLanguage={(lang) => this.changeLanguage(lang)}
          icons={this.state.icons}
          imagesType={this.state.imagesType}
          numberOfFields={this.state.numberOfFields}
          levels={this.state.levels}
          language={this.state.language}
          flag={this.state.flag}
          texts={this.state.texts}
        />
    }
    if (show == 'top5') {
      mainField =
        <TopPlayers
          top5level1={this.state.top5level1}
          top5level2={this.state.top5level2}
          top5level3={this.state.top5level3}
          texts={texts}
        />
    }

    let header;
    if (show == 'game') {
      header =
        <ImageBackground
          style={styles.background}
          resizeMode='cover'
          source={require('../../images/gradient.png')} >
          <View style={styles.headersElements}>
            <View style={styles.showOptions}>
              <Button
                title={optionsButton}
                onPress={() => this.showOptionsPress('options')}
                color="#1d8ed1"
                width={200}
              ></Button>
            </View>
            <View style={styles.attemptsContainer}>
              <Text style={styles.attempts}>
                {texts[4]}: {this.state.attempts}
              </Text>
            </View>
          </View>
        </ImageBackground>

    }
    if (show == 'options') {
      header =
        <ImageBackground
          style={styles.background}
          resizeMode='cover'
          source={require('../../images/gradient.png')} >
          <View style={styles.headersElements}>
            <View style={styles.showOptions}>
              <Button
                title={saveButton}
                onPress={() => this.showContent('start')}
                color="#1d8ed1"
                width={200}
              ></Button>
            </View>
            <View style={styles.attemptsContainer}></View>
          </View>
        </ImageBackground>

    }
    if (show == 'top5') {
      header =
        <ImageBackground
          style={styles.background}
          resizeMode='cover'
          source={require('../../images/gradient.png')} >
          <View style={styles.headersElements}>
            <View style={styles.showOptions}>
              <Button
                title={backButton}
                onPress={() => this.showContent('start')}
                color="#1d8ed1"
                width={200}
              ></Button>
            </View>
            <View style={styles.attemptsContainer}></View>
          </View>
        </ImageBackground>
    }

    const newGameButton = (show == 'game') ?
      <View style={styles.newGameContainer}>
        <Button
          title={newgameButton}
          onPress={this.onNewGamePress}
          color="#1d8ed1"
        />
      </View>
      : (show == 'top5') ?
      <View style={styles.newGameContainer}>
        <Button
          title={resetTop5}
          onPress={this.onResetTop5}
          color="#1d8ed1"
        />
      </View>
      :
      <View style={styles.newGameContainer} />

    const start =
      <View style={styles.startContainer}>
        <Image
          style={{
            width: '100%',
            resizeMode: 'contain',
            flex: 1
          }}
          source={require('../../images/stars.png')} />
        <Image
          style={{
            resizeMode: 'contain',
            flex: 1,
            transform: [{ scale: 0.7 }]
          }}
          source={require('../../images/memoo-logo.png')} />
        <TouchableOpacity
          style={[styles.splashContainer, styles.splashNewGame]}
          onPress={() => this.showContent('game')}
        >
          <Image
            style={[styles.background, styles.splash]}
            source={startTexts[textIndex].newGame} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.splashContainer, styles.splashOptions]}
          onPress={() => this.showContent('options')}
        >
          <Image
            style={[styles.background, styles.splash]}
            source={startTexts[textIndex].settings} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.splashContainer, styles.splashTop5]}
          onPress={() => this.showContent('top5')}
        >
          <Image
            style={[styles.background, styles.splash]}
            source={startTexts[textIndex].top5} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.splashContainer, styles.splashExit]}
          onPress={this.exit_function}
        >
          <Image
            style={[styles.background, styles.splash]}
            source={startTexts[textIndex].exit} />
        </TouchableOpacity>
        <Image
          source={require('../../images/stars.png')}
          style={{
            width: '100%',
            resizeMode: 'contain',
            flex: 1,
            transform: [{ rotate: '180deg' }]
          }} />

      </View>

    const player = (show == 'game') ?
      <View style={styles.playerName}>
        <Text style={styles.playerNameText}>{texts[21]}: {playerName}</Text>
      </View>
      :
      null

    const home =
      <View style={styles.container}>
        <ModalName
          modalVisible={modalVisible}
          playerName={playerName}
          texts={texts}
          setModalVisible={(visible) => this.setModalVisible(visible)}
          changeModalText={(name) => this.changeModalText(name)}
          exitModal={() => this.exitModal()}
        />
        <View style={styles.sidebar}>
          <Sidebar
            backToStart={(content) => this.backToStart(content)}
          />
        </View>
        <View style={styles.header}>
          {header}
        </View>
        <View style={styles.mainField}>
          {mainField}

        </View>
        {player}

        <View style={styles.newGame}>
          {newGameButton}
        </View>

      </View>

    return (
      <ImageBackground
        style={styles.background}
        source={require('../../images/background.jpg')} >
        <View style={{ flex: 1 }}>
          {
            (this.state.window == 'start') ? start : home
          }
        </View>
      </ImageBackground>
    )
  }
}