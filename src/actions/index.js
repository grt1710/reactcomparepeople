export var getPersonData1 = (personInfo) => {
  return {
    type: 'GET_PERSON_DATA_1',
    payload: personInfo
  };
}

export var getPersonData2 = (personInfo) => {
  return {
    type: 'GET_PERSON_DATA_2',
    payload: personInfo
  };
}

export var getSuggestions = (suggestions) => {
  return {
    type: 'GET_SUGGESTIONS',
    payload: suggestions
  }
}
