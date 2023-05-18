import './Header.css';
import {useHistory} from 'react-router-dom';
export default function Headers() {
    const history = useHistory();
    const logout = () =>{
        localStorage.removeItem('username');
        history.push('/login');
    }

  return (
    <div className="header-parent">
    <div className='heading-style'>
    Order Management Tool
    </div>
      <div className="user-div">
        <img src="" className="img-style" />
        <div className="dropdown">
        <span className="user-text">Oliver John</span>
        <div className="dropdown-content">
          <a href="#" onClick={logout}>Logout</a>
        </div>
        </div>
      </div>
    </div>
  );
}
