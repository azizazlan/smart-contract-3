// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MelakaSubsidy is ERC1155, AccessControl, ERC1155Supply {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint256 public constant BAG_070KG_RICE = 0;
    uint256 public constant BAG_001KG_WHEATFLOUR = 1;
    uint256 public constant BAG_001KG_OIL = 2;
    uint256 public constant BAG_001KG_DIESEL = 3;
    uint256 public constant BAG_010KG_FERTILIZER = 4;

    mapping(uint256 => bool) public whitelistedNationalIds;

    // Define an allowance mapping for each address
    mapping(address => uint256) public allowances;

    // Event to log token transfers with date and time
    event TransferSubsidyEvent(
        address indexed from,
        address indexed to,
        uint256 indexed id,
        uint256 value,
        uint256 timestamp
    );

    event WhitelistingEvent(uint256 indexed id, bool status, uint256 timestamp);

    constructor() ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        // _mint(msg.sender, BAG_070KG_RICE, 10 ** 27, "");
        // _mint(msg.sender, BAG_001KG_WHEATFLOUR, 10 ** 27, "");
    }

    // Function to approve an address to spend tokens
    function approve(address spender, uint256 amount) external {
        require(hasRole(MINTER_ROLE, msg.sender), "Must have MINTER_ROLE");
        allowances[spender] = amount;
    }

    function transferTokens(
        address from,
        address to,
        uint256 id,
        uint256 amount
    ) external onlyRole(MINTER_ROLE) {
        // Check if the sender's allowance is sufficient
        require(allowances[from] >= amount, "Allowance exceeded");

        // Perform the transfer
        _safeTransferFrom(from, to, id, amount, "");

        // Update the allowance
        allowances[from] -= amount;

        emit TransferSubsidyEvent(from, to, id, amount, block.timestamp);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory nric,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) {
        for (uint256 i = 0; i < ids.length; i++) {
            require(whitelistedNationalIds[nric[i]], "NRIC not whitelisted"); // Check if each ID is whitelisted
        }
        _mintBatch(to, ids, amounts, data);
    }

    // Function to set the whitelist status of an ID
    function setWhitelisted(
        uint256 id,
        bool status
    ) public onlyRole(MINTER_ROLE) {
        whitelistedNationalIds[id] = status;
        emit WhitelistingEvent(id, status, block.timestamp);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
