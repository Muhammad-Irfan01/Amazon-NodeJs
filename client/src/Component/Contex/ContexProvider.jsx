import React, { createContext, useState } from 'react'


export const rootContex = createContext(null);
const ContexProvider = ({children}) => {
  const url = "http://localhost:5500"
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