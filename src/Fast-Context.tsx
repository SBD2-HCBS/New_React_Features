

import React, {useState, createContext, useContext, useRef, useCallback, useEffect,useSyncExternalStore} from "react";

type Store = {
    first: string;
    last: string;
}

//create a custom function to return the store value
function useStoreData(): {
    get: () => Store;
    set: (value: Partial<Store>) => void;
    subscribe: (callback: () => void) => () => void;
} {
    const store = useRef({
        first: "",
        last: "",
    });

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<Store>) => {
        store.current = { ...store.current, ...value };
        subscribers.current.forEach((callback) => callback());
    }, []);


    const subscribe = useCallback((callback: () => void) => {
        subscribers.current.add(callback);
        return () => subscribers.current.delete(callback);
    }, []);

    return {
        get,
        set,
        subscribe,
    };
}

//create a type for useStoreData
type UseStoreDataReturnType=ReturnType<typeof useStoreData>;


const StoreContext =  createContext<UseStoreDataReturnType | null>(null);

//Create a provider function to wrap the app
const Provider=({children}:{children:React.ReactNode})=>{
    const store=useStoreData();
    return(
        <StoreContext.Provider value={useStoreData()}>
            {children}
        </StoreContext.Provider>
    )
}

function useStore<SelectorOutput>(
    selector: (store: Store) => SelectorOutput
): [SelectorOutput, (value: Partial<Store>) => void] {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error("Store not found");
    }
   //Gonna use State External Store to replace this useState and useEffect

    // const [state,setState]=useState(store.get());
    // useEffect(()=>{
    //     return store.subscribe(()=>{
    //         setState(store.get());
    //     })
    // },[]);

    const state = useSyncExternalStore(store.subscribe, () =>
        selector(store.get())
    );

    return [state,store.set];
}


//ceate a TextInput component
const TextInput=({value }:{value: "first" | "last"})=>{
    //create a state for the text input
   // const [store,setStore]=useStore();

    //Instead of getting the whole store I would like to just subscribe to the values I need first and last
    const [fieldValue, setStore] = useStore((store) => store[value]);
    return(
        <div className="field">
            {value}:{""}
            <input
                type="text"
                value={fieldValue}
                onChange={(e)=>setStore({[value]:e.target.value})}
            />
        </div>
    )
}

const Display=({value}:{value: "first" | "last"})=>{
    //use the store context
    const [fieldValue ] = useStore((store) => store[value]);
    return(
        <div className="field">
            {value}:{fieldValue}
        </div>
    )
}

const FormContainer= ()=>{
    return(
        <div className="container">
            <h5>Form Container</h5>
            <TextInput value="first" />
            <TextInput value="last" />
        </div>
    )
}


function DisplayContainer() {
    return(
        <div>
            <h5>Display Container</h5>
            <Display value="first" />
            <Display value="last" />
        </div>
    )
}

const ContentContainer=()=>{
    return(
        <div>
            <FormContainer />
            <DisplayContainer />
        </div>
    )
}

const FastContext = () => {
    return (
        <Provider>
            <div className='container'>
                <h1>UseContext</h1>
                <ContentContainer />
            </div>
        </Provider>
    )


}
export default FastContext;