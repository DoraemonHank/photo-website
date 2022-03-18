import React from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import "./styles/style.css"
import {Switch,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav/>
      <Switch>
        <Route path = "/photo-website" exact> 
          <Homepage/>
        </Route>

        <Route path = "/about" exact> 
          <About/>
        </Route>
        
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
