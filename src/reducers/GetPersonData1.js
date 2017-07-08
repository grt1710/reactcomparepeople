export default function person1Data (state={}, action) {
  switch(action.type){
    case 'GET_PERSON_DATA_1':
      return {
        ...state,
        person: action.payload
      };
    default:
      return state;
  }
};
