import { ADD_ARTICLE } from '../constants/action-types';
import { foundBadWords } from '../actions/index';

const forbiddenWords = ['spam', 'money', 'sexy'];

export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === ADD_ARTICLE) {
        
        const foundWords = forbiddenWords.filter(word =>
          action.payload.title.toLowerCase().includes(word)
        );
        if (foundWords.length) {
          return dispatch(foundBadWords(foundWords));
        }
      }
      return next(action);
    };
  };
}