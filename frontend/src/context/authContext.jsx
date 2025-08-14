import { createContext, useContext, useEffect, useReducer } from "react";
import Reducer from "./reducer"

const Context = createContext();

const ContextProvider = ({ children }) => {
    const I_S = {
        
        admin: JSON.parse(localStorage.getItem("admin")) || null,
        isFeatching: false,
        error: false,
        islogin: JSON.parse(localStorage.getItem("admin")) ? true :false
    }

    const [state, dispatch] = useReducer(Reducer, I_S);
    useEffect(()=>{
        localStorage.setItem("admin",JSON.stringify(state.admin));
    },[state.admin])
    return (
        <div>
            <Context.Provider value={{ state, dispatch }}>
                {children}
            </Context.Provider>
        </div>
    )
}
export const setContext=()=>useContext(Context)
export default ContextProvider


