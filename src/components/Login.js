import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [error, setError] = useState('')

  const submitLoginForm = (e) => {
    e.preventDefault();
    let username = e.target[0].value;
    let password = e.target[1].value;

    let passwordLength = password.length;
    if(passwordLength < 6){
      setError('Password length should be greater than 6');
    }
    else if(isNaN(parseInt(password))){
      setError('Password should contain a number');
    }
    if (username === "Oliver" && password === "test@123") {
      localStorage.setItem("username", username);
      history.push("/ordermanagementpage");
      alert("Login Successfull");
    } else {
      setError('Your username or password is incorrect. Please try again.');
      alert("Your username or password is incorrect. Please try again.");
    }
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10%",
        }}
      >
        <div className="card text-center" style={{ width: "60%" }}>
          <form onSubmit={(e) => submitLoginForm(e)} style={{ padding: "10%" }}>
            <h1 className="mb-2">Login</h1>
            <div className="col-md-12">
              <div className="col">
                <label>Enter your username/email</label>
                <input type="text" className="form-control mt-2 mb-2"></input>
              </div>
              <div className="col">
                <label>Enter your Password</label>
                <input
                  type="password"
                  className="form-control mt-2 mb-2"
                ></input>
                {error && <p className="text-danger">{error}</p>}
              </div>
              <div className="col">
                <button type="submit" className="btn btn-primary mt-2 mb-2">
                  Submit
                </button>
              </div>
              <div className="col">
                <span className="text-primary mr-5">Forgot Password ?</span>{" "}
                <span className="text-primary ml-5">Create New Account ?</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
