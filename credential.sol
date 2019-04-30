// This specifies the Solidity compiler version that generates 
// opcodes and ABI to be stored on the blockchain
pragma solidity ^0.4.22;

contract CredentialFactory {
    address [] public issuedCredentials;
    
    // emit event when credential has been created
    event CredentialCreated(address credentialAddress);
    
    // function to issue new credentials 
    function createCredential(string _id, 
    string _recipientName, 
    string _courseName, 
    string _courseDescription, 
    string _issuerName, 
    string _instructorName, 
    uint _issuedOn) public {
        // create instance of new credential 
        address newCredential = new Credential(msg.sender, _id, _recipientName, _courseName, _courseDescription, _issuerName, _instructorName, _issuedOn);
        
        emit CredentialCreated(newCredential);
        
        // save the address of the credential to find it later from the client
        issuedCredentials.push(newCredential);
    }
    
    function getIssuedCredentials() public view returns (address[]) {
        return issuedCredentials;
    }
    
}

contract Credential {
    // owner address, usually the recipient of the credential
    address public owner;
    
    // credential details
    string public id;
    string public recipientName;
    string public courseName;
    string public courseDescription;
    string public issuerName;
    string public instructorName;
    uint public issuedOn;
    
    constructor(address _owner, 
    string _id, 
    string _recipientName, 
    string _courseName, 
    string _courseDescription, 
    string _issuerName, 
    string _instructorName, 
    uint _issuedOn) public {
        // instantiate your credential here
        owner = _owner;
        id = _id;
        issuerName = _issuerName;
        recipientName = _recipientName;
        courseName = _courseName;
        courseDescription = _courseDescription;
        issuerName = _issuerName;
        instructorName = _instructorName;
        issuedOn = _issuedOn;
    }
    
    // reusable modifier function for ensuring only owner can perform action
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    // congratulate is a payable function that allows people to celebrate the recipient 
    // getting this credential by sending Ethers to the marriage contract
    function congratulate() public payable {
        require(msg.value > .0001 ether);
    }
 
    // credential owner can withdraw amount to their owner
    function collect() external onlyOwner {
        owner.transfer(address(this).balance);
    }
    
    // allow only owners the check the balance of the credential
    function getBalance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }
    
}
