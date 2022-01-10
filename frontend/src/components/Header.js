import "./Header.css";
import ConnectWalletButton from "./ConnectWalletButton.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header(props) {
  return (
    <nav className="border-bottom fixed-top">
      <div className="px-4 mx-auto header">
        <div className="logo">sorry</div>
        <div className="profile">
          <ConnectWalletButton {...props} />
          <button
            type="button"
            className="btn btn-outline-dark btn-circle"
            onClick={() => alert("LOL")}
          >
            :D
          </button>
        </div>
      </div>
    </nav>
  );
}
