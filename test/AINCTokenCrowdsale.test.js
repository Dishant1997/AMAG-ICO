const BigNumber = web3.BigNumber;

const AINCToken = artifacts.require('AINCToken');
const AINCTokenCrowdsale = artifacts.require('AINCTokenCrowdsale');

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('AINCTokenCrowdsale', function([_, wallet]){


    // before(async function() {
    // // Transfer extra ether to investor1's account for testing
    // await web3.eth.sendTransaction({ from: _, to: investor1, value: ether(25) })
    // });

    beforeEach(async function () {
    // Token config
    this.name = "AnaisINC";
    this.symbol = "AINC";
    this.decimals = 18;

    // Deploy Token
    this.token = await AINCToken.new(
        this.name,
        this.symbol,
        this.decimals
    );

    // Crowdsale config
    this.rate = 1000;
    this.wallet = wallet;
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
        this.token.address
        // this.cap,
        // this.openingTime,
        // this.closingTime,
        // this.goal,
        // this.foundersFund,
        // this.foundationFund,
        // this.partnersFund,
        // this.releaseTime
        );
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
});