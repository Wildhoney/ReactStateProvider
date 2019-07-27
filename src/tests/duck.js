export const initialState = {
    name: 'Adam',
};

const actionTypes = { setName: Symbol('set-name') };

export const actions = dispatch => ({
    setName: name => dispatch({ type: actionTypes.setName, payload: name }),
});

export function reducer(state, action) {
    switch (action.type) {
        case actionTypes.setName:
            return { ...state, name: action.payload };
    }

    return state;
}
