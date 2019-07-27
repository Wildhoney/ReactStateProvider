import roll from 'roll-a-die';

export const handleAnimation = (element, value) => {
    element &&
        roll({
            element,
            values: [value],
            numberOfDice: 1,
            delay: 1000000,
            callback: () => {},
        });
};
