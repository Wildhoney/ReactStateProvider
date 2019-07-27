import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import test from 'ava';
import delay from 'delay';
import { mount } from 'enzyme';
import sinon from 'sinon';
import * as duck from './duck';
import { Store, useStore } from '../';

function Provider({ children }) {
    const [name, setName] = useState('Adam');
    useEffect(() => void setName('Maria'), []);

    return (
        <x-name onClick={() => setName('Maria')}>
            Name: {name}
            <Store name={duck.name} store={duck}>
                {children}
            </Store>
        </x-name>
    );
}

Provider.propTypes = { children: PropTypes.node.isRequired };

function Component({ onMount }) {
    useEffect(onMount, []);
    const [store, actions] = useStore(duck.name);
    return <p onClick={() => actions.setName('Maria')}>Hello {store.name}!</p>;
}

Component.propTypes = { onMount: PropTypes.func.isRequired };

test('It should be able to retrieve and update the state;', async t => {
    const spies = { mount: sinon.spy() };
    const wrapper = mount(<Component onMount={spies.mount} />, {
        wrappingComponent: Provider,
    });

    t.is(wrapper.find('p').text(), 'Hello Adam!');
    t.is(spies.mount.callCount, 1);

    wrapper.find('p').simulate('click');
    t.is(wrapper.find('p').text(), 'Hello Maria!');
    t.is(spies.mount.callCount, 1);

    await delay(1);
    t.is(spies.mount.callCount, 1);
});
