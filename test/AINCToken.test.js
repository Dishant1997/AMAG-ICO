const BigNumber = web3.BigNumber;

const AINCToken = artifacts.require('AINCToken');

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('AINCToken', accounts => {
  const _name = 'AnaisINC';
  const _symbol = 'AINC';
  const _decimals = 18;
  // const _ICO_SUPP = 5000000;
  // const _Team_SUPP = 2000000;
  // const _Team="0xb51f73c1c58E02073c04b52D51628FF4a685afe1";
  beforeEach(async function () {
    this.token = await AINCToken.new(_name, _symbol, _decimals);
  });

  describe('token attributes', function() {
    it('has the correct name', async function() {
      const name = await this.token.name();
      name.should.equal(_name);
    });

    it('has the correct symbol', async function() {
      const symbol = await this.token.symbol();
      symbol.should.equal(_symbol);
    });

    it('has the correct decimals', async function() {
      const decimals = await this.token.decimals();
      decimals.should.be.bignumber.equal(_decimals);
    });
  });
});