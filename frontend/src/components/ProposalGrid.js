import steve from "../steve.jpeg";
import ProposalIcon from "./ProposalIcon.js";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProposalGrid() {
  const body =
    "lorem ipsum I want a chicken sandwich and a 4-piece chicken strips";

  return (
    <div className="grid gap-6 grid-cols-3 mx-auto">
      {[...Array(11).keys()].map((i) => {
        return (
          <Link to={`/proposal/${i}`} key={i}>
            <ProposalIcon title="Placement title" img={steve} body={body} />
          </Link>
        );
      })}
    </div>
  );
}
