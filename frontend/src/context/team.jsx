import React from 'react'

const Context = React.createContext({
    teamList: [],
    addMember: () => {},
    // removeMember: () => {},
})

export default Context;
