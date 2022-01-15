import steve from "../steve.jpeg";
import { useEffect, useState } from "react";
import ProposalIcon from "./ProposalIcon.js";
import { Link } from "react-router-dom";
import "./ProposalGrid.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateProposalModal from "./CreateProposalModal";
import * as ipfsAPI from "ipfs-http-client";
import { BufferList } from "bl";

const PROPOSAL_JSON = {
  title: "title",
  description: "description",
  external_url: "https://hacklodge-w22.vercel.app/a/proposal/",
};

export default function ProposalGrid() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("sample title");
  const [desc, setDesc] = useState("sample desc");
  const [currTopicId, setCurrTopicId] = useState(0);
  const [propIdToHash, setPropIdToHash] = useState({});
  const [propHashToId, setPropHashToId] = useState({});

  function toggleModal() {
    setShowModal(!showModal);
  }

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
    let proposal = PROPOSAL_JSON;
    proposal.title = title;
    proposal.description = desc;
    proposal.external_url = proposal.external_url + currTopicId;

    console.log("Uploading proposal to IPFS...");
    const uploadedProposal = await ipfs.add(JSON.stringify(proposal));
    console.log("uploaded proposal:", uploadedProposal);

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

  getFromIPFS("QmSvz2GuKEYLvDt3RwQfBn9EaUbdceAXGdHq6LfabLJdQJ").then((data) =>
    console.log("testing: ", data)
  );

  const body =
    "lorem ipsum I want a chicken sandwich and a 4-piece chicken strips";

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
              <ProposalIcon title="Placement title" img={steve} body={body} />
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
        />
      )}
    </>
  );
}
