import React, { createContext, useState } from 'react'


export const rootContex = createContext(null);
const ContexProvider = ({children}) => {

    const [value, setValue] = useState("");
  return (
    <div>
        <rootContex.Provider value={{value, setValue}}>
            {children}
        </rootContex.Provider>
    </div>
  )
}

export default ContexProvider