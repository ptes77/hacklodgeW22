import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ConnectWalletButton.css";

export default function CollectWalletButton(props) {
  const { toggleModal, userAddress } = props;

  function shortenAddress(addr) {
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-primary btn-connect"
        onClick={toggleModal}
      >
        {userAddress ? shortenAddress(userAddress) : "connect me"}
      </button>
    </>
  );
}
