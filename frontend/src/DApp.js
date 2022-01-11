import ConnectWalletModal from "./components/ConnectWalletModal.js";
import Header from "./components/Header.js";
import { useState } from "react";
import "./DApp.css";
import { ethers } from "ethers";
import { Outlet } from "react-router-dom";

function DApp() {
  const [showModal, setShowModal] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  function toggleModal() {
    setShowModal(!showModal);
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

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  async function getBlockNumber() {
    return await provider.getBlockNumber();
  }

  async function stuff() {
    const balance = await provider.getBalance(userAddress);
    return ethers.utils.formatEther(balance.toHexString());
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
        setUserAddress={setUserAddress}
      />

      <div className="DApp-body p-4">
        <Outlet />

        {/* <img src={logo} className="DApp-logo my-5" alt="logo" />
        <p>temp landing site</p>
        <a
          className="DApp-link"
          href="https://op.gg/summoner/Tevster"
          target="_blank"
          rel="noopener noreferrer"
        >
          the legend himself
        </a>
        the legend himself the legend himself the legend himself the legend
        himself the legend himself the legend himself the legend himself the
        legend himself the legend himself the legend himself the legend himself
        the legend himself the legend himself the legend himself the legend
        himself the legend himself the legend himself the legend himself the
        legend himself the legend himself the legend himself the legend himself
        the legend himself the legend himself the legend himself the legend
        himself the legend himself the legend himself the legend himself the
        legend himself
        <img src={logo} className="DApp-logo my-5" alt="logo" />
        <img src={logo} className="DApp-logo my-5" alt="logo" />
        <img src={logo} className="DApp-logo my-5" alt="logo" /> */}
      </div>
      {showModal && (
        <ConnectWalletModal
          toggleModal={toggleModal}
          userAddress={userAddress}
          setUserAddress={setUserAddress}
        />
      )}
    </div>
  );
}

export default DApp;
