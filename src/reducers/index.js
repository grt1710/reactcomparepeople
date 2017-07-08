import { combineReducers } from 'redux';
import person1Data from './GetPersonData1';
import person2Data from './GetPersonData2';
import suggestions from './Suggestions';

const rootReducer = combineReducers({
  person1Data: person1Data,
  person2Data: person2Data,
  suggestions: suggestions
});


export default rootReducer;
