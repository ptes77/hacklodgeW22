import logo from "./steve.jpeg";
import Header from "./components/Header.js";
import "./DApp.css";

function DApp() {
  return (
    <div className="DApp">
      <Header />

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
      </div>
    </div>
  );
}

export default DApp;
