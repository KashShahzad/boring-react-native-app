import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Button,Text, Alert } from "react-native";
import NumberContainer from "./NumberContainer";
import Card from "./Card";

const generateScreenP = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateScreenP(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateScreenP(1, 100, props.userChoice)
  );
  const [rounds, setRounds] = useState(0)

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const {onGameOver, userChoice} = props

  useEffect(() => {
      if(currentGuess === userChoice){
          onGameOver(rounds)
      }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if((direction === 'lower' && currentGuess < props.userChoice)||(direction === 'great' && currentGuess> props.userChoice)){
         Alert.alert('Don\'t lie! ', 'you know thats wrong', [{text:'Sorry', style:'cancel'}])
         return
  }
  if(direction === 'lower'){
    currentHigh.current = currentGuess
  }
  else{
      currentLow.current = currentGuess
  }
  const nextGuess = generateScreenP(currentLow.current, currentHigh.current, currentGuess)
  setCurrentGuess(nextGuess)
  setRounds(currentRounds => currentRounds + 1 )
}

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess!</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonC}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'great')} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonC: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
