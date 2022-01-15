import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
export default function WalletInfo(props) {
  return (
    <div className="col-12">
      <h1>Data from parent is:{props.dataFromParent}</h1>
      {/* <p>
            Welcome <b>{this.state.selectedAddress}</b>, you have{" "}
            <b>
              {this.state.userNFTs.length} {this.state.nftData.symbol}
            </b>
            .
          </p> */}
    </div>
  );
}
