const Web3 = require( 'web3');
const Tx = require('ethereumjs-tx');

const provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545')
const web3 = new Web3(provider)


// exports.sendEth = async (req, res) => {

//     sender = req.body.sender
//     receiver = req.body.receiver
//     value = req.body.valueEth

//     try {

//         await web3.eth.sendTransaction({

//             from: sender,
//             to: receiver,
//             value: web3.utils.toWei(value, 'ether')

//         });
//         // console.log(result)
//         res.status(200).send('Successfull!!')

//     } catch (error) {
//         res.send(error.message)
//     }


// }


exports.sendEthSigned = async (req, res) => {

    const sender = req.body.sender
    const receiver = req.body.receiver
    const value = req.body.valueEth
    const privateKey = Buffer.from(req.body.pk, 'hex')

    try {
        const nonce = await web3.eth.getTransactionCount(sender, 'pending')
        const txData = {
            nonce: nonce,
            to: receiver,
            value: web3.utils.numberToHex(web3.utils.toWei(value, 'ether')),
            gas: web3.utils.numberToHex('21000')
        }

        const tx = new Tx.Transaction(txData)
        tx.sign(privateKey)
        const serializedTx = tx.serialize()

        await web3.eth.sendSignedTransaction(serializedTx)
        res.send('Successfull!!')

    } catch (error) {
        res.status(500).send(error.message)

    }

}