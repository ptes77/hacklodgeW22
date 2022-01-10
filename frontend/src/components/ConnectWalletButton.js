import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ConnectWalletButton.css";

const HARDHAT_NETWORK_ID = "31337";

export default function CollectWalletButton({ toggleModal }) {
  const [networkError, setNetworkError] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  function connectWallet() {
    console.log("Connecting wallet! haha jk");
    toggleModal();
  }

  function _checkNetwork() {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }
    setNetworkError("Please connect Metamask to Localhost:8545");
    return false;
  }

  function _resetState() {
    setNetworkError("");
    setSelectedAddress("");
  }

  function _initialize(userAddress) {
    setSelectedAddress(userAddress);
    // Run some function to fetch user data?
  }

  function _handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      setNetworkError("Please connect to MetaMask.");
    } else {
      _initialize(accounts[0]);
    }
  }

  async function _connectWallet() {
    console.log("connecting wallet");
    if (!_checkNetwork()) {
      console.log("network check failed");
      return;
    }

    // Reset state if network changes
    window.ethereum.on("chainChanged", ([networkId]) => {
      _resetState();
      console.log("network changed!");
    });

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      _handleAccountsChanged(accounts);
    } catch (err) {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error (user rejected connection request)
        console.log("Please connect to MetaMask.");
        setNetworkError("Please connect to MetaMask.");
      } else {
        console.error(err);
        setNetworkError(err);
      }
    }

    console.log("wallet connected!:", selectedAddress);

    // Reset state if user account changes
    window.ethereum.on("accountsChanged", (accounts) => {
      _handleAccountsChanged(accounts);
      console.log("accounts changed!");
    });
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-primary btn-connect"
        onClick={() => connectWallet()}
      >
        Connect wallet
      </button>
    </>
  );
}
