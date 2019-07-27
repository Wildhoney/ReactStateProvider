import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import * as utils from './utils';

const stores = new Map();

export function Store({ name, store, ...props }) {
    if (stores.has(name)) {
        const { StoreProvider } = stores.get(name);
        return <StoreProvider {...props} />;
    }

    const DataContext = createContext(store.initialState);
    const StoreProvider = utils.createStoreProvider(store, DataContext);

    const useStore = mapper => {
        const [state, dispatch] = useContext(DataContext);
        const dispatcher =
            typeof store.actions === 'function'
                ? store.actions(dispatch)
                : dispatch;

        return [mapper(state), dispatcher];
    };

    stores.set(name, { useStore, StoreProvider });
    return <StoreProvider {...props} />;
}

Store.propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.symbol]),
    store: PropTypes.shape({
        initialState: PropTypes.any.isRequired,
        actions: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
            .isRequired,
        reducer: PropTypes.func.isRequired,
    }).isRequired,
};

Store.defaultProps = {
    name: null,
};

export function useStore(name, mapper = a => a) {
    const store = stores.get(name);
    if (!store)
        throw new Error(
            `Unable to find a store named ${name} — only: ${[
                ...stores.keys(),
            ].join(', ')}\n`,
        );
    return store.useStore(mapper);
}
