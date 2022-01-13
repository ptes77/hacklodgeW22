import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
export default function WalletInfo({balanceOf}) {
  //const [answer, setAnswer] = useState('');
  // function handleTextareaChange(e) {
  //   setAnswer(e.target.value);
  // }
  const [balance, setBalance] = useState(0);

  return (
    <div className="grid gap-6 grid-cols-3 mx-auto mt-4">
      <form onSubmit={(event) => {
          const formData = new FormData(event.target);
          const to = formData.get("to");
          
          if (to) {
            const bal = balanceOf(to);
            setBalance(bal);
          }
      }}>
        <div className="form-group">
            <label>Address to check</label>
            <input className="form-control" type="text" name="to" required/>
        </div>
        <div className="form-group">
            <input className="btn btn-primary" type="submit" value="Check Balance"/>
        </div>
      </form>
      <form onSubmit={(event) => {
          const formData = new FormData(event.target);
          const to = formData.get("to");
          
          if (to) {
            const bal = balanceOf(to);
            setBalance(bal);
          }
      }}>
        <div className="form-group">
            <label>Mint to address</label>
            <input className="form-control" type="text" name="to" required/>
        </div>
        <div className="form-group">
            <input className="btn btn-primary" type="submit" value="Mint something"/>
        </div>
      </form>

      <div>Balance: { balance }</div>
    </div>
    

  );


  
}
