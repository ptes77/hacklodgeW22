const { expect } = require("chai");
const { ethers } = require("hardhat");


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe("RVotes Token", function () {
    let RVotesContract; 
    let nft;
    let owner; 
    let addr1;
    let addr2; 
    let addrs;

    this.beforeEach(async function (){
        RVotesContract = await ethers.getContractFactory("RVotes");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        nft = await RVotesContract.deploy();
        await nft.deployed();
    });

    // subset-y function: 
    describe("Deployment", function() {
        it("Should set the right owner", async function () {
            // This test expects the owner variable stored in the contract to be equal
            // to our Signer's owner.
            expect(await nft.owner()).to.equal(owner.address);
            // ez: can pull the owner and address by reading variables from the smart contract
          });
        it("Should set the correct name and symbol", async function () {
            expect(await nft.name()).to.equal("RVotes");
            expect(await nft.symbol()).to.equal("RV");
          });
    })

    describe("mintItem", function() {
        it("Should be able to mint item", async function() {
            const minty = await nft.safeMint(addr1.address);
            expect(await nft.ownerOf(0)).to.equal(addr1.address);
            const time = await nft.getTimestamp(0);
            console.log(time);
        });
    });

    // describe("burnItem", function() {
    //     it("Should burn the first token after 5 seconds", async function() {
    //         const mint0 = await nft.safeMint(addr1.address);
    //         expect(await nft.ownerOf(0)).to.equal(addr1.address);
    //         const time = await nft.getTimestamp(0);
    //         console.log("first time below: ");
    //         console.log(time);
    //         console.log("start 5s sleep");
    //         await sleep(5000);

    //         expect(await nft.balanceOf(addr1.address)).to.equal(1);

    //         const mint1 = await nft.safeMint(addr1.address);
    //         expect(await nft.ownerOf(1)).to.equal(addr1.address);
    //         const time2 = await nft.getTimestamp(1);
    //         console.log("second time below: ")
    //         console.log(time2);
    //         const mint3 = await nft.safeMint(addr1.address);
    //         const time3 = await nft.getTimestamp(2);
    //         console.log(time3);
    //         var timeelapsed = 2; 

    //         await nft._expireTokens(timeelapsed);
    //         expect(await nft.balanceOf(addr1.address)).to.equal(2); // balance should be 2
    //         // owner of burned token is the 0 address but also token 0 is nonexistent
    //     });
    // });

    describe("burnTwice", async function() {
        it("burns two tokens over 10 seconds", async function() {
            const mint0 = await nft.safeMint(addr1.address);
            expect(await nft.ownerOf(0)).to.equal(addr1.address);
            console.log("minted, start 5s sleep");
            await sleep(5000);

            const mint1 = await nft.safeMint(addr1.address);
            const mint2 = await nft.safeMint(addr1.address);
            console.log("minted two, start 3s sleep");
            await sleep(3000);
            var timeelapsedsec = 5; 

            await nft._expireTokens(timeelapsedsec);
            expect(await nft.balanceOf(addr1.address)).to.equal(2); // balance should be 2 bc token 0 burned

            console.log("burned and checked, start 5s sleep");
            await sleep(5000);
            await nft._expireTokens(timeelapsedsec);
            expect(await nft.balanceOf(addr1.address)).to.equal(0); // should be 0
        });
    });

    
    
    // testing out scopes n
    // describe("scopes", function() {
    //     const one = 1; 
    //     var num = 1; 
    //     it("Makes some variables", async function() {
    //         expect(one == num);
    //     });
    //     it ("makes another and checks it", async function() {
    //         const two = 2;
    //         expect(two == 2);
    //         expect(one < two);
    //     });
    // });
});
