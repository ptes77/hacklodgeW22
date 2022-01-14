import "./Landing.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing p-4 mx-auto">
      <div className="landing-title my-1">snapglass</div>
      <div className="landing-desc my-3">
        The premier decentralized voting platform using reputation and
        participation
      </div>
      <Link to="/a/proposal">
        <button type="button" className="btn btn-outline-dark btn-enter my-2">
          Enter app
        </button>
      </Link>
    </div>
  );
}
