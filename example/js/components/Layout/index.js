import React from "react"
import {createStore} from 'react-store-provider'
import * as duckStore from '../../stores/dice'
import Dice from '../Dice';

export default function Layout() {
    const StoreProvider = createStore('dice', duckStore);

    return <StoreProvider><Dice /></StoreProvider>
}