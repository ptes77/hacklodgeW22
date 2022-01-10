import "./Header.css";
import ConnectWalletButton from "./ConnectWalletButton.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  return (
    <nav className="border-bottom">
      <div className="px-4 mx-auto header">
        <div className="logo">sorry</div>
        <div className="profile">
          <ConnectWalletButton />
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => alert("LOL")}
          >
            :D
          </button>
        </div>
      </div>
    </nav>
  );
}
