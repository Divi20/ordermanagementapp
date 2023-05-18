import {useHistory} from 'react-router-dom';

export default function Login(){

    const history = useHistory();

    const submitLoginForm = (e) =>{
        e.preventDefault()
        let username = e.target[0].value;
        let password = e.target[1].value;

        if(username == 'Oliver' && password == 'test@123'){
            localStorage.setItem('username', username)        
            history.push('/ordermanagementpage');
            alert("Login Successfull");
        }
        else{
            alert("Your username or password is incorrect. Please try again.");
        }
    }

    return <div className="App">
    <div style={{display : "flex", justifyContent : "center" , alignItems : "center",  padding : "10%"}}>
    
    <div className="card text-center" style={{width : "60%"}}>  
    <form onSubmit={(e)=>submitLoginForm(e)} style={{padding : "10%"}}>
    <h1 className="mb-2">Login</h1>
    <div className="col-md-12">
    <div className="col">
    <label>Username</label>
    <input type="text" className="form-control mt-2 mb-2"></input>
    </div>
    <div className="col">
    <label>Password</label>
    <input type="password" className="form-control mt-2 mb-2"></input>
    </div>
    <div className="col">
    <button type = "submit" className="btn btn-primary mt-2 mb-2">Submit</button>
    </div>
    <div className="col">
    <span className="text-primary mr-5">Forgot Password ?</span>  <span className="text-primary ml-5">Create New Account ?</span>
    </div>
    </div>
    </form>
    </div>
    </div>
    </div>

}