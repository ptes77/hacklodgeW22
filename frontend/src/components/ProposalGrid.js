import ProposalIcon from "./ProposalIcon.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProposalGrid() {
  return (
    <div className="grid gap-6 grid-cols-3 mx-auto mt-4">
      {[...Array(10).keys()].map((i) => {
        return <ProposalIcon key={i} />;
      })}
    </div>
  );
}
