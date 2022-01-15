import ConnectWalletModal from "./components/ConnectWalletModal.js";
import Header from "./components/Header.js";
import WalletInfo from "./components/WalletInfo.js"; // ez: wallet stuff
import { AwardReputationForm } from "./components/AwardReputationForm";
import { BurnTokensButton } from "./components/BurnTokensButton.js";
import { useEffect, useState } from "react";
import "./DApp.css";
import { ethers, Wallet } from "ethers";
import { Outlet } from "react-router-dom";

// ez: contract imports
import RVotesArtifact from "./contracts/RVotes.json";
import RVotesContractAddress from "./contracts/contract-address.json";
import VotingArtifact from "./contracts/Voting.json";
import VotingContractAddress from "./contracts/contract-address-voting.json";
import { Button } from "react-bootstrap";
const ROPSTEN_NETWORK_ID = "3";
const HARDHAT_NETWORK_ID = "31337";
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

function DApp() {
  const [showModal, setShowModal] = useState(false);
  const [userAddress, setUserAddress] = useState(
    localStorage.getItem("userAddress")
  );
  const [network, setNetwork] = useState("");
  // ez: chain state stuff
  const [userNFTs, setUserNFTs] = useState("press update");

  const [nftData, setNftData] = useState(undefined);
  const [message, setMessage] = useState("");
  const [txBeingSent, setTxBeingSent] = useState("");

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
    RVotesArtifact.abi,
    signer
  );
  const _votingLogic = new ethers.Contract( // ez: call _votingLogic.<function_name>([]) for voting
    VotingContractAddress.Token,
    VotingArtifact.abi,
    signer
  );

  async function _getUserBalance() {
    const balance = await _nft.balanceOf(userAddress);

    setUserNFTs(parseInt(balance._hex, 16));
  }

  async function _awardRep(to) {
    _sendTransaction(_nft.awardReputation, [to]);
  } // ez: awardRep function

  async function _burnTokens(time) {
    _sendTransaction(_nft._expireTokens, [60]);
    console.log("sent transaction _burnTokens, 60s");
  }
  async function _pullRecentPrompt() {
    let sendPromise = _sendTransaction(_votingLogic.getRecentTopicPrompt, []);
    console.log("pulled the most recent prompt from contract");
  }

  async function _sendTransaction(method, args) {
    try {
      const tx = await method.apply(null, args);
      setTxBeingSent(tx.hash);

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

  return (
    <div className="DApp">
      <Header
        toggleModal={toggleModal}
        userAddress={userAddress}
        setUserAddress={setUserAddressFull}
      />

      <div className="DApp-body p-4 mx-auto">
        <Outlet />
        <AwardReputationForm awardRep={(to) => _awardRep(to)} />
        <BurnTokensButton burnTokens={() => _burnTokens()} />
        {/* <WalletInfo dataFromParent={chainState} /> */}
      </div>
      {showModal && (
        <ConnectWalletModal
          toggleModal={toggleModal}
          userAddress={userAddress}
          setUserAddress={setUserAddressFull}
          network={network}
        />
      )}
      <div className="DApp-body p-4 mx-auto">
        <AwardReputationForm awardRep={(to) => _awardRep(to)} />
        <BurnTokensButton burnTokens={() => _burnTokens()} />
        <WalletInfo dataFromParent={userNFTs} />
        <p>Current wallet: {userAddress}</p>
        <Button onClick={() => _getUserBalance()}>Update Balance</Button>
      </div>
    </div>
  );
}

export default DApp;
