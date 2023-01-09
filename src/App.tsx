import React from 'react';
import UseContextWState from './UseContextWState';
import FastContext from './Fast-Context';
import './App.css';


//Conventional props
//create a heading component
// const Heading=({label} :{label:string})=> {
//   return <h1>{label}</h1>
// }
const HeadingWithContent=({title,children} :{title:string,children:React.ReactNode})=> {

    return (
        <div>
        <h1>{title}</h1>
        {children}
        </div>
    )
}

function Content(props: { label: string, children: React.ReactNode }){
    return <div>
        <h2>{props.label}</h2>
        {props.children}
    </div>;
}
//default props
const defaultContainProps={
    heading :  3333
}

//create container that will hold the heading component and children
const Container=({heading,children}:{children:React.ReactNode} & typeof defaultContainProps)=>{
    return <div className="container">
        <h2>{heading}</h2>
        {children}
    </div>
}
Container.defaultProps=defaultContainProps;

//Utilizing useState

//functional props
const TextWithNumber=({addFunc}:{addFunc:(number:number)=>React.ReactNode})=>{
    const [state,setState]=React.useState<number | null>(1);
    return <div>
        <button onClick={()=>setState(state?state+1:null)}>Increment</button>
        {addFunc(state?state:0)}
    </div>
}
const TextWithWords=({
                         addFunc,
                            header,
                            footer
}:{
    addFunc:(words:string)=>React.ReactNode
    header?:(words:string)=>React.ReactNode
    footer:(words:string)=>React.ReactNode

})=>{
    const [state,setState]=React.useState<string | null>("");
    return <div>
        <h2>{header?header(state?state:''):''}</h2>
        <input type="text" onChange={(e)=>setState(e.target.value)}/>
        {addFunc(state?state:"")}
        <h2>{footer(state?state:'')}</h2>
    </div>
}

//List
function List<ListItem>({
                            items,
                            render
                        }:{
                            items:ListItem[],
                            render:(item:ListItem)=>React.ReactNode
                        }
)
{
    return <ul>
        {items.map((item,index)=>(
            <li key={index}>{render(item)}</li>
        ))}
    </ul>
}


//create a component that will hold the text name component
const TextName=({addFunc}:{addFunc:(name:string)=>React.ReactNode})=>{
    const [state,setState]=React.useState<string | null>("");
    return <div>
        <input type="text" onChange={(e)=>setState(e.target.value)}/>
        {addFunc(state?state:"")}
    </div>
}
//create a component that will hold the text password component
const TextPassword=({addFunc}:{addFunc:(password:string)=>React.ReactNode})=>{
    const [state,setState]=React.useState<string | null>("");
    return <div>
        <input type="password" onChange={(e)=>setState(e.target.value)}/>
        {addFunc(state?state:"")}
    </div>
}
//create a component that will display the name
const DisplayText=({text}:{text:string})=>{
    return <div>
        <h2>{text}</h2>
    </div>
}


function App() {
  return (
      <div>
          {/*<HeadingWithContent title='Heading with Content' children={<Content label={'Child Label'}>Child text</Content>}></HeadingWithContent>*/}
          {/*{//<Container heading={3}*/}
          {/*    //         children={<Content label={'Child Content Component'}>Child text data</Content>}></Container>*/}
          {/*}*/}

          {/*<List items={["bishop","suzy","jack","smith"]} render={(item)=><div>{item.toUpperCase()}</div>}></List>*/}

          {/*  <TextWithNumber addFunc={(number:number)=><div>{number}</div>}></TextWithNumber>*/}
          {/*  <TextWithWords*/}
          {/*      //header={(words:string)=><h2>Header + {words}</h2>}*/}
          {/*                 addFunc={(words:string)=><div>{words}</div>}*/}
          {/*                  footer={(words:string)=><h4>Footer + {words}</h4>}></TextWithWords>*/}
          <UseContextWState/>
    <TextName addFunc={(name:string)=><DisplayText text={name}></DisplayText>}></TextName>
      <FastContext/>
      </div>
  );
}

export default App;
