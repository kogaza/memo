var React = require('react-native');

var myStyles = React.StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#1d8ed1",
    justifyContent: 'space-between'
  },
  background: {
    width: '100%',
    height: '100%',
  },
  startContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  splashContainer: {
    flex: 1,
  },
  splashNewGame: {
    width: 300,
  },
  splashOptions: {
    width: 260,
  },
  splashTop5: {
    width: 220,
  },
  splashExit: {
    width: 180,
  },
  splash: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebar: {
    flex: 5,
  },
  header: {
    flex: 3,
    borderBottomWidth: 1,
    borderColor: '#1d8ed1',
    // backgroundColor: "rgba(255, 254, 180, 0.6)",
  },
  mainField: {
    flex: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(29, 142, 209, 0.4)",
  },
  playerName: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(29, 142, 209, 0.4)",
    paddingBottom: 5,
  },
  playerNameText: {
    color: 'white'
  },
  board: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  newGame: {
    flex: 2,
  },
  headersElements: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    // backgroundColor: 'orange'
  },
  newGameContainer: {
    flex: 1,
    backgroundColor: '#1d8ed1'
  },
  showOptions: {
    paddingLeft: 20,
  },
  tile: {
    borderWidth: 5,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  attemptsContainer: {
    paddingRight: 20,
  },
  attempts: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'white',
  },
})

module.exports = myStyles;