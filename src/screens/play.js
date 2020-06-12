import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  Modal,
} from 'react-native';
import {Icon} from 'react-native-elements';
import * as Progress from 'react-native-progress';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';

const {width} = Dimensions.get('window');
const backgroundColors = ['green', 'gray', 'purple'];

const Play = ({navigation}) => {
  const [progress, setProgress] = useState(1);
  const [operator, setOperator] = useState('');
  const [isTrue, setIsTrue] = useState(true);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [colorRandom, setColorRandom] = useState('gray');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(progress - 0.01);
    }, 20);
    if (progress <= 0) {
      clearInterval(interval);
      failToWin();
    }
    return () => clearInterval(interval);
  }, [progress, score, setValueInStore]);

  useEffect(() => {
    getRandomColor();
  }, [score]);

  useEffect(() => {
    async function setState() {
      const data = await getStoreData();
      setHighScore(data);
    }
    setState();
    generateCalculation();
  }, [generateCalculation, storeData]);

  const setValueInStore = useCallback(
    async value => {
      const data = await getStoreData();
      if (value <= data) return;
      setIsNewBest(true);
      setHighScore(score);
      storeData(score);
    },
    [score, storeData],
  );

  const storeData = useCallback(async value => {
    try {
      await AsyncStorage.setItem('@high_score', value + '');
    } catch (e) {
      // saving error
    }
  }, []);
  const getStoreData = async () => {
    try {
      const value = await AsyncStorage.getItem('@high_score');
      if (value !== null) {
        return value;
      } else return 0;
    } catch (e) {
      // error reading value
    }
  };

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
    setOperator(
      `${number1}${op === '*' ? 'x' : op}${number2}=${getRandomResult(
        number1,
        number2,
        op,
      )}`,
    );
  }, [getRandomResult, level]);

  const getRandomResult = useCallback(
    (number1, number2, op) => {
      let randomResult = Math.random() >= 0.5;
      setIsTrue(randomResult);
      return randomResult
        ? getResult(number1, number2, op)
        : getFakeResult(number1, number2, op);
    },
    [getFakeResult],
  );

  function getResult(number1, number2, op) {
    let result;
    switch (op) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case '*':
        result = number1 * number2;
        break;
      default:
        alert('NOT FOUND');
    }
    return result;
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

  const onPressLeftButton = () => {
    if (isTrue) {
      answerTrue();
      return;
    }
    failToWin();
  };

  const onPressRightButton = () => {
    if (!isTrue) {
      answerTrue();
      return;
    }
    failToWin();
  };

  const failToWin = () => {
    setIsGameOver(true);
    setValueInStore(score);
    setLevel(1);
    setTimeout(() => {
      generateCalculation();
    }, 300);
  };

  const answerTrue = () => {
    const scoreTemp = score + 1;
    generateCalculation();
    setProgress(1.11);
    setScore(scoreTemp);
    checkBeforeUpdateLevel(scoreTemp);
  };
  const onPressClosedModal = () => {
    setIsGameOver(!isGameOver);
    navigation.navigate('Home');
  };
  const onPressPlayAgain = () => {
    setIsGameOver(!isGameOver);
    setScore(0);
    setProgress(1);
    setIsNewBest(false);
  };
  const checkBeforeUpdateLevel = scoreParam => {
    const checkLevel = scoreParam % 10;
    const levelTemp = Math.floor(scoreParam / 10);
    if (checkLevel !== 0 || levelTemp === 0) return;
    setLevel(levelTemp + 1);
  };
  const getRandomColor = () => {
    var item =
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    setColorRandom(item);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: colorRandom}}>
        {!isGameOver && (
          <Progress.Bar
            progress={progress}
            width={width}
            color={'#f1f5f8'}
            height={16}
            style={{marginTop: 50}}
          />
        )}
        {!isGameOver && (
          <View style={styles.comtainer}>
            <View style={styles.body}>
              <View style={styles.header}>
                <View style={styles.leftHeader}>
                  <Text style={styles.headerText}>Best: {highScore}</Text>
                </View>
                <View style={styles.leftHeader}>
                  <Text style={styles.headerText}>Level: {level}</Text>
                </View>
                <View style={styles.leftHeader}>
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
        )}
      </SafeAreaView>
      <Modal animationType="slide" transparent={true} visible={isGameOver}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Game Over</Text>
            <Text style={styles.modalTextScore}>{score}</Text>
            {isNewBest && (
              <View style={styles.modalTextNewBestWrapper}>
                <Text style={styles.modalTextNewBestText}>New Best!</Text>
              </View>
            )}
            {!isNewBest && (
              <View style={styles.modalTextNewBestWrapper}>
                <Text style={styles.modalTextVeryGoodText}>Good!</Text>
              </View>
            )}
            <View style={styles.groupBtn}>
              <View style={styles.playButton}>
                <Icon
                  onPress={onPressPlayAgain}
                  name="play-arrow"
                  type="material"
                  color="#517fa4"
                />
              </View>
              <View style={styles.playButton}>
                <Icon
                  onPress={onPressClosedModal}
                  name="home"
                  type="material"
                  color="#517fa4"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
    // backgroundColor: 'blue',
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
    marginLeft: 10,
    marginRight: 10,
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
    backgroundColor: Colors.lighter,
    color: 'black',
    padding: 5,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(108, 122, 137, 1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 50,
    fontFamily: 'Cochin',
    color: 'white',
  },
  modalTextScore: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 60,
    color: 'white',
  },
  modalTextNewBestText: {
    color: '#20232a',
    fontSize: 30,
  },
  modalTextVeryGoodText: {
    color: 'green',
    fontSize: 30,
  },
  modalTextNewBestWrapper: {
    marginBottom: 15,
    textAlign: 'center',
    borderWidth: 4,
    borderColor: '#61dafb',
    borderRadius: 6,
    padding: 5,
    backgroundColor: '#61dafb',
  },
  groupBtn: {
    flexDirection: 'row',
  },
});

export default Play;
