// SPDX-License-Identifier: MIT
// Author: Azlan bin Abdul Aziz
// Organization: Thuleen Enterprise
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./MelakaRice.sol";

contract MelakaResident is ERC721, ERC721Enumerable, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant GOVERNMENT_OFFICER_ROLE =
        keccak256("GOVERNMENT_OFFICER_ROLE");

    // Residential status
    mapping(address => bool) public residents;
    mapping(bytes => bool) public residentNrics;

    // Mapping to store whitelisted residents
    mapping(address => bool) public whitelistedResidents;
    mapping(bytes => bool) public whitelistedResidentNrics;

    // ERC20 contract address
    address public ftContractAddress;

    constructor(
        address _ftContractAddress
    ) ERC721("Melaka Resident Identifier", "MLKID") {
        ftContractAddress = _ftContractAddress;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNMENT_OFFICER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function safeMint(address to) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function awardResidentialStatus(
        address account,
        bytes memory nric
    ) external onlyRole(GOVERNMENT_OFFICER_ROLE) {
        require(!residents[account], "Address is already a resident");
        require(!residentNrics[nric], "NRIC is already used by a resident");

        residents[account] = true;
        residentNrics[nric] = true;
    }

    function revokeResidentialStatus(
        address account,
        bytes memory nric
    ) external onlyRole(GOVERNMENT_OFFICER_ROLE) {
        require(residents[account], "Address is not resident");
        require(residentNrics[nric], "NRIC not a resident");

        residents[account] = false;
        residentNrics[nric] = false;
    }

    function verifyResident(
        address resident,
        bytes memory residentNric
    ) public view returns (bool) {
        return residents[resident] && residentNrics[residentNric];
    }

    // Add an address to the whitelist
    function addResidentWhitelist(
        address account,
        bytes memory residentNric
    ) external onlyRole(GOVERNMENT_OFFICER_ROLE) {
        // Ensure that the resident is not already whitelisted
        require(
            !whitelistedResidents[account],
            "Resident address is already whitelisted"
        );

        require(
            !whitelistedResidentNrics[residentNric],
            "Resident NRIC is already whitelisted"
        );

        // Perform the whitelisting by adding the address to the mapping
        whitelistedResidents[account] = true;
        whitelistedResidentNrics[residentNric] = true;
    }

    // Remove an address from the whitelist
    function removeResidentWhitelist(
        address account,
        bytes memory residentNric
    ) external onlyRole(GOVERNMENT_OFFICER_ROLE) {
        // Perform the whitelisting by adding the address to the mapping
        whitelistedResidents[account] = false;
        whitelistedResidentNrics[residentNric] = false;
    }

    function isResidentWhitelisted(
        address resident
    ) public view returns (bool) {
        return whitelistedResidents[resident];
    }

    function verifyWhitelistedResident(
        address resident,
        bytes memory residentNric
    ) public view returns (bool) {
        return
            residents[resident] &&
            residentNrics[residentNric] &&
            whitelistedResidents[resident] &&
            whitelistedResidentNrics[residentNric];
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
