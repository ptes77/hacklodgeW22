import { useEffect, useState } from "react";
import "./Proposal.css";
import ButtonGroup from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { Link, useParams } from "react-router-dom";
import { ethers, BigNumber } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";

import RVotesArtifact from "../contracts/RVotes.json";
import RVotesContractAddress from "../contracts/contract-address.json";
import VotingArtifact from "../contracts/Voting.json";
import VotingContractAddress from "../contracts/contract-address-voting.json";

export default function Proposal() {
  const [voteValue, setVoteValue] = useState(0);
  const [balance, setBalance] = useState(BigNumber.from(0));
  const params = useParams();

  // Initialize ethers
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(0); //ez: set this to 0 for metamask
  const _nft = new ethers.Contract( // ez: call _nft.<function_name>([]) for token methods
    RVotesContractAddress.Token,
    RVotesArtifact.abi,
    signer
  );
  const _votingLogic = new ethers.Contract( // ez: call _votingLogic.<function_name>([]) for voting
    VotingContractAddress.Token,
    VotingArtifact.abi,
    signer
  );

  let userAddress = localStorage.getItem("userAddress");

  useEffect(() => {
    async function _getUserBalance() {
      setBalance(await _nft.balanceOf(userAddress));
    }
    userAddress = localStorage.getItem("userAddress");
    _getUserBalance();
  }, [userAddress]);

  function shortenAddress(addr) {
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  }

  function submitVote() {
    if ([1, 2, 3].includes(voteValue)) {
      _votingLogic
        .vote(params.proposalId, voteValue)
        .then(() => console.log("Successfully submitted vote!"))
        .catch((err) => console.error(err));
    } else {
      console.error("Invalide vote value!");
    }
  }

  function distributeReputation() {
    _votingLogic
      .distributeReputation(params.proposalId)
      .then((data) => {
        if (data) {
          console.log("Distribution successful!");
        } else {
          console.log("Distribution unsuccessful, check logs");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // async function _getUserBalance() {
  //   setBalance(await _nft.balanceOf(userAddress));
  // }

  // _getUserBalance(userAddress);

  let title = "";
  let desc = "";
  let author = "";

  console.log("PROPOSALID", typeof params.proposalId);
  switch (params.proposalId) {
    case "0":
      title = "Create foundational working groups and working group rules";
      desc = `
        Create four foundational working groups and establish rules related to the creation, management, and dissolution of working groups within the AveryDAO. 

        1. Meta-Governance
        2. ENS Ecosystem
        3. Community
        4. Public Goods
        
        This proposal also sets out rules related to the creation and dissolution of working groups and outlines how working groups will be managed within the DAO.
        `;
      author = "jamespark.eth";
      break;
    case "1":
      title = "Ratification of the AveryDAO Constitution";
      desc = `This vote proposes to ratify the AveryDAO Constitution with SHA1 hash e92b37nls84n3v2lk442bv3j2f1, reproduced below for convenience.

      If, at the end of the voting period, all articles have at least two-thirds approval, the Constitution as a whole will be considered passed, effective immediately.
      
      If at least one article has less than two-thirds approval at the end of the voting period, only the articles with at least two-thirds approval will be considered passed, and amendment and ratification of the remaining articles, and any new articles, becomes the responsibility of AveryDAO delegates.
      `;
      author = "adrian.eth";
      break;
    case "2":
      title = "What option will bots prefer?";
      desc = "If you are a human, please do not vote on this.";
      author = "0xturingtest";
      break;
    case "3":
      title = "Avery workshop 2021 Autumn community voting";
      desc = `After watching the project pitch at the Avery workshop, please vote for your favourite project. The winning project wins $1000 worth of Shutup Coin and you will get the community voter POAP badge.`;
      author = "chancellor.eth";
      break;
    case "4":
      title =
        "How many copies should we mint for our first UpAvery NFT giveaway?";
      desc = `For more detail, please read https://avery.caltech.edu/constitution/`;
      author = "0xajay";
      break;
    default:
      title =
        "Remove doors from Avery House rooms to rekindle social interaction";
      desc = `There will be more information released on this groundbreaking change. Please contact house stewards for more information.`;
      author = "0xwhammy";
      break;
  }
  console.log(title, desc, author);

  return (
    <div className="container vote-ui">
      <div className="row">
        <div className="col-8 text-left pe-4">
          <div className="text-start  p-3 proposal-title">
            {title}
            <p className="proposal-author">By: {author}</p>
          </div>
          <div className="text-start p-3 proposal-body">{desc}</div>
        </div>
        <div className="col-4">
          <div className="border vote-box">
            <div className="vote-title">Cast your vote</div>
            <div className="user-info-group">
              <div className="d-flex justify-content-between">
                <p className="user-info-a">Account:</p>
                <p className="user-info-b">{shortenAddress(userAddress)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="user-info-a">Your Voting Power:</p>
                <p className="user-info-b">
                  {ethers.utils.formatUnits(balance._hex, 0)} RV
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="user-info-a">Proposal</p>
                <p className="user-info-b">{params.proposalId}</p>
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
                value={1}
              >
                Yes
              </ToggleButton>
              <ToggleButton
                variant="outline-danger"
                className="vote-option"
                id="tbg-radio-2"
                value={2}
              >
                No
              </ToggleButton>
              <ToggleButton
                variant="outline-secondary"
                className="vote-option"
                id="tbg-radio-3"
                value={3}
              >
                Abstain
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="success"
              className="btn-vote-submit"
              onClick={submitVote}
              disabled={voteValue === "" || !userAddress}
            >
              Vote
            </Button>
          </div>
        </div>
        <span>
          <Link to="/a/proposal">
            <button type="button" className="btn btn-outline-primary">
              back!
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={distributeReputation}
          >
            distribute reputation
          </button>
        </span>
      </div>
    </div>
  );
}
