import _ from 'lodash';
import interceptor from './interceptor';

async function getTranslateWord(text = 'hello') {
  const url = `api/v4/dictionary/${text}`;
  const res = await interceptor.get(url);
  const word = _.get(res, 'data');
  return word;
}

export default {
  getTranslateWord,
};
