const Web3 = require('web3');
const { getCurrentGasPrices } = require('../services/common')
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545/')
const web3 = new Web3(provider)

const AINCTokenCrowdsale = require('../abis/AINCTokenCrowdsale');
const icoContractAddress = '0x27d539B6D59f4D8dD993961a28a6e32b81b028d1'


exports.info = async (req, res) => {

    const ICOContract = await new web3.eth.Contract(AINCTokenCrowdsale.abi, icoContractAddress)

    const cap = await ICOContract.methods.cap().call()
    const capReached = await ICOContract.methods.capReached().call()
    const weiRaised = await ICOContract.methods.weiRaised().call()
    const rate = await ICOContract.methods.rate().call()
    // const investorHardCap = await ICOContract.methods.investorHardCap().call()
    // const investorMinCap = await ICOContract.methods.investorMinCap().call()
    const stage = await ICOContract.methods.stage().call()
    // const owner = await ICOContract.methods.owner().call()
    // const tokenSale = await ICOContract.methods.tokenSalePercentage().call()

    res.json({
        'crowdsaleCap': cap,
        'crowdsaleCapReached': capReached,
        'weiRaised': weiRaised,
        'crowdsaleRate': rate,
        // 'crowdsaleInvestorHardCap': investorHardCap,
        // 'crowdsaleInvestorMinCap': investorMinCap,
        'crowdaleStage': stage
        // 'crowdsaleOwner': owner
        // 'crowdaleTokenSale': tokenSale
    })

}

exports.buyTokens = async (req, res) => {

    const ICOContract = await new web3.eth.Contract(AINCTokenCrowdsale.abi, icoContractAddress)

    const fromAddress = req.body.from
    const valueInEther = req.body.valueEth
    let gasPrices = await getCurrentGasPrices();

    try {
        console.log(valueInEther, fromAddress)
        result = await ICOContract.methods.buyTokens(fromAddress).send({
            from: fromAddress,
            value: web3.utils.toHex(web3.utils.toWei(valueInEther, 'ether')),
            gas: gasPrices.high
        })
        if (result) {
            res.status(200).send({ message: 'Buy Successfull!!', data: result })
        } else {
            res.status(400).send({ message: 'Buy failed!!' })
        }

    } catch (error) {
        res.send(error.message)
    }

}

exports.changeRound = async (req, res) => {

    const fromAddress = req.body.from
    const ICOContract = await new web3.eth.Contract(AINCTokenCrowdsale.abi, icoContractAddress)
    let gasPrices = await getCurrentGasPrices();

    try {
        result = await ICOContract.methods.changeRound().send({
            from: fromAddress,
            gas: gasPrices.high
        })
        if (result) {
            res.status(200).send({ message: 'Change Round Successfull!!', data: result })
        } else {
            res.status(400).send({ message: 'Change Round Failedl!!', data: result })
        }

    } catch (error) {
        res.send(error.message)
    }

}

exports.renounceOwnership = async (req, res) => {

    const ICOContract = await new web3.eth.Contract(AINCTokenCrowdsale.abi, icoContractAddress)

    const fromAddress = req.body.from
    let gasPrices = await getCurrentGasPrices();

    try {
        result = await ICOContract.methods.renounceOwnership().send({
            from: fromAddress,
            gas: gasPrices.high
        })
        if (result) {
            res.status(200).send({ message: 'Renounce Ownership Successfull!!', data: result })
        } else {
            res.status(400).send({ message: 'Renounce Ownership Failedl!!', data: result })
        }

    } catch (error) {
        res.send(error.message)
    }

}

exports.transferOwnership = async (req, res) => {

    const ICOContract = await new web3.eth.Contract(AINCTokenCrowdsale.abi, icoContractAddress)

    const fromAddress = req.body.from
    const newOwner = req.body.newOwner
    let gasPrices = await getCurrentGasPrices();

    try {
        result = await ICOContract.methods.transferOwnership(newOwner).send({
            from: fromAddress,
            gas: gasPrices.high
        })
        if (result) {
            res.status(200).send({ message: 'Transfer Ownership Successfull!!', data: result })
        } else {
            res.status(400).send({ message: 'Transfer Ownership Failedl!!', data: result })
        }

    } catch (error) {
        res.send(error.message)
    }

}