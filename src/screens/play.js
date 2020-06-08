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

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(progress - 0.01);
    }, 20);
    return () => clearInterval(interval);
  }, [progress]);
  useEffect(() => {
    generate();
  }, []);

  const generate = () => {
    const localIstrue = Math.round(Math.random()) >= 0.5;
    const a = Math.round(Math.random()) + 1;
    const b = Math.round(Math.random()) + 2;
    let c = a + b;
    setIsTrue(localIstrue);
    if (!localIstrue) {
      alert(localIstrue)
      c =
        c +
        a * (Math.round(Math.random()) + 1) -
        b * (Math.round(Math.random()) + 1);
    }
    setOperator(`${a}+${b}=${c}`);
  };
  const onPressLeftButton = useCallback(() => {
    if (isTrue) {
      generate();
      setProgress(1.11);
      return;
    }
    navigation.navigate('Home');
  }, [isTrue, navigation]);
  const onPressRightButton = useCallback(() => {
    if (!isTrue) {
      generate();
      setProgress(1.11);
      return;
    }
    navigation.navigate('Home');
  }, [isTrue, navigation]);
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
                <Text>Best: </Text>
              </View>
              <View style={styles.rightHeader}>
                <Text>Score: </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 50,
  },
  leftHeader: {
    fontSize: 150,
  },
});

export default Play;
