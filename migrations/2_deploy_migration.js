const AINCToken = artifacts.require("./AINCToken");
const AINCTokenCrowdsale = artifacts.require("./AINCTokenCrowdsale");

module.exports = function (deployer) {
    const _name = "AnaisINC";
    const _symbol = "AINC";
    const _decimals = 18;
    const _ICO_SUPP = "5000000000000000000000000";
    const _TEAM_SUPP = "150000000000000000000000";
    const _TEAM = "0x1bed19cfb5c64920ccc3655629c24da33334730a";
    const rate = 1600;
    const wallet = "0x1bed19cfb5c64920ccc3655629c24da33334730a";
    const tokenOwner = "0x0bbddc673878e0677f978bf76220e1552d43e9d9";
    const softcap = "1000000000000000000";
    const hardcap = "2000000000000000000000";
    const startTime = "1608875512";
    const endTime = "1708875502";
    deployer.deploy(AINCToken, _name, _symbol, _decimals, _ICO_SUPP, _TEAM_SUPP, _TEAM).then(() => {
        return deployer.deploy(AINCTokenCrowdsale, rate, wallet, AINCToken.address, tokenOwner, softcap, hardcap, startTime, endTime);
    })
};