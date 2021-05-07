/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useCallback, useRef} from 'react';
import _, {map} from 'lodash';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Header} from 'components';
import {Colors} from 'assets';
import {SearchBar} from 'react-native-elements';
import api from 'api';

const Rate = ({navigation}) => {
  const inputRef = useRef(null);
  const [keyword, setKeyword] = useState('');
  const [definitions, setDefinitions] = useState([]);

  const onChangeKeyword = text => {
    setKeyword(text);
  };
  const onFocusSearch = () => {
    console.log('focused');
  };

  const onBlurSearch = () => {
    if (keyword === '') {
      // setIsShowCancel(false);
    }
    Keyboard.dismiss();
  };
  const onClearSearch = () => {
    setKeyword('');
    inputRef?.current?.focus();
  };

  useEffect(() => {
    if (keyword === '') return;
    const timer = setTimeout(() => {
      api.owlbot
        .getTranslateWord(keyword)
        .then(res => {
          console.log('res', res);
          setDefinitions(res.definitions);
        })
        .catch(e => {
          console.log('e', e);
        });
    }, 1000);

    return () => clearTimeout(timer);
  }, [keyword]);
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
        <View style={styles.searchBarWrapper}>
          <SearchBar
            inputContainerStyle={[styles.backgroundColorWhite, styles.height40]}
            inputStyle={[styles.backgroundColorWhite, styles.fontSize15]}
            containerStyle={styles.searchContainer}
            ref={inputRef}
            onFocus={onFocusSearch}
            onBlur={onBlurSearch}
            onClear={onClearSearch}
            placeholder="Type Here..."
            onChangeText={onChangeKeyword}
            searchIcon={{
              type: 'font-awesome',
              color: Colors.cloudyBlue,
              name: 'search',
              size: 16,
            }}
            value={keyword}
          />
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.content}>
          {map([...definitions], (item, index) => {
            return <Text>{`definitions: ${item.definition}`}</Text>;
          })}
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
  fontSize15: {
    fontSize: 15,
  },
  content: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  height40: {
    height: 40,
  },
  backgroundColorWhite: {backgroundColor: 'white', color: Colors.darkGrey},
  searchContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 0.5,
    marginVertical: 15,
    paddingBottom: 1,
    borderRadius: 4,
    borderColor: Colors.cloudyBlue,
    borderTopColor: Colors.cloudyBlue,
    borderBottomColor: Colors.cloudyBlue,
    padding: 0,
  },
  searchBarWrapper: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Rate;
