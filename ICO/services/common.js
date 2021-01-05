const Web3 = require('web3');

const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545/')
const web3 = new Web3(provider)
const axios = require('axios');

module.exports = {
    getCurrentGasPrices: async () => {
        let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
        let prices = {
            low: response.data.safeLow,
            medium: response.data.average,
            high: response.data.fast * 1000
        }
        return prices;
    }
}