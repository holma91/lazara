// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint256 public tokenId = 1;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    function mint(string memory uri) public returns (uint256) {
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        return tokenId++;
    }
}
