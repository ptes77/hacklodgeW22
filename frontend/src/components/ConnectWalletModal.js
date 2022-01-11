import { useState } from "react";
import "./ConnectWalletModal.css";
import "bootstrap/dist/css/bootstrap.min.css";

const HARDHAT_NETWORK_ID = "31337";

export default function ConnectWalletModal(props) {
  const { toggleModal, userAddress, setUserAddress } = props;
  const [networkError, setNetworkError] = useState("");
  const [connectingWallet, setConnectingWallet] = useState(false);

  function shortenAddress(addr) {
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  }

  function _checkNetwork() {
    const allowed = ["4", "3", HARDHAT_NETWORK_ID];
    if (allowed.includes(window.ethereum.networkVersion)) {
      return true;
    }
    setNetworkError(
      "Please connect Metamask to Localhost:8545, Rinkeby, or Ropsten"
    );
    return false;
  }

  function _resetState() {
    console.log("Resetting state");
    setNetworkError("");
    setUserAddress("");
    setConnectingWallet(false);
  }

  function _initialize(userAddress) {
    setUserAddress(userAddress);
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

    // Reset state if user account changes
    window.ethereum.on("accountsChanged", (accounts) => {
      _handleAccountsChanged(accounts);
      console.log("accounts changed!");
    });
  }

  const unconnectedBody = (
    <a>
      <button
        type="button"
        className="btn btn-wallet-opt"
        onClick={() => {
          _connectWallet();
          toggleModal();
        }}
      >
        <img
          src="https://raw.githubusercontent.com/snapshot-labs/lock/master/connectors/assets/metamask.png"
          height="28"
          width="28"
          className="mx-2 mt-1 mb-2"
          alt="MetaMask"
        />
        Metamask
      </button>
    </a>
  );

  const connectedBody = (
    <>
      <a
        href={"https://www.etherscan.io/address/" + userAddress}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          type="button"
          className="btn btn-wallet-opt"
          onClick={() => {
            toggleModal();
          }}
        >
          {shortenAddress(userAddress)}
        </button>
      </a>
      <a>
        <button
          type="button"
          className="btn btn-wallet-opt"
          onClick={() => {
            setConnectingWallet(true);
          }}
        >
          Connect Wallet
        </button>
      </a>
      <a>
        <button
          type="button"
          className="btn btn-wallet-opt"
          onClick={() => {
            _resetState();
            toggleModal();
          }}
        >
          <span className="text-danger">Logout</span>
        </button>
      </a>
    </>
  );

  return (
    <div
      className="wallet-modal"
      tabIndex="-1"
      aria-labelledby="connect to wallet modal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header justify-content-center">
            <h5 className="modal-title fw-600">Connect wallet</h5>
          </div>
          <div className="modal-body py-3 mb-1">
            {userAddress && !connectingWallet ? connectedBody : unconnectedBody}
          </div>
          <button
            type="button"
            className="btn-close btn-modal-close"
            onClick={() => setTimeout(toggleModal, 200)}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}
