pragma solidity >=0.5.0;

// import "./Token_Generation.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/TokenTimelock.sol";
import "@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/emission/AllowanceCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/validation/WhitelistCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/distribution/RefundableCrowdsale.sol";

contract owned {
    constructor() public { owner = msg.sender; }
    address payable owner;

    // This contract only defines a modifier but does not use
    // it: it will be used in derived contracts.
    // The function body is inserted where the special symbol
    // `_;` in the definition of a modifier appears.
    // This means that if the owner calls this function, the
    // function is executed and otherwise, an exception is
    // thrown.
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }
}

contract AINCTokenCrowdsale is owned, Crowdsale, MintedCrowdsale, CappedCrowdsale, TimedCrowdsale, WhitelistCrowdsale, RefundableCrowdsale, AllowanceCrowdsale {

    //mapping(address => uint) public contributions;
    //uint _softcap;
    //uint _hardcap;
    uint _endTime;
    uint _startTime;
    uint ourRate;
    uint _lock = now+30*1 days;
    // bool mint = false;
    //address owner;
    // IERC20 _token;

    // uint ourGoal;

    enum CrowdsaleStage { PreICO, ICO, Round1, Round2, Round3, SaleEnd }
    CrowdsaleStage public stage = CrowdsaleStage.PreICO;

    //event SaleEnded(address a);

    constructor(uint256 rate, address payable wallet, IERC20 token, address tokenOwner, uint softcap,  uint hardcap, uint startTime, uint endTime)

    Crowdsale(rate, wallet, token)
    // TokenTimelock(token, others, now + 52*1 weeks)
    AllowanceCrowdsale(tokenOwner)
    CappedCrowdsale(hardcap)
    RefundableCrowdsale(softcap)
    TimedCrowdsale(startTime, endTime) public{

        //address deployed_address = MyToken.getAddress();
        //require(address(msg.sender) == address(deployed_address), "Owner of Token can create ICO");

        require(rate > 0);
        require(wallet != address(0));
        require(address(token) != address(0));
        //owner = msg.sender;
        // _token = token;
        ourRate = rate;
        //_softcap = softcap;
        //_hardcap = hardcap;
        _startTime = startTime;
        _endTime = endTime;
        applyBonus();
    }

    // modifier isOwner(){

    //     require(msg.sender == owner, "Only owner of the contract can call this");
    //     _;

    // }

    modifier beforeEnd(){

        require(now <= _endTime, "CrowdSale has Ended");
        _;

    }

    modifier afterStart(){

        require(now >= _startTime, "CrowdSale has not Started");
        _;

    }


    function _preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal view{

        require(block.timestamp >= _lock);
        super._preValidatePurchase(_beneficiary, _weiAmount);

    }


    function changeRound() public onlyOwner() beforeEnd() afterStart(){

        stage = CrowdsaleStage(int(stage) + 1);
        applyBonus();

    }


    function applyBonus() internal onlyOwner() beforeEnd(){


        if(stage == CrowdsaleStage.PreICO){
            ourRate = ourRate*2;

        }
        else if (stage == CrowdsaleStage.ICO || stage == CrowdsaleStage.Round1 || stage == CrowdsaleStage.Round2) {
            ourRate = ourRate/2;
        }

        else{
            ourRate = ourRate/4;
        }

    }


}











// contract MyICO is Ownable, Crowdsale, CappedCrowdsale, TimedCrowdsale, RefundablePostDeliveryCrowdsale, AllowanceCrowdsale{

//     //mapping(address => uint) public contributions;
//     //uint _softcap;
//     //uint _hardcap;
//     uint _endTime;
//     uint _startTime;
//     uint ourRate;
//     uint _lock = now+30*1 days;
//     // bool mint = false;
//     //address owner;
//     // IERC20 _token;

//     // uint ourGoal;

//     enum CrowdsaleStage { PreICO, ICO, Round1, Round2, Round3, SaleEnd }
//     CrowdsaleStage public stage = CrowdsaleStage.PreICO;

//     //event SaleEnded(address a);

//     constructor(uint rate, address payable wallet, IERC20 token, address tokenOwner, uint softcap,  uint hardcap, uint startTime, uint endTime)

//     Crowdsale(rate, wallet, token)
//     // TokenTimelock(token, others, now + 52*1 weeks)
//     AllowanceCrowdsale(tokenOwner)
//     CappedCrowdsale(hardcap)
//     RefundableCrowdsale(softcap)
//     TimedCrowdsale(startTime, endTime) public{

//         //address deployed_address = AINCToken.getAddress();
//         //require(address(msg.sender) == address(deployed_address), "Owner of Token can create ICO");

//         require(rate > 0);
//         require(wallet != address(0));
//         require(address(token) != address(0));
//         //owner = msg.sender;
//         // _token = token;
//         ourRate = rate;
//         //_softcap = softcap;
//         //_hardcap = hardcap;
//         _startTime = startTime;
//         _endTime = endTime;
//         applyBonus();
//     }


//     // modifier isOwner(){

//     //     require(msg.sender == owner, "Only owner of the contract can call this");
//     //     _;

//     // }

//     modifier beforeEnd(){

//         require(now <= _endTime, "CrowdSale has Ended");
//         _;

//     }

//     modifier afterStart(){

//         require(now >= _startTime, "CrowdSale has not Started");
//         _;

//     }


//     function _preValidatePurchase(address _beneficiary, uint _weiAmount) internal {

//         require(block.timestamp >= _lock);
//         super._preValidatePurchase(_beneficiary, _weiAmount);

//     }


//     function changeRound() public onlyOwner() beforeEnd() afterStart(){

//         stage = CrowdsaleStage(int(stage) + 1);
//         applyBonus();

//     }


//     function applyBonus() internal onlyOwner() beforeEnd(){


//         if(stage == CrowdsaleStage.PreICO){
//             ourRate = ourRate*2;

//         }
//         else if (stage == CrowdsaleStage.ICO || stage == CrowdsaleStage.Round1 || stage == CrowdsaleStage.Round2) {
//             ourRate = ourRate/2;
//         }

//         else{
//             ourRate = ourRate/4;
//         }

//     }


// }
