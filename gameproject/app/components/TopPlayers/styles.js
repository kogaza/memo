var React = require('react-native');

var myStyles = React.StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around'
  },
  topPlayersContainer: {
    flex: 6,
    alignSelf: 'stretch',
    paddingLeft: '20%',
    paddingTop: 30,
    justifyContent: 'space-around'

  },  
  button: {
    marginTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  level: {
    color: 'black',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#d3f2ff',
    borderRadius: 5,
    fontWeight: 'bold',
    fontSize: 16,
    opacity: 0.3
  },

})

module.exports = myStyles;