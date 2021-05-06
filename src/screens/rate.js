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
  TouchableOpacity,
} from 'react-native';
import {Header} from 'components';
import {Colors} from 'assets';

const Rate = ({navigation}) => {
  const componentBtnLeftHeader = () => {
    return (
      <TouchableOpacity onPress={goBack} style={styles.boxLeft}>
        <Text style={styles.textHeaderLeft}>Back</Text>
      </TouchableOpacity>
    );
  };
  const goBack = () => {
    navigation.goBack();
  };
  const componentBtnRightHeader = () => {
    return (
      <TouchableOpacity onPress={null} style={styles.boxRight}>
        <Text style={styles.textHeaderLeft}>Done</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          titleHeader="Rate"
          btnLeft
          btnRight
          componentBtnLeft={componentBtnLeftHeader}
          componentBtnRight={componentBtnRightHeader}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.content}>
          <View>
            <Text>1+2</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boxLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    paddingLeft: 15,
  },
  boxRight: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  textHeaderLeft: {
    fontSize: 15,
    color: Colors.uglyBlue,
  },
  textHeaderRight: {
    fontSize: 15,
    color: Colors.tangerine,
  },
  content: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
});

export default Rate;
