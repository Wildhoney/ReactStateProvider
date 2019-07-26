import { createContext, useContext, useReducer } from 'react';
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
        const [state] = useContext(DataContext);
        return state;
    };

    const useActions = () => {
        const [, dispatch] = useContext(DataContext);
        return typeof duck.actions === 'function'
            ? duck.actions(dispatch)
            : duck.actions;
    };

    stores.set(name, { StoreProvider, useStore, useActions });

    return { StoreProvider, useStore, useActions };
}

export function getStore(name) {
    const store = stores.get(name);
    return { useStore: store.useStore, useActions: store.useActions };
}
