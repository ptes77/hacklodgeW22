import ProposalIcon from "./ProposalIcon.js";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProposalGrid() {
  return (
    <div className="grid gap-6 grid-cols-3 mx-auto mt-4">
      {[...Array(11).keys()].map((i) => {
        return (
          <Link to={`/proposal/${i}`} key={i}>
            <ProposalIcon />
          </Link>
        );
      })}
    </div>
  );
}
