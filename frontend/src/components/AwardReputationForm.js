import React from "react";
import "./AwardReputationForm.css";

export function AwardReputationForm({ awardRep }) {
  return (
    <div className="utils">
      <h4>Award Reputation: </h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.target);
          const to = formData.get("to");

          if (to) {
            awardRep(to);
          }
        }}
      >
        <div className="form-group">
          <label>Recipient address </label>
          <input className="form-control" type="text" name="to" required />
        </div>
        <div className="form-group">
          <input
            className="btn btn-primary"
            type="submit"
            value="Click to distribute reputation"
          />
        </div>
      </form>
    </div>
  );
}
