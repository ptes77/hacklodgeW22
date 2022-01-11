import steve from "../steve.jpeg";
import { useState } from "react";
import "./ProposalIcon.css";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProposalIcon() {
  const [vote, setVote] = useState("");
  const [isVoteActive, setIsVoteActive] = useState(true);
  const params = useParams();

  return (
    <div className="proposal p-4">
      <div className="proposal-title my-2">Placement title</div>
      <img src={steve} className="my-2" height={72} />
      <div className="proposal-body my-2">
        lorem ipsum I want a chicken sandwich and a 4-piece chicken strips,
        PROPOSAL {params.proposalId}
      </div>
    </div>
  );
}
