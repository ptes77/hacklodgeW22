import logo from "./steve.jpeg";
import ConnectWalletModal from "./components/ConnectWalletModal.js";
import Header from "./components/Header.js";
import { useState } from "react";
import "./DApp.css";

function DApp() {
  const [showModal, setShowModal] = useState(false);
  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <div className="DApp">
      <Header toggleModal={toggleModal} />

      <div className="DApp-body">
        <img src={logo} className="DApp-logo my-5" alt="logo" />
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
        <img src={logo} className="DApp-logo my-5" alt="logo" />
      </div>
      {showModal && <ConnectWalletModal toggleModal={toggleModal} />}
    </div>
  );
}

export default DApp;
