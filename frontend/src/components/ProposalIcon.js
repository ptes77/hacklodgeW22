import { useState } from "react";
import "./ProposalIcon.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProposalIcon({ title, body }) {
  return (
    <div className="proposal-icon p-4">
      <div className="proposal-icon-title my-2">{title}</div>
      <div className="proposal-icon-body my-2">{body}</div>
    </div>
  );
}
