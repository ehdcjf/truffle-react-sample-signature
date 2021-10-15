const { GANACHE } = require('./eth.config');
const Web3 = require('web3');
const web3 = new Web3(GANACHE);
const { abi } = require('../../../client/src/contracts/SimpleStorage.json');
const address = require('../../../client/src/contracts/SimpleStorage.json').networks["5777"].address
const ethTx = require('ethereumjs-tx').Transaction;


const set = async (req, res) => {
  const { from, val } = req.body;

  const contract = await new web3.eth.Contract(abi, address);
  const data = await contract.methods.set(val).encodeABI();

  let txObject = {};

  txObject["from"] = from;
  txObject["to"] = address;
  txObject["data"] = data;
  txObject["gasLimit"] = web3.utils.toHex(3000000);
  txObject["gasPrice"] = web3.utils.toHex(web3.utils.toWei('20', 'gwei'));

  res.json({
    success: true,
    rawTx: txObject
  })
}


const setTx = async (req, res) => {
  const { from, val } = req.body;
  const privateKey = Buffer.from("2bd1c1abfe76af8aa165d8a1d21ea02fa64e8e91b9051a63c5100463b3f45a62", "hex");
  try{
    const contract = await new web3.eth.Contract(abi, address)
    const data = await contract.methods.set(val).encodeABI();
    const txCount = await web3.eth.getTransactionCount(from) // txCount..? 
  
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      from,
      to: address,
      data,
      gasLimit: web3.utils.toHex(3000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei'))
    }
  
    const tx = new ethTx(txObject)
    tx.sign(privateKey)
    const serializedTx = tx.serialize()
    const txhash = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  
  
    res.json({
      success: true,
      txhash
    })
  }catch(error){
    res.json({
      success:false,
      msg:error,
    })
  }
  
}


module.exports = {
  set,
  setTx,
}
