import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import DApp from "./DApp";
import Landing from "./components/Landing.js";
import Proposal from "./components/Proposal.js";
import ProposalGrid from "./components/ProposalGrid.js";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="" element={<Landing />} />
        <Route path="/a" element={<DApp />}>
          <Route path="proposal" element={<ProposalGrid />} />
          <Route path="proposal/:proposalId" element={<Proposal />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here :P</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
