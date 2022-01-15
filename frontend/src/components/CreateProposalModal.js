import { useState, useEffect } from "react";
import "./CreateProposalModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { ethers } from "ethers";

import RVotesArtifact from "../contracts/RVotes.json";
import RVotesContractAddress from "../contracts/contract-address.json";
import VotingArtifact from "../contracts/Voting.json";
import VotingContractAddress from "../contracts/contract-address-voting.json";

export default function CreateProposalModal({ props }) {
  const {
    toggleModal,
    title,
    setTitle,
    desc,
    setDesc,
    currTopicId,
    setCurrTopicId,
    uploadProposalToIPFS,
  } = props;

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

  async function getCurrTopicId() {
    setCurrTopicId(await _votingLogic.nextTopicNumber());
  }

  function submitProposal() {
    // Default vote is 60 seconds;
    // may have weird async behavior if too many people use at the same time
    getCurrTopicId();
    _votingLogic.createTopic(title, 3, 60);
    uploadProposalToIPFS();
  }

  useEffect(() => {
    getCurrTopicId();
  }, []);

  console.log("curr topic id  ", currTopicId);

  return (
    <div
      className="proposal-modal"
      tabIndex="-1"
      aria-labelledby="connect to proposal modal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-rounder">
          <div className="modal-header justify-content-center">
            <h5 className="modal-title fw-600">Create Proposal</h5>
          </div>
          <div className="modal-body mb-2 p-4">
            <Form>
              <Form.Group className="mb-3" controlId="proposalTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Do you like apples?"
                  value={title}
                  onChange={setTitle}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="proposalDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={desc}
                  onChange={setDesc}
                />
              </Form.Group>
              <Button variant="primary" type="submit" onSubmit={submitProposal}>
                Submit
              </Button>
            </Form>
          </div>
          <button
            type="button"
            className="btn-close btn-modal-close"
            onClick={toggleModal}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}
