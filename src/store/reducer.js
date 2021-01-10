const initialState = {
    persons: [
        {
            id: '001', // not really unique but good enough here!
            name: 'Max',
            age: '26'
        },
        {
            id: '002', // not really unique but good enough here!
            name: 'Delwin',
            age: '26'
        }
    ]
}


const reducer = (state = initialState, action) => {
    return state;
};

export default reducer;
