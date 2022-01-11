import "./Proposal.css";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Proposal() {
  const params = useParams();
  return (
    <div>
      <div>hi! {params.proposalId}</div>
      <Link to="/">
        <button type="button" className="btn btn-outline-primary">
          back!
        </button>
      </Link>
    </div>
  );
}
