/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import * as Progress from 'react-native-progress';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const {width} = Dimensions.get('window');

const Play = ({navigation}) => {
  const [progress, setProgress] = useState(1);
  const [operator, setOperator] = useState('');
  const [isTrue, setIsTrue] = useState(true);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(progress - 0.01);
    }, 20);
    return () => clearInterval(interval);
  }, [progress]);
  useEffect(() => {
    generateCalculation();
  }, [generateCalculation]);

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomOperator() {
    let operators = ['+', '-', '*'];
    let ran = Math.floor(Math.random() * operators.length);
    return operators[ran];
  }

  const generateCalculation = useCallback(() => {
    let number1 = getRandomNumber(1 * level, 5 * level);
    let number2 = getRandomNumber(1 * level, 5 * level);
    let op = getRandomOperator();
    setScore(score + 1);
    setOperator(
      `${number1}+${number2}=${getRandomResult(number1, number2, op)}`,
    );
  }, [getRandomResult, level, score]);

  const getRandomResult = useCallback(
    (number1, number2, op) => {
      let randomResult = Math.random() >= 0.5; //tỉ lệ đúng sai 50:50
      setIsTrue(randomResult);
      return randomResult
        ? getResult(number1, number2, op)
        : getFakeResult(number1, number2, op);
    },
    [getFakeResult],
  );

  function getResult(number1, number2, op) {
    const c = number1 + number2;
    return c;
  }

  const getFakeResult = useCallback((number1, number2, op) => {
    let fakeResult = getRandomNumber(
      getResult(number1, number2, op) - 10,
      getResult(number1, number2, op) + 10,
    );
    return fakeResult === getResult(number1, number2, op)
      ? getFakeResult(number1, number2, op)
      : fakeResult;
  }, []);

  const onPressLeftButton = useCallback(() => {
    if (isTrue) {
      generateCalculation();
      setProgress(1.11);
      return;
    }
    // navigation.navigate('Home');
    alert('Gà vl');
  }, [isTrue, generateCalculation]);
  const onPressRightButton = useCallback(() => {
    if (!isTrue) {
      generateCalculation();
      setProgress(1.11);
      return;
    }
    // navigation.navigate('Home');
    alert('Gà vl');
  }, [isTrue, generateCalculation]);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'gray'}}>
        <Progress.Bar
          progress={progress}
          width={width}
          color={'#f1f5f8'}
          height={16}
          style={{marginTop: 50}}
        />
        <View style={styles.comtainer}>
          <View style={styles.body}>
            <View style={styles.header}>
              <View style={styles.leftHeader}>
                <Text style={styles.headerText}>Best: </Text>
              </View>
              <View style={styles.rightHeader}>
                <Text style={styles.headerText}>Score: {score}</Text>
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.questionWrapper}>
              <View style={styles.questionInner}>
                <Text style={styles.questionText}>{operator}</Text>
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.optionsButton}>
              <View style={styles.trueButton}>
                <Icon
                  name="check"
                  type="material"
                  size={130}
                  color="green"
                  onPress={onPressLeftButton}
                />
              </View>
              <View style={styles.falseButton}>
                <Icon
                  name="clear"
                  type="material"
                  size={130}
                  color="red"
                  onPress={onPressRightButton}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  comtainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  sectionContainer: {
    marginTop: 64,
    paddingHorizontal: 36,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
  },
  sectionTitleBold: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.white,
  },
  questionWrapper: {
    marginTop: -70,
    paddingHorizontal: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionInner: {
    backgroundColor: Colors.lighter,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.lighter,
    borderRadius: 5,
    width: width - 50,
    alignItems: 'center',
  },
  playButton: {
    marginTop: 46,
    backgroundColor: Colors.lighter,
    padding: 10,
    width: 100,
    borderWidth: 2,
    borderColor: Colors.lighter,
    borderRadius: 5,
  },
  trueButton: {
    backgroundColor: Colors.lighter,
    padding: 10,
    height: 150,
    width: 150,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.lighter,
    borderRadius: 5,
    marginRight: 5,
  },
  falseButton: {
    backgroundColor: Colors.lighter,
    padding: 10,
    height: 150,
    width: 150,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.lighter,
    borderRadius: 5,
  },
  optionsButton: {
    marginBottom: 70,
    flexDirection: 'row',
  },
  questionText: {
    fontSize: 50,
  },
  header: {
    marginTop: 20,
    paddingHorizontal: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  leftHeader: {
    fontSize: 150,
  },
  headerText: {
    fontSize: 20,
    color: Colors.lighter,
  },
});

export default Play;
