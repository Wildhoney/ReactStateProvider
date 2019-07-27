import React from 'react';
import { Store } from 'react-store-provider';
import * as duckStore from '../../stores/dice';
import Dice from '../Dice';

export default function Layout() {
    return (
        <Store name="dice" store={duckStore}>
            <Dice />
        </Store>
    );
}
