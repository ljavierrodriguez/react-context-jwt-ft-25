import { createContext, useEffect, useState } from "react";
import getState from "./flux";

export const Context = createContext()

const injectContext = PassedComponent => {
    const StoreWrapper = props => {

        const [state, setState] = useState(getState({
            getStore: () => state.store,
            getActions: () => state.actions,
            setStore: updateStore => setState({
                store: Object.assign(state.store, updateStore),
                actions: { ...state.actions }
            })
        }))

        useEffect(() => {
            // actions a ejecutar al cargar la pagina
            state.actions.checkCurrentUser()
        }, [])


        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        )
    }

    return StoreWrapper
}

export default injectContext