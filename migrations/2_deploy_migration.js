const AINCToken = artifacts.require("./AINCToken");

module.exports = function(deployer) {
    const _name = "AnaisINC";
    const _symbol = "AINC";
    const _decimals = 18;
    // const _ICO_SUPP = 5000000;
    // const _TEAM_SUPP = 1500000;
    // const _TEAM = "0xb51f73c1c58E02073c04b52D51628FF4a685afe1";
    deployer.deploy(AINCToken, _name, _symbol, _decimals);
};