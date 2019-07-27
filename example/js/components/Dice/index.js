import React from 'react';
import { useStore } from 'react-store-provider';
import * as e from './styles';
import * as utils from './utils';

export default function Dice() {
    const [store, actions] = useStore('dice');

    return (
        <e.Container>
            <e.Value
                key={store.value}
                ref={element => utils.handleAnimation(element, store.value)}
            >
                {store.value}
            </e.Value>
            <e.Button onClick={actions.roll}>Roll Dice</e.Button>
        </e.Container>
    );
}
