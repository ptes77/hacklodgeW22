import "bootstrap/dist/css/bootstrap.min.css";
export default function WalletInfo(props) {
  return (
    <div className="col-12">
      <p>
        Total # of reputation tokens owned by this address:{" "}
        {props.dataFromParent}
      </p>
    </div>
  );
}
