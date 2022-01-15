import ConnectWalletModal from "./components/ConnectWalletModal.js";
import Header from "./components/Header.js";
import WalletInfo from "./components/WalletInfo.js"; // ez: wallet stuff
import { AwardReputationForm } from "./components/AwardReputationForm";
import { useEffect, useState } from "react";
import "./DApp.css";
import { ethers, Wallet } from "ethers";
import { Outlet } from "react-router-dom";

// ez: contract imports
import RVotesArtifact from "./contracts/RVotes.json";
import RVotesContractAddress from "./contracts/contract-address.json";
import VotingArtifact from "./contracts/Voting.json";
import VotingContractAddress from "./contracts/contract-address-voting.json";
const ROPSTEN_NETWORK_ID = "3";
const HARDHAT_NETWORK_ID = "31337";
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

function DApp() {
  const [showModal, setShowModal] = useState(false);
  const [userAddress, setUserAddress] = useState(
    localStorage.getItem("userAddress")
  );
  const [network, setNetwork] = useState("");

  useEffect(() => {
    async function checkUserAddress() {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length == 0) {
        localStorage.setItem("userAddress", "");
        console.log("no more accounts");
      }
      console.log("checking: ", accounts);
    }
    checkUserAddress();
  });

  function toggleModal() {
    setShowModal(!showModal);
  }

  function setUserAddressFull(userAddress) {
    setUserAddress(userAddress);
    localStorage.setItem("userAddress", userAddress);
  }

  if (window.ethereum === undefined) {
    return (
      <div className="row justify-content-md-center mt-2">
        <div className="p-4 text-center fw-600">
          <p className="no-wallet">
            No Ethereum wallet was detected. <br />
            <br />
            <div>
              Please install
              <a
                href="http://metamask.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://raw.githubusercontent.com/snapshot-labs/lock/master/connectors/assets/metamask.png"
                  height="28"
                  width="28"
                  className="mx-2 mt-1 mb-2"
                  alt="MetaMask"
                />
                MetaMask
              </a>
              .
            </div>
          </p>
        </div>
      </div>
    );
  }

  // ez: initializing ethers
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(0); //ez: set this to 0 for metamask
  const _nft = new ethers.Contract( // ez: call _nft.<function_name>([]) for token methods
    RVotesContractAddress.Token,
    RVotesArtifact.abi
  );
  const _votingLogic = new ethers.Contract( // ez: call _votingLogic.<function_name>([]) for voting
    VotingContractAddress.Token,
    VotingArtifact.abi
  );

  async function getBlockNumber() {
    return await provider.getBlockNumber();
  }

  async function stuff() {
    // const balance = await provider.getBalance(userAddress);
    // return ethers.utils.formatEther(balance.toHexString());
    const networkId = await provider.getNetwork();
    return networkId;
  }

  async function _getUserBalance() {
    var nfts = 0;
    const balance = await this._nft.balanceOf(this.state.selectedAddress);
    this.setState({ userNFTs: [...nfts] });
  }

  async function _awardRep(to) {
    this._sendTransaction(this._nft.awardReputation, [to]);
  } // ez: awardRep function

  async function _burnTokens(time) {
    this._sendTransaction(this._nft._expireTokens, [20]);
    console.log("sent transaction _burnTokens");
  }
  async function _pullRecentPrompt() {
    let sendPromise = this._sendTransaction(
      this._votingLogic.getRecentTopicPrompt,
      []
    );
    console.log("pulled the most recent prompt from contract");
  }

  async function _sendTransaction(method, args) {
    try {
      const tx = await method.apply(null, args);
      this.setState({ txBeingSent: tx.hash });

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      console.error(error);
    }
  }

  // This is an utility method that turns an RPC error into a human readable
  // message.
  function _getRpcErrorMessage(error) {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  }

  stuff()
    .then((data) => {
      console.log("testing: ", data);
    })
    .catch((err) => console.log(err));
  getBlockNumber()
    .then((data) => console.log("Block number: ", data))
    .catch((err) => console.log(err));

  return (
    <div className="DApp">
      <Header
        toggleModal={toggleModal}
        userAddress={userAddress}
        setUserAddress={setUserAddressFull}
      />

      <div className="DApp-body p-4 mx-auto">
        <WalletInfo />

        <AwardReputationForm awardRep={(to) => this._awardRep(to)} />
        <Outlet />
      </div>
      {showModal && (
        <ConnectWalletModal
          toggleModal={toggleModal}
          userAddress={userAddress}
          setUserAddress={setUserAddressFull}
          network={network}
        />
      )}
    </div>
  );
}

export default DApp;
