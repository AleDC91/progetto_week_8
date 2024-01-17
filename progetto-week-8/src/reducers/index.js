export default function storeReducer( state = {}, action) {
     
    switch (action.type) {

        case "CHANGE_BACKGROUND":
            return {...state, homeBackground: action.payload};
     
        case "ADD_TO_HISTORY":
            return {...state, pastSearch: [...state.pastSearch, action.payload]}
        
        default:
            return state;
     }

    
}