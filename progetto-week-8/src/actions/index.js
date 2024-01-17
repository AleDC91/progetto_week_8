export const addToHistory = (city) => {
    return { type: "ADD_TO_HISTORY", payload: city}
}

export const changeBackground = (url) => {
    return { type: "CHANGE_BACKGROUND",  payload: url}
}

export const changeCoordinates = (coordinates) => {
    return { type: "CHANGE_COORDINATES", payload: coordinates}
}
