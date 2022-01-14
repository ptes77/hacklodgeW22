import "./Header.css";
import ConnectWalletButton from "./ConnectWalletButton.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header(props) {
  return (
    <nav className="border-bottom fixed-top">
      <div className="px-4 mx-auto header">
        <div className="logo">
          <a href="/">snapglass</a>
        </div>
        <div className="profile">
          <ConnectWalletButton {...props} />
          <a
            href="https://twitter.com/eilleeenz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              type="button"
              className="btn btn-outline-dark btn-circle"
              onClick={() => alert("LOL")}
            >
              <div className="emoji">👑</div>
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}
