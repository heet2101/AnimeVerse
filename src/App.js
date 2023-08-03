import Header from "./components/header";
import Cards from "./components/Cards";
import { Route,Routes } from "react-router-dom";
import Addmovie from "./components/Addmovie";
import Detail from "./components/Detail";
import { createContext,useEffect,useState } from "react";
import Login from "./components/Login"
import Signup from "./components/Signup"


const appstate= createContext();

function App() {
  const [login,setlogin]=useState(false)
  const [userName,setUserName]=useState("")
  return (
    <appstate.Provider value={{login,userName,setlogin,setUserName}}>
    <div className="App relative">
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/addmovie" element={<Addmovie/>} />
        <Route path="/Detail/:id" element={<Detail/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
       

        
    
      </Routes>
    </div>
    </appstate.Provider>
  );
}

export default App;
export {appstate};
