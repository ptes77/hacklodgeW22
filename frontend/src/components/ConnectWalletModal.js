import "./ConnectWalletModal.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ConnectWalletModal({ toggleModal }) {
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
            <h5 className="modal-title">Connect wallet</h5>
          </div>
          <div className="modal-body py-3 mb-1">
            <a>
              <button
                type="button"
                className="btn btn-wallet-opt"
                onClick={() => setTimeout(toggleModal, 200)}
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
