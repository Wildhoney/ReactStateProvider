export const initialState = {
    value: Math.ceil(Math.random() * 6),
};

const actionTypes = { roll: Symbol('roll') };

export const actions = dispatch => ({
    roll: () =>
        dispatch({
            type: actionTypes.roll,
            payload: Math.ceil(Math.random() * 6),
        }),
});

export function reducer(state, action) {
    switch (action.type) {
        case actionTypes.roll:
            return { ...state, value: action.payload };
    }

    return state;
}
