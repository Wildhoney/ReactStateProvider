import React from 'react';
import { useStore } from 'react-store-provider';
import styled from 'styled-components';
import rollADie from 'roll-a-die';

const Container = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-gap: 10px;
    text-align: center;
    width: 70px;
    height: 70px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 5px;
`;

const Value = styled.div`
    width: 100px;
    height: 100px;
    font-weight: bold;
    pointer-events: none;
`;

const Button = styled.button`
    border: 0;
    padding: 5px 10px;
    background-color: darkgray;
    border-radius: 5px;
    color: white;
    outline: none;
    cursor: pointer;
`;

export default function Dice() {
    const [store, actions] = useStore('dice');

    return (
        <Container>
            <Value
                key={store.value}
                ref={element => {
                    element && rollADie({
                        element,
                        values: [store.value],
                        numberOfDice: 1,
                        delay: 1000000,
                        callback: () => {},
                    });
                }}
            >
                {store.value}
            </Value>
            <Button onClick={actions.roll}>Roll Dice</Button>
        </Container>
    );
}
