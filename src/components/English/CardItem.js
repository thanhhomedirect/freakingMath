import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from 'assets';

const CardItem = ({navigation, item, pronunciation}) => {
  const {type, definition, emoji, example} = item;
  return (
    <>
      <View style={styles.cardWrapper}>
        <View style={styles.default} />
        <View style={styles.contentWord}>
          {pronunciation && (
            <View style={styles.wrapperLine}>
              <Text style={styles.pronunciation}>{pronunciation}</Text>
            </View>
          )}
          {type && (
            <View style={styles.wrapperLine}>
              <Text style={styles.type}>{type}</Text>
            </View>
          )}
          {definition && (
            <View style={styles.wrapperLine}>
              <Text style={styles.definition}>{`${definition} ${emoji ||
                ''}`}</Text>
            </View>
          )}
          {example && (
            <View style={styles.wrapperLine}>
              <Text style={styles.example}>{`"${example}"`}</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  default: {
    width: 150,
    height: 150,
    backgroundColor: Colors.cloudyBlue,
    alignSelf: 'center',
    borderRadius: 75,
  },
  cardWrapper: {
    padding: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.cloudyBlue,
    marginBottom: 20,
  },
  contentWord: {
    marginTop: 30,
  },
  type: {
    fontSize: 18,
    color: Colors.darkGrey,
  },
  definition: {
    fontSize: 16,
  },
  example: {
    fontSize: 16,
    color: Colors.coolGreyTwo,
    fontStyle: 'italic',
  },
  pronunciation: {
    fontSize: 20,
    color: Colors.darkGrey,
  },
  wrapperLine: {
    marginVertical: 7,
  },
});

export default CardItem;
