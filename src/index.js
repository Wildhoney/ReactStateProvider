import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const stores = new Map();

export function createStore(name, duck) {
    if (stores.has(name)) return stores.get(name);

    const DataContext = createContext(duck.initialState);

    function StoreProvider({ value, children }) {
        const reducer = useReducer(duck.reducer, value);

        return (
            <DataContext.Provider value={reducer}>
                {children}
            </DataContext.Provider>
        );
    }

    StoreProvider.propTypes = {
        value: PropTypes.any,
        children: PropTypes.node.isRequired,
    };

    StoreProvider.defaultProps = {
        value: duck.initialState,
    };

    const useStore = () => {
        const [state, dispatch] = useContext(DataContext);
        const actions = typeof duck.actions === 'function'
            ? duck.actions(dispatch)
            : duck.actions;

        return [state, actions];
    };

    stores.set(name, useStore);
    return StoreProvider;
}

export function useStore(name) {
    return stores.get(name)();
}