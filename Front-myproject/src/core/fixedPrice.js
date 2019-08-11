const prices = [
    {
        _id: 0,
        name: "Any",
        array: {greaterThan: 0, lessThan: 9999}
    },
    {
        _id: 1,
        name: "$0 to $25",
        array: {greaterThan: 0, lessThan: 25}
    },
    {
        _id: 2,
        name: "$25 to $50",
        array: {greaterThan: 25, lessThan: 50}
    },
    {
        _id: 3,
        name: "$50 to $75",
        array: {greaterThan: 50, lessThan: 75}
    },
    {
        _id: 4,
        name: "$75 to $100",
        array: {greaterThan: 75, lessThan: 100}
    },
    {
        _id: 5,
        name: "More than $100",
        array: {greaterThan: 100, lessThan: 9999}
    }
];

export default prices