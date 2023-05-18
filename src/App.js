import logo from './logo.svg';
import './App.css';
import Header from './shared/Header.js'
import OrderManagementPage from './components/OrderManagementPage';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import { AppRoutes } from './AppRoutes';

function App() {
  const [showHeader, setShowHeader]= useState(false);

  useEffect(()=>{
   let username  =  localStorage.getItem('username');
   if(username){
    setShowHeader(true)
   }
   else{
    setShowHeader(false)
   }
  })

  return (
    
    <div>
   {showHeader &&  <Header></Header>}
  <AppRoutes></AppRoutes>
    </div>
  );
}

export default App;
