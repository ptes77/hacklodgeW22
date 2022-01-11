import steve from "../steve.jpeg";
import { useState } from "react";
import "./ProposalIcon.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProposalIcon() {
  const [vote, setVote] = useState("");
  const [isVoteActive, setIsVoteActive] = useState(true);

  return (
    <a href="/" className="proposal-link" rel="noopener noreferrer">
      <div className="proposal p-4">
        <div className="proposal-title my-2">Placement title</div>
        <img src={steve} className="my-2" height={72} />
        <div className="proposal-body my-2">
          lorem ipsum I want a chicken sandwich and a 4-piece chicken strips
        </div>
      </div>
    </a>
  );
}
