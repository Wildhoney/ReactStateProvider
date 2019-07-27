import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const stores = new Map();

export function createStore(name, duck) {
    if (stores.has(name)) return stores.get(name).StoreProvider;

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

    const useStore = mapper => {
        const [state, dispatch] = useContext(DataContext);
        const dispatcher =
            typeof duck.actions === 'function'
                ? duck.actions(dispatch)
                : dispatch;

        return [mapper(state), dispatcher];
    };

    stores.set(name, { useStore, StoreProvider });
    return StoreProvider;
}

export function useStore(name, mapper = a => a) {
    return stores.get(name).useStore(mapper);
}
