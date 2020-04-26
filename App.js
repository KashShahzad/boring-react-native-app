import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import Screen from "./components/Screen";
import GameScreen from "./components/GameScreen";
import GameOver from "./components/GameOver";

export default function App() {
  const [selectNumber, setSelectNumber] = useState()
  const [guessRounds, setGuessRoundes] = useState(0)

  const forNewGame = () => {
    setGuessRoundes(0)
    setSelectNumber(null)
  }

  const startGameHandler = selectedN => {
    setSelectNumber(selectedN)
  }

  const gameOverHandler = numOfRounds => {
    setGuessRoundes(numOfRounds)
  }

  let content =  <Screen onStartGame={startGameHandler} />

  if(selectNumber && guessRounds <=0) {
    content = <GameScreen userChoice={selectNumber} onGameOver ={gameOverHandler} />
  }else if(guessRounds > 0){
    content = <GameOver userNumbers={selectNumber} roundNumbers={guessRounds} newGame={forNewGame} />
  }

  return (
    <View style={styles.container}>
      <Header title="BORING APP" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
