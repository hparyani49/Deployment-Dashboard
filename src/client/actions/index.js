
import { types } from '../types';

export const setDeploymentData = (payload) => ({
    type: types.SET_DEPLOYMENT,
    payload: payload
});

export const setTemplates = (payload) => ({
    type: types.SET_TEMPLATE,
    payload: payload
});

export const setIsAdding = (payload) => async (dispatch, state) => {
    dispatch({
        type: types.SET_IS_ADDING,
        payload: payload
    })
}