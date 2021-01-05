const BigNumber = web3.BigNumber;
// const ether = require('./helpers/ether');
// const EVMRevert = require('./helpers/EVMRevert');
const duration = require('./helpers/increaseTime');
const latestTime = require('./helpers/latestTime');
const AINCToken = artifacts.require('AINCToken');
const AINCTokenCrowdsale = artifacts.require('AINCTokenCrowdsale');

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('AINCTokenCrowdsale', function([_, wallet, investor1, investor2]){


    // before(async function() {
    // // Transfer extra ether to investor1's account for testing
    // await web3.eth.sendTransaction({ from: _, to: investor1, value: ether(25) })
    // });

    beforeEach(async function () {
    // Token config
    this.name = "AnaisINC";
    this.symbol = "AINC";
    this.decimals = 18;
    this._ICO_SUPP = 5000000;
    this._Team_SUPP = 2000000;
    this._Team = "0xb51f73c1c58E02073c04b52D51628FF4a685afe1";
    // Deploy Token
    this.token = await AINCToken.new(
        this.name,
        this.symbol,
        this.decimals,
        this._ICO_SUPP,
        this._Team_SUPP,
        this._Team
    );

    // Crowdsale config
    this.rate = 1000;
    this.wallet = wallet;
    this.tokenOwner = "0x910D0a3559B10d405c3Fc127332bC6aBEE8C6e37";
    this.softCap = web3.utils.toWei("100", 'ether');
    this.hardCap = web3.utils.toWei("120", 'ether');
    this.openingTime = Date.now();
    this.closingTime = this.openingTime + duration.weeks(1);
    // this.cap = ether(100);
    // this.openingTime = latestTime() + duration.weeks(1);
    // this.closingTime = this.openingTime + duration.weeks(1);
    // this.goal = ether(50);
    // this.foundersFund = foundersFund;
    // this.foundationFund = foundationFund;
    // this.partnersFund = partnersFund;
    // this.releaseTime  = this.closingTime + duration.years(1);

    // // Investor caps
    // this.investorMinCap = ether(0.002);
    // this.inestorHardCap = ether(50);

    // // ICO Stages
    // this.preIcoStage = 0;
    // this.preIcoRate = 500;
    // this.icoStage = 1;
    // this.icoRate = 250;

    // // Token Distribution
    // this.tokenSalePercentage  = 70;
    // this.foundersPercentage   = 10;
    // this.foundationPercentage = 10;
    // this.partnersPercentage   = 10;

    this.crowdsale = await AINCTokenCrowdsale.new(
        this.rate,
        this.wallet,
        this.token.address,
        this.tokenOwner,
        this.softCap,
        this.hardCap,
        this.openingTime,
        this.closingTime
        // this.goal,
        // this.foundersFund,
        // this.foundationFund,
        // this.partnersFund,
        // this.releaseTime
        );

    // await this.token.addMinter(this.crowdsale.address);

    });
    describe('crowdsale', function() {
        it('tracks the rate', async function() {
          const rate = await this.crowdsale.rate();
          rate.should.equal(this.rate);
        });
    
        it('tracks the wallet', async function() {
          const wallet = await this.crowdsale.wallet();
          wallet.should.equal(this.wallet);
        });
    
        it('tracks the token', async function() {
          const token = await this.crowdsale.token();
          token.should.equal(this.token.address);
        });
      });

    // describe('accepting payments', function() {
    //   it('it should accept payments', async function() {
    //     const value = web3.utils.toWei("1", 'ether');
    //     await this.crowdsale.sendTransaction({value: value, from: investor1})
    //   });
    // });
});