const Web3 = require('web3');
const { getCurrentGasPrices } = require('../services/common')
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545/')
const web3 = new Web3(provider)

const AINCToken = require('../abis/AINCToken');
const tokenContractAddress = '0x458Af3957D15f7B4630BbE49E23342346226f5ef'

exports.info = async (req, res) => {

    const TokenContract = await new web3.eth.Contract(AINCToken.abi, tokenContractAddress)

    const name = await TokenContract.methods.name().call()
    const symbol = await TokenContract.methods.symbol().call()
    const totalSupply = await TokenContract.methods.totalSupply().call()

    res.json({
        'Token Name': name,
        'Token Symbol': symbol,
        'Total Supply': web3.utils.fromWei(totalSupply, 'ether') + ' ETH'
    })

}

exports.approve = async (req, res) => {

    const fromAddress = req.body.from
    const spender = req.body.spender
    const value = req.body.value
    let gasPrices = await getCurrentGasPrices();
    const TokenContract = await new web3.eth.Contract(AINCToken.abi, tokenContractAddress)

    try {
        result = await TokenContract.methods.approve(spender, value).send({
            from: fromAddress,
            gas: gasPrices.high
        })
        if (result) {
            res.status(200).send({ message: 'Approved for Crowdsale!!', data: result })
        } else {
            res.status(400).send({ message: 'Approval failed!!' })
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.allowance = async (req, res) => {

    const fromAddress = req.body.from
    const spender = req.body.spender
    const TokenContract = await new web3.eth.Contract(AINCToken.abi, tokenContractAddress)
    let gasPrices = await getCurrentGasPrices();

    try {
        result = await TokenContract.methods.allowance(fromAddress, spender).send({
            from: fromAddress,
            gas: gasPrices.high
        })
        if (result) {
            res.status(200).send({ message: 'Allowance was Allocated for Crowdsale!!', data: result })
        } else {
            res.status(400).send({ message: 'Allowance failed!!' })
        }


    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.decreaseAllowance = async (req, res) => {

    const fromAddress = req.body.from
    const spender = req.body.spender
    const subtractedValue = req.body.subtractedValue
    const TokenContract = await new web3.eth.Contract(AINCToken.abi, tokenContractAddress)
    let gasPrices = await getCurrentGasPrices();

    try {
        result = await TokenContract.methods.decreaseAllowance(spender, subtractedValue).send({
            from: fromAddress,
            gas: gasPrices.high
        })
        if (result) {
            res.status(200).send({ message: 'Allowance Decreased!!', data: result })
        } else {
            res.status(400).send({ message: 'Allowance Decrease failed!!' })
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.increaseAllowance = async (req, res) => {

    const fromAddress = req.body.from
    const spender = req.body.spender
    const addedValue = req.body.addedValue
    const TokenContract = await new web3.eth.Contract(AINCToken.abi, tokenContractAddress)
    let gasPrices = await getCurrentGasPrices();

    try {
        result = await TokenContract.methods.increaseAllowance(spender, addedValue).send({
            from: fromAddress,
            gas: gasPrices.high
        })
        if (result) {
            res.status(200).send({ message: 'Allowance Increased!!', data: result })
        } else {
            res.status(400).send({ message: 'Allowance Increase failed!!' })
        }

    } catch (error) {
        res.status(400).send(error.message)
    }

}

exports.balance = async (req, res) => {

    const address = req.body.address
    const TokenContract = await new web3.eth.Contract(AINCToken.abi, tokenContractAddress)
    let gasPrices = await getCurrentGasPrices();

    try {
        result = await TokenContract.methods.balanceOf(address).call({
            from: address,
            gas: gasPrices.high
        })
        if (result) {
            res.status(200).send({ message: 'Balance Fetched!!', data: result })
        } else {
            res.status(400).send({ message: 'Balance Fetch failed!!' })
        }

    } catch (error) {
        res.status(400).send(error.message)
    }

}

exports.transfer = async (req, res) => {

    const fromAddress = req.body.from
    const toAddress = req.body.to
    const amount = web3.utils.toHex(web3.utils.toWei(req.body.amount, 'ether'))
    const TokenContract = await new web3.eth.Contract(AINCToken.abi, tokenContractAddress)
    let gasPrices = await getCurrentGasPrices();

    try {
        result = await TokenContract.methods.transfer(toAddress, amount).send({
            from: fromAddress,
            gas: gasPrices.high
        })
        if (result) {
            res.status(200).send({ message: 'Transfer Success!!', data: result })
        } else {
            res.status(400).send({ message: 'Transfer failed!!' })
        }

    } catch (error) {
        res.status(400).send(error.message)
    }

}

exports.transferFrom = async (req, res) => {

    const fromAddress = req.body.from
    const toAddress = req.body.to
    const amount = web3.utils.toHex(web3.utils.toWei(req.body.amount, 'ether'))
    const TokenContract = await new web3.eth.Contract(AINCToken.abi, tokenContractAddress)
    let gasPrices = await getCurrentGasPrices();

    try {
        result = await TokenContract.methods.transferFrom(fromAddress, toAddress, amount).send({
            from: fromAddress,
            gas: gasPrices.high
        })
        if (result) {
            res.status(200).send({ message: 'Transfer Success!!', data: result })
        } else {
            res.status(400).send({ message: 'Transfer failed!!' })
        }

    } catch (error) {
        res.status(400).send(error.message)
    }

}