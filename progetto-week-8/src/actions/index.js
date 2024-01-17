export const addToHistory = (city) => {
    return { type: "ADD_TO_HISTORY", payload: city}
}

export const changeBackground = (url) => {
    return { type: "CHANGE_BACKGROUND",  payload: url}
}
