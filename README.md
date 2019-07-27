# React Store Provider

> Another way to manage global state in any given component tree using providers and hooks. 

![Travis](http://img.shields.io/travis/Wildhoney/ReactStoreProvider.svg?style=flat-square)
&nbsp;
![Coveralls](https://img.shields.io/coveralls/Wildhoney/ReactStoreProvider.svg?style=flat-square)
&nbsp;
![npm](http://img.shields.io/npm/v/react-store-provider.svg?style=flat-square)
&nbsp;
![License MIT](https://img.shields.io/badge/license-MIT-lightgrey.svg?style=flat-square)

* **npm**: `npm react-store-provider`
* **yarn**: `yarn add react-store-provider`
<!-- * **Heroku**: [http://react-store-provider.herokuapp.com/](http://react-store-provider.herokuapp.com/) -->

## Getting Started

You must setup your store exporting `initialState`, `actions`, `reducer` &ndash; `initialState` is the initial state of the store and should be a standard object, `reducer` is a standard Redux-esque reducer function for manipulating the state, and the `actions` can either be a standard object or a function that binds the `dispatch`.

```javascript
export const initialState = { label: 'foo' };

const actionTypes = {
    update: Symbol('update')
}

export const actions = dispatch => ({
    update: payload => dispatch({ type: actionTypes.update, payload }),
});

export function reducer(state, action) {
    switch (action.type) {
        case actionTypes.update:
            return { ...state, label: action.payload };
        default:
            return state;
    }
}
```

Once your store is all setup use `createStore` to initialise it and then `getStore` to get a reference to the hook. You must have the `StoreProvider` in your tree before using the `useStore` hook.

```javascript
import { createStore } from 'react-store-provider';
import * as store from './foobar-store';

export default function Parent({ children }) {
    const StoreProvider = createStore('foobar', store);

    return (
        <StoreProvider>
            {children}
        </StoreProvider>
    );
}
```

After adding the `StoreProvider` to your tree, you can happily use the `useStore` in all child components. When you dispatch any actions from your child components and the state is updated, the state will be updated in all components that utilise the state from the provider.

```javascript
import { useStore } from 'react-store-provider';

export default function Child() {
    const [store, actions] = useStore('foobar');

    return (
        <div onClick={() => actions.update('bar')}>
            {store.label}
        </div>
    );
}
```
