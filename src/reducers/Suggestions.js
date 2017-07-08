export default function suggestions (state=[], action) {
  switch(action.type){
    case 'GET_SUGGESTIONS':
      return {
        ...state,
        person: action.payload
      };
    default:
      return state;
  }
};
