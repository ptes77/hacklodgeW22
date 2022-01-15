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
      _votingLogic.vote(params.proposalId, voteValue);
    } else {
      console.error("Invalide vote value!");
    }
  }

  // async function _getUserBalance() {
  //   setBalance(await _nft.balanceOf(userAddress));
  // }

  // _getUserBalance(userAddress);
  console.log("balance:", balance);

  return (
    <div className="container vote-ui">
      <div className="row">
        <div className="col-8 text-left pe-4">
          <div className="text-start  p-3 proposal-title">
            Remove doors from Avery House rooms to rekindle social interaction
            <p className="proposal-author">By: 0xwhammy</p>
          </div>
          <div className="text-start  p-3 proposal-body">
            Proposal Body lorem ipsum pasoidfjpaosdfijpaosdijfpoadsjf poaisdf
            poaijsd fpoaid sjfpoaijsd fpoaijd sfpoaisdj fpoaijdsf psaoijdf
            pasodfij a psodfijpasdf ijpaosdij fopaisdj fpoaids jfpoaij sdfpoia
            jsdfpoiajs dfpoij asdpfoi jasdpfoij pasodifj poaisd fpoiasd fpa
            sdjfpoi asdfpoij asdpofijapsdf ijoapsdijf pasidjf poaisdjf opasidj
            fpaosijdfpoasi jdfpoasid jfpaosidjf paoidsjf paosidjfpouqhwroiuhew
            oriqjnwer ijqnw pfoeijqpw eofijpozixchv pozixcjv pqoiwnpeoiuwhr
            fpoausdh goiuysdovjcn xlcozvjoixcvubhopaidfj poijwer poqiwej r
            Proposal Body lorem ipsum pasoidfjpaosdfijpaosdijfpoadsjf poaisdf
            poaijsd fpoaid sjfpoaijsd fpoaijd sfpoaisdj fpoaijdsf psaoijdf
            pasodfij a psodfijpasdf ijpaosdij fopaisdj fpoaids jfpoaij sdfpoia
            jsdfpoiajs dfpoij asdpfoi jasdpfoij pasodifj poaisd fpoiasd fpa
            sdjfpoi asdfpoij asdpofijapsdf ijoapsdijf pasidjf poaisdjf opasidj
            fpaosijdfpoasi jdfpoasid jfpaosidjf paoidsjf paosidjfpouqhwroiuhew
            oriqjnwer ijqnw pfoeijqpw eofijpozixchv pozixcjv pqoiwnpeoiuwhr
            fpoausdh goiuysdovjcn xlcozvjoixcvubhopaidfj poijwer poqiwej r
            Proposal Body lorem ipsum pasoidfjpaosdfijpaosdijfpoadsjf poaisdf
            poaijsd fpoaid sjfpoaijsd fpoaijd sfpoaisdj fpoaijdsf psaoijdf
            pasodfij a psodfijpasdf ijpaosdij fopaisdj fpoaids jfpoaij sdfpoia
            jsdfpoiajs dfpoij asdpfoi jasdpfoij pasodifj poaisd fpoiasd fpa
            sdjfpoi asdfpoij asdpofijapsdf ijoapsdijf pasidjf poaisdjf opasidj
            fpaosijdfpoasi jdfpoasid jfpaosidjf paoidsjf paosidjfpouqhwroiuhew
            oriqjnwer ijqnw pfoeijqpw eofijpozixchv pozixcjv pqoiwnpeoiuwhr
            fpoausdh goiuysdovjcn xlcozvjoixcvubhopaidfj poijwer poqiwej r
            Proposal Body lorem ipsum pasoidfjpaosdfijpaosdijfpoadsjf poaisdf
            poaijsd fpoaid sjfpoaijsd fpoaijd sfpoaisdj fpoaijdsf psaoijdf
            pasodfij a psodfijpasdf ijpaosdij fopaisdj fpoaids jfpoaij sdfpoia
            jsdfpoiajs dfpoij asdpfoi jasdpfoij pasodifj poaisd fpoiasd fpa
            sdjfpoi asdfpoij asdpofijapsdf ijoapsdijf pasidjf poaisdjf opasidj
            fpaosijdfpoasi jdfpoasid jfpaosidjf paoidsjf paosidjfpouqhwroiuhew
            oriqjnwer ijqnw pfoeijqpw eofijpozixchv pozixcjv pqoiwnpeoiuwhr
            fpoausdh goiuysdovjcn xlcozvjoixcvubhopaidfj poijwer poqiwej r
            Proposal Body lorem ipsum pasoidfjpaosdfijpaosdijfpoadsjf poaisdf
            poaijsd fpoaid sjfpoaijsd fpoaijd sfpoaisdj fpoaijdsf psaoijdf
            pasodfij a psodfijpasdf ijpaosdij fopaisdj fpoaids jfpoaij sdfpoia
            jsdfpoiajs dfpoij asdpfoi jasdpfoij pasodifj poaisd fpoiasd fpa
            sdjfpoi asdfpoij asdpofijapsdf ijoapsdijf pasidjf poaisdjf opasidj
            fpaosijdfpoasi jdfpoasid jfpaosidjf paoidsjf paosidjfpouqhwroiuhew
            oriqjnwer ijqnw pfoeijqpw eofijpozixchv pozixcjv pqoiwnpeoiuwhr
            fpoausdh goiuysdovjcn xlcozvjoixcvubhopaidfj poijwer poqiwej r
            Proposal Body lorem ipsum pasoidfjpaosdfijpaosdijfpoadsjf poaisdf
            poaijsd fpoaid sjfpoaijsd fpoaijd sfpoaisdj fpoaijdsf psaoijdf
            pasodfij a psodfijpasdf ijpaosdij fopaisdj fpoaids jfpoaij sdfpoia
            jsdfpoiajs dfpoij asdpfoi jasdpfoij pasodifj poaisd fpoiasd fpa
            sdjfpoi asdfpoij asdpofijapsdf ijoapsdijf pasidjf poaisdjf opasidj
            fpaosijdfpoasi jdfpoasid jfpaosidjf paoidsjf paosidjfpouqhwroiuhew
            oriqjnwer ijqnw pfoeijqpw eofijpozixchv pozixcjv pqoiwnpeoiuwhr
            fpoausdh goiuysdovjcn xlcozvjoixcvubhopaidfj poijwer poqiwej r
          </div>
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
                  {ethers.utils.formatUnits(balance._hex, 0)} AVRY
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
        <Link to="/a/proposal">
          <button type="button" className="btn btn-outline-primary">
            back!
          </button>
        </Link>
      </div>
    </div>
  );
}
