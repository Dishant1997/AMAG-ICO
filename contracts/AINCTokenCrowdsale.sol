pragma solidity >=0.5.0;

// import "./Token_Generation.sol";
import "@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/crowdsale/emission/AllowanceCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/validation/CappedCrowdsale.sol";

contract AINCTokenCrowdsale is Ownable, Crowdsale, AllowanceCrowdsale, CappedCrowdsale {

    uint256 public investorMinCap = 2000000000000000; // 0.002 ether
    uint256 public investorHardCap = 50000000000000000000; // 50 ether
    mapping(address => uint256) public contributions;
    //mapping(address => uint) public contributions;
    //uint _softcap;
    //uint _hardcap;
    uint _endTime;
    uint _startTime;
    uint ourRate;
    // bool mint = false;
    //address owner;
    // IERC20 _token;

    // uint ourGoal;
    // Token Distribution
    uint256 public tokenSalePercentage   = 70;
    uint256 public foundersPercentage    = 10;
    uint256 public foundationPercentage  = 10;
    uint256 public partnersPercentage    = 10;

    // Token reserve funds
    address public foundersFund;
    address public foundationFund;
    address public partnersFund;

    // Token time lock
    uint256 public releaseTime;
    address public foundersTimelock;
    address public foundationTimelock;
    address public partnersTimelock;

    enum CrowdsaleStage { PreICO, ICO }
    CrowdsaleStage public stage = CrowdsaleStage.PreICO;

    //event SaleEnded(address a);

    constructor(
        uint256 rate, 
        address payable wallet, 
        IERC20 token, 
        address tokenOwner, 
        uint softcap,  
        uint hardcap, 
        uint startTime, 
        uint endTime
        )

        Crowdsale(rate, wallet, token)
        // TokenTimelock(token, others, now + 52*1 weeks)
        AllowanceCrowdsale(tokenOwner)
        CappedCrowdsale(hardcap)
        // RefundableCrowdsale(softcap)
        // TimedCrowdsale(startTime, endTime) 
    public{
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
    /**
    * @dev Returns the amount contributed so far by a sepecific user.
    * @param _beneficiary Address of contributor
    * @return User contribution so far
    */
    function getUserContribution(address _beneficiary)
        public view returns (uint256)
    {
        return contributions[_beneficiary];
    }

    modifier beforeEnd(){
        require(now <= _endTime, "CrowdSale has Ended");
        _;
    }

    modifier afterStart(){
        require(now >= _startTime, "CrowdSale has not Started");
        _;
    }


    function _preValidatePurchase(address payable _beneficiary, uint256 _weiAmount) internal {
        // require(block.timestamp >= _lock);
        super._preValidatePurchase(_beneficiary, _weiAmount);
        uint256 _existingContribution = contributions[_beneficiary];
        uint256 _newContribution = _existingContribution.add(_weiAmount);
        require(_newContribution >= investorMinCap && _newContribution <= investorHardCap);
        contributions[_beneficiary] = _newContribution;
    }


    function changeRound() public onlyOwner() beforeEnd() afterStart(){
        stage = CrowdsaleStage(int(stage) + 1);
        applyBonus();
    }


    function applyBonus() internal onlyOwner() beforeEnd(){

        if(stage == CrowdsaleStage.PreICO){
            ourRate = ourRate*2;
        }
        else if (stage == CrowdsaleStage.ICO) {
            ourRate = ourRate/2;
        }
        else{
            ourRate = ourRate/4;
        }
    }

}






