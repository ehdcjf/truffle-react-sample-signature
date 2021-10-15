import React, { useEffect, useState,useReducer } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import axios from "axios"
import "./App.css";

const reducer = (state,action) => {
  switch(action.type){
    case "INIT":
      const {web3,Instance,account} = action;
      return{
        ...state,
        web3,
        Instance,
        account
      }
    default:
      break;
  }
}


const INIT_ACTION = (web3,Instance,account)=>{
  return { 
    type:'INIT',
    web3,
    Instance,
    account
  }
}






const App = () => {
  const initialstate = {
    web3:null,
    Instance:null,
    account:null,
  }


  const [value,setValue] = useState(0);
  const [storage,setStorage] = useState(0); 
  const [loadding,setLoadding] = useState(false);
  const [state,dispatch] = useReducer(reducer,initialstate);

  const handleResult = (log,web3) => { 
    const params = [
      {type:'string', name:'message'},
      {type:'uint256', name:'newVal'}
    ];
    const returnValues = web3.eth.abi.decodeLog(params,log.data);
    console.log(returnValues);
      setStorage(returnValues.value);
      setLoadding(false); 

  }


  //직접서명
  const send = async () => {
    const {account,Instance} = state; 
    if(value>0){
      setLoadding(true);
      try{
        await Instance.set(value,{from:account}); 
      }catch(e){
        alert('궁금해서 잠이 안 와~ 그때 왜 그랬어? 구차해도 묻고 싶어~ 그 때 난 뭐였어~~ 나나나나나나나나~~ 나-만 애.탄-거니 나나나나나나나 난 진-심.인데 넌. 그랬~구나 그랬어~~. 좋았는데. 넌. 아니었나봐~~ 그랬구나 그때 넌~ 그런 줄~ 모르고~ 나혼자~~~~')
      }
    }
  }

  //서버를 거치고 서명
  const sendAPI =async() => {
    const {account,web3} = state; 
    if(value>0){
      setLoadding(true);
      const result = await axios.post('http://localhost:3003/rpc/set',{ from:account, val:value });
      if(result.data !== undefined && result.data.rawTx !== undefined && result.data.success===true){
        try{
          await web3.eth.sendTransaction(result.data.rawTx)
        }catch(e){
          alert('궁금해서 잠이 안 와~ 그때 왜 그랬어? 구차해도 묻고 싶어~ 그 때 난 뭐였어~~ 나나나나나나나나~~ 나-만 애.탄-거니 나나나나나나나 난 진-심.인데 넌. 그랬~구나 그랬어~~. 좋았는데. 넌. 아니었나봐~~ 그랬구나 그때 넌~ 그런 줄~ 모르고~ 나혼자~~~~')
        }
      }
    }
  }

  // 서버에서 서명
  const sendTx = async() => {
    const {account} = state

    if (value > 0){
      setLoadding(true)
      await axios.post('http://localhost:3003/rpc/setTx',{from:account,val:value})
    }
  }

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val); 
  }


  const init =  async () => {
    const contract = require('@truffle/contract');
    const web3 = await getWeb3();
    const [account] = await web3.eth.getAccounts(); 
    // const networkId = await web3.eth.net.getId();  // 네트워크 ID 가져오기. 

    const SimpleStorage = contract(SimpleStorageContract);
    SimpleStorage.setProvider(web3.currentProvider);

    const Instance = await SimpleStorage.deployed(); 
    dispatch(INIT_ACTION(web3,Instance,account));

    web3.eth.subscribe("logs",{from:account})
    .on("data",log=>handleResult(log,web3))
    .on("error",err=>console.log(err))

  }

  useEffect(()=>{
    init();
  },[])


  



  return (
    <div>
      <input type="text" value={value} onChange={handleChange}/>
      <div>
      <button onClick={send}>일반 서명</button>
      <button onClick={sendAPI}>서버 거치고 서명</button>
      <button onClick={sendTx}>서버에서 서명</button>
      </div>
    <div>
        {loadding ?  'Loadding' : storage}
    </div>
    </div>
  )
}

export default App;
