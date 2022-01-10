import logo from './logo.svg';
import './DApp.css';

function DApp() {
  return (
    <div className="DApp">
      <header className="DApp-header">
        <img src={logo} className="DApp-logo" alt="logo" />
        <p>
          temp landing site
        </p>
        <a
          className="DApp-link"
          href="https://op.gg/summoner/Tevster"
          target="_blank"
          rel="noopener noreferrer"
        >
          the legend himself
        </a>
      </header>
    </div>
  );
}

export default DApp;
