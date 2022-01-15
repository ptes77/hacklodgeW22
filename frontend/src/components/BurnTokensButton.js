import React from "react";
import { Button } from "react-bootstrap";

export function BurnTokensButton({ burnTokens }) {
  return (
    <div>
      <Button
        onClick={(event) => {
          event.preventDefault();
          burnTokens();
        }}
      >
        Burn all tokens more than 1min old
      </Button>
    </div>
  );
}
