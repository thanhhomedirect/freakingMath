/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Icon} from 'react-native-elements';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const Rate: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'gray'}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.questionWrapper}>
              <View style={styles.questionInner}>
                <Text style={styles.questionText}>1+1=2</Text>
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Freaking </Text>
              <Text style={styles.sectionTitleBold}>Math</Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.playButton}>
              <Icon name="play-arrow" type="material" color="#517fa4" />
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.optionsButton}>
              <View style={styles.rateButton}>
                <Icon name="star-half" type="material" color="#e67315" />
              </View>
              <View style={styles.rankButton}>
                <Icon name="team" type="antdesign" color="#e67315" />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'gray',
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
    marginTop: 128,
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
  rateButton: {
    backgroundColor: Colors.lighter,
    padding: 10,
    width: 100,
    borderWidth: 2,
    borderColor: Colors.lighter,
    borderRadius: 5,
    marginRight: 5,
  },
  rankButton: {
    backgroundColor: Colors.lighter,
    padding: 10,
    width: 100,
    borderWidth: 2,
    borderColor: Colors.lighter,
    borderRadius: 5,
  },
  optionsButton: {
    marginTop: 10,
    flexDirection: 'row',
  },
  questionText: {
    fontSize: 56,
  },
});

export default Rate;
