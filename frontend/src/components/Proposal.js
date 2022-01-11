import { useState } from "react";
import "./Proposal.css";
import ButtonGroup from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Proposal() {
  const [voteValue, setVoteValue] = useState("");
  const params = useParams();

  function shortenAddress(addr) {
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  }

  return (
    <div className="container vote-ui">
      <div className="row">
        <div className="col-8 text-left pe-4">
          <div className="text-start border p-3 proposal-title">
            Proposal Title
          </div>
          <div className="text-start border p-3 proposal-body">
            Proposal Body lorem ipsum pasoidfjpaosdfijpaosdijfpoadsjf poaisdf
            poaijsd fpoaid sjfpoaijsd fpoaijd sfpoaisdj fpoaijdsf psaoijdf
            pasodfij
          </div>
        </div>
        <div className="col-4 border vote-box">
          <div className="vote-title">Cast your vote</div>
          <div className="user-info-group">
            <div className="d-flex justify-content-between">
              <p className="user-info-a">Account:</p>
              <p className="user-info-b">
                {shortenAddress(localStorage.getItem("userAddress"))}
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="user-info-a">Your Voting Power:</p>
              <p className="user-info-b">900 AVRY</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="user-info-a">Author</p>
              <p className="user-info-b">0xAVERY241</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="user-info-a">Start Date</p>
              <p className="user-info-b">today</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="user-info-a">End Date</p>
              <p className="user-info-b">tomorrow</p>
            </div>
          </div>
          <ToggleButtonGroup
            type="radio"
            name="options"
            className="vote-option-list"
            defaultValue={1}
            vertical={true}
            value={voteValue}
            onChange={setVoteValue}
          >
            <ToggleButton
              variant="outline-primary"
              className="vote-option"
              id="tbg-radio-1"
              value="Yes"
            >
              Yes
            </ToggleButton>
            <ToggleButton
              variant="outline-danger"
              className="vote-option"
              id="tbg-radio-2"
              value="No"
            >
              No
            </ToggleButton>
            <ToggleButton
              variant="outline-secondary"
              className="vote-option"
              id="tbg-radio-3"
              value="Abstain"
            >
              Abstain
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="success"
            className="btn-vote-submit"
            onClick={() => alert("You voted: " + voteValue)}
          >
            Vote
          </Button>
        </div>
        <Link to="/">
          <button type="button" className="btn btn-outline-primary">
            back!
          </button>
        </Link>
      </div>
    </div>
  );
}
