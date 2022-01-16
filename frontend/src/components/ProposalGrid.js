import steve from "../steve.jpeg";
import { useEffect, useState } from "react";
import ProposalIcon from "./ProposalIcon.js";
import { Link } from "react-router-dom";
import "./ProposalGrid.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateProposalModal from "./CreateProposalModal";
import * as ipfsAPI from "ipfs-http-client";
import { BufferList } from "bl";
import { ethers } from "ethers";

import RVotesArtifact from "../contracts/RVotes.json";
import RVotesContractAddress from "../contracts/contract-address.json";
import VotingArtifact from "../contracts/Voting.json";
import VotingContractAddress from "../contracts/contract-address-voting.json";

export default function ProposalGrid() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("sample title");
  const [desc, setDesc] = useState("sample desc");
  const [currTopicId, setCurrTopicId] = useState(0);
  const [propIdToHash, setPropIdToHash] = useState({});
  const [propHashToId, setPropHashToId] = useState({});
  const [topics, setTopics] = useState({});

  function toggleModal() {
    setShowModal(!showModal);
  }

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
      })
      .then(() => setTopics(mapping));
    return mapping;
  }

  let grid;

  useEffect(() => {
    getAllTopics().then((mapping) => {
      console.log(mapping);
      for (const item in mapping) {
        console.log("TESTING ", item, " IS ", mapping[item]);
      }
    });
  }, []);

  const ipfs = ipfsAPI.create({
    host: "ipfs.infura.io",
    port: "5001",
    protocol: "https",
  });

  async function getFromIPFS(hashToGet) {
    for await (const file of ipfs.get(hashToGet)) {
      const string = new TextDecoder("utf-8").decode(file);
      const fileJSON = JSON.parse(
        string.slice(string.indexOf("{"), string.lastIndexOf("}") + 1)
      );
      return fileJSON;
    }
  }

  async function uploadProposalToIPFS() {
    let proposal = {
      title: title,
      description: desc,
      external_url:
        "https://hacklodge-w22.vercel.app/a/proposal/" + currTopicId,
    };

    console.log("Uploading proposal to IPFS...");
    console.log("Proposal to be uploaded:", proposal);
    const uploadedProposal = await ipfs.add(JSON.stringify(proposal));
    console.log("uploaded proposal:", uploadedProposal);

    // dang these don't work bc they get reset every time ;o
    setPropIdToHash({ ...propIdToHash, currTopicId: uploadedProposal });
    setPropHashToId({ ...propHashToId, uploadedProposal: currTopicId });
    return uploadedProposal;
  }

  // testing upload to ipfs, works :D
  // ipfs.io/ipfs/QmVCWWhak5SWkTLn5DvMTZzhYZXs7fHG9EJiHPZAHNxEzz
  // ipfs.io/ipfs/QmSvz2GuKEYLvDt3RwQfBn9EaUbdceAXGdHq6LfabLJdQJ
  // useEffect(() => {
  //   console.log("UPLOADING TO IPFS");
  //   uploadToIPFSasJSON().then((data) => console.log(data));
  // }, []);

  // getFromIPFS("QmSvz2GuKEYLvDt3RwQfBn9EaUbdceAXGdHq6LfabLJdQJ").then((data) =>
  //   console.log("testing: ", data)
  // );

  const body =
    "Click to view more details (author, description, voting options) about this proposal";

  return (
    <>
      <div className="title text-start flex">
        <div className="py-2">Live Proposals</div>
        <button
          type="button"
          className="btn btn-primary btn-proposal"
          onClick={toggleModal}
        >
          Create a proposal
        </button>
      </div>
      <div className="grid gap-6 grid-cols-3 mx-auto">
        {[...Array(11).keys()].map((i) => {
          return (
            <Link to={`/a/proposal/${i}`} key={i}>
              <ProposalIcon title={"Proposal " + i} body={body} />
            </Link>
          );
        })}
      </div>
      {showModal && (
        <CreateProposalModal
          toggleModal={toggleModal}
          title={title}
          setTitle={setTitle}
          desc={desc}
          setDesc={setDesc}
          currTopicId={currTopicId}
          setCurrTopicId={setCurrTopicId}
          uploadProposalToIPFS={uploadProposalToIPFS}
          topics={topics}
          setTopics={setTopics}
        />
      )}
    </>
  );
}
