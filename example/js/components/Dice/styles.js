import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-gap: 10px;
    text-align: center;
    width: 70px;
    height: 70px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 5px;
`;

export const Value = styled.div`
    width: 100px;
    height: 100px;
    font-weight: bold;
    pointer-events: none;
`;

export const Button = styled.button`
    border: 0;
    padding: 5px 10px;
    background-color: darkgray;
    border-radius: 5px;
    color: white;
    outline: none;
    cursor: pointer;
`;
