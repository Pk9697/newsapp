import './App.css';

import React,{useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App=()=> {
  const apiKey=process.env.REACT_APP_API_KEY;
  const [progress, setProgress] = useState(0);
  // state={
  //   progress:0
  // }
  // setProgress=(progress)=>{
  //   this.setState({progress: progress})
  // }
 
    return (
      <Router>
      <div>
        {/* Class based component {this.c} */}
        <NavBar/>
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
          // onLoaderFinished={() => setProgress(0)}
        />
        <Switch>
          <Route exact path="/">
              <News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={6} country="in" category="general"/>
          </Route>
          <Route exact path="/business">
              <News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={6} country="in" category="business"/>
          </Route>
          <Route exact path="/entertainment">
              <News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={6} country="in" category="entertainment"/>
          </Route>
          <Route exact path="/health">
              <News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={6} country="in" category="health"/>
          </Route>
          <Route exact path="/science">
              <News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={6} country="in" category="science"/>
          </Route>
          <Route exact path="/sports">
              <News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={6} country="in" category="sports"/>
          </Route>
          <Route exact path="/technology">
              <News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={6} country="in" category="technology"/>
          </Route>
        </Switch>
      </div>
      </Router>
    )

}

export default App;

