import { createContext, useContext, useEffect, useReducer } from "react";
import Reducer from "./reducer"
import { postApi } from "../api";
const Context = createContext();

const ContextProvider = ({ children }) => {
    const I_S = {

        admin: JSON.parse(localStorage.getItem("admin")) || null,
        isFeatching: false,
        error: false,
        islogin: JSON.parse(localStorage.getItem("admin")) ? true : false
    }

    const [state, dispatch] = useReducer(Reducer, I_S);
    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(state.admin));
        const checkAuth = async () => {
            try {
                const data = await postApi('/auth/me', { name: state?.admin?.name, password: state?.admin?.password });
            } catch (err) {
                console.error('❌ Authentication failed:', err);
                // dispatch({
                //     type: "authfail",
                //     adminData: data
                // });
                dispatch({ type: "authfail" });
            }
        };

        checkAuth();
    }, [state.admin])
    console.log(state);

    return (
        <div>
            <Context.Provider value={{ state, dispatch }}>
                {children}
            </Context.Provider>
        </div>
    )
}
export const setContext = () => useContext(Context)
export default ContextProvider


