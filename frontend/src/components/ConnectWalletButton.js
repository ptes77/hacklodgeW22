import "bootstrap/dist/css/bootstrap.min.css";

export default function CollectWalletButton() {
  function connectWallet() {
    console.log("Connecting wallet! haha jk");
  }

  return (
    <button
      type="button"
      className="btn btn-outline-primary"
      onClick={() => connectWallet()}
    >
      Connect wallet
    </button>
  );
}
