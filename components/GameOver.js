import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'

const GameOver = props => {
    return (
        <View style = {styles.screen}>
            <Text>Game is Over!</Text>
            <Text>The Number of Rounds: {props.roundNumbers}</Text>
            <Text>The Number was: {props.userNumbers}</Text>
            <Button title="Play Again!" onPress={props.newGame} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default GameOver