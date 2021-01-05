// Returns the time of the last mined block in seconds
module.exports = {
 latestTime: async () => {
  return web3.eth.getBlock('latest').timestamp;
},
}