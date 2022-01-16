import { useState, useEffect } from "react";
import "./CreateProposalModal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { ethers } from "ethers";

import RVotesArtifact from "../contracts/RVotes.json";
import RVotesContractAddress from "../contracts/contract-address.json";
import VotingArtifact from "../contracts/Voting.json";
import VotingContractAddress from "../contracts/contract-address-voting.json";

export default function CreateProposalModal(props) {
  const {
    toggleModal,
    title,
    setTitle,
    desc,
    setDesc,
    currTopicId,
    setCurrTopicId,
    uploadProposalToIPFS,
    topics,
    setTopics,
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
    const curr = (await _votingLogic.nextTopicNumber()) - 1;
    setCurrTopicId(curr);
    return curr;
  }

  async function getAllTopics() {
    let maxTopics = 0;
    let mapping = {};
    getCurrTopicId()
      .then((data) => {
        maxTopics = data;
      })
      .then(() => {
        for (let i = 0; i < maxTopics; i++) {
          _votingLogic.topics(i).then((topic) => (mapping[i] = topic));
        }
      });
    setTopics(mapping);
  }

  function submitProposal() {
    // Default vote is 60 seconds;
    // may have weird async behavior if too many people use at the same time
    console.log("submitting");
    getCurrTopicId();
    _votingLogic.createTopic(title, 3, 60);
    uploadProposalToIPFS();
    getAllTopics();
    console.log("done submitting!");
  }

  useEffect(() => {
    getCurrTopicId();
    getAllTopics();
  }, []);

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
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="proposalDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={submitProposal}>
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
