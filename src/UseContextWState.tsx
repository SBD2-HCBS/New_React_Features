import React,{useState,createContext, useContext, memo} from "react";

//create a custom function to return the store value
  function useStoreData(){
      const store= useState({
          first:"",
          last:""
      });
        return store;
}
//create a type for useStoreData
type UseStoreDataReturnType=ReturnType<typeof useStoreData>;


const StoreContext =  createContext<UseStoreDataReturnType | null>(null);

//ceate a TextInput component
const TextInput=({value }:{value: "first" | "last"})=>{
    //create a state for the text input
    const [store,setStore]=useContext(StoreContext)!;
     return(
            <div className="field">
                {value}:{""}
                <input
                type="text"
                value={store[value]}
                onChange={(e)=>setStore({...store,[value]:e.target.value})}
            />
            </div>
     )
}

const Display=({value}:{value: "first" | "last"})=>{
    //use the store context
    const[store]=useContext(StoreContext)!;
     return(
            <div className="field">
                {value}:{store[value]}
            </div>
     )
}

const FormContainer=memo(()=>{
     return(
            <div className="container">
                <h5>Form Container</h5>
                <TextInput value="first" />
                <TextInput value="last" />
            </div>
     )
})


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

const UseContextWState = () => {
    const store= useState({
        first:"",
        last:""
    });

    //The providers is getting a value either null or the store with the correct type
return (
    <StoreContext.Provider value={store}>
    <div className='container'>
        <h1>UseContext</h1>
        <ContentContainer />
    </div>
    </StoreContext.Provider>
)


}
export default UseContextWState;