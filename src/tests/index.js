import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';
import * as duck from './duck';
import {createStore, useStore} from '../';

function Provider(args) {
    const StoreProvider = createStore('person', duck);
    return <StoreProvider>{args.children}</StoreProvider>;
}

function Component() {
    const [store, actions] = useStore('person');
    return <p onClick={() => actions.setName('Maria')}>Hello {store.name}!</p>;
}

test('It should be able to retrieve and update the state;', t => {
    const wrapper = mount(<Component />, { wrappingComponent: Provider });
    t.is(wrapper.find('p').text(), 'Hello Adam!');
    wrapper.find('p').simulate('click');
    t.is(wrapper.find('p').text(), 'Hello Maria!');
});
