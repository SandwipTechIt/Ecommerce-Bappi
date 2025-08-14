const Reducer = (State, Action) => {
    switch (Action.type) {
        case "Loginstart":
            return {
                admin: null,
                isFeatching: true,
                error: false,
                islogin: false
            }
        case "Loginsuccess":
            return {
                admin: Action.adminData,
                isFeatching: false,
                error: false,
                islogin: true
            }
        case "Loginfail":
            return {
                admin: null,
                isFeatching: false,
                error: true,
                islogin: false
            }
        case "Logout":
            return {
                admin: null,
                isFeatching: false,
                error: false,
                islogin: false
            }

        default:
            return State;
    }
}
export default Reducer