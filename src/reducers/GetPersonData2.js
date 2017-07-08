export default function person2Data (state={}, action) {
  switch(action.type){
    case 'GET_PERSON_DATA_2':
      return {
        ...state,
        person: action.payload
      };
    default:
      return state;
  }
};
