import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

export function createStoreProvider(store, DataContext) {
    function StoreProvider({ value, children }) {
        const reducer = useReducer(store.reducer, value);

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
        value: store.initialState,
    };

    return StoreProvider;
}
