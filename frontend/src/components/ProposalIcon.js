import { useState } from "react";
import "./ProposalIcon.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProposalIcon({ title, img, body }) {
  return (
    <div className="proposal-icon p-4">
      <div className="proposal-icon-title my-2">{title}</div>
      <img src={img} className="my-2" height={72} />
      <div className="proposal-icon-body my-2">{body}</div>
    </div>
  );
}
