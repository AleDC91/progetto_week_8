export default function storeReducer( state = {}, action) {
     
    switch (action.type) {

        case "CHANGE_BACKGROUND":
            return {...state, homeBackground: action.payload};
     
        case "ADD_TO_HISTORY":
            return {...state, pastSearch: [...state.pastSearch, action.payload]}
        
        case "CHANGE_COORDINATES":
            return {...state, coordinates : action.payload}
        default:
            return state;
     }

    
}