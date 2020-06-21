import { types } from '../types';
const initialState = {
    results: [],
    templates: [],
    isAdding: false
}

export default (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case types.SET_DEPLOYMENT:
            return { ...state, ...payload };
        case types.SET_TEMPLATE:
            return { ...state, ...payload };
        case types.SET_IS_ADDING:
            return { ...state, ...payload };
        default:
            return state;
    }
};