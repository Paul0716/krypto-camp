/**
stack overflow https://ethereum.stackexchange.com/questions/760/how-is-the-address-of-an-ethereum-contract-computed
node version: v9.10.0
module versions:
rlp@2.0.0
keccak@1.4.0
**/

const rlp = require("rlp");
const keccak = require("keccak");

var nonce = 0x00; // 隨機碼
var sender = "0x6ac7ea33f8831ea9dcc53393aaa88b25a785dbf0"; // 錢包位址

var input_arr = [sender, nonce];
var rlp_encoded = rlp.encode(input_arr);

var contract_address_long = keccak('keccak256')
  .update(Buffer.from(rlp_encoded))
  .digest('hex')

var contract_address = contract_address_long.substring(24);
console.log("contract_address: 0x" + contract_address);