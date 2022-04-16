import React from 'react';
import './App.css';
import githubUsernameRegex from 'github-username-regex';
import {getUserData} from "./external/github";


function App() {
  const [userName, setUserName] = React.useState("");
  
  const fetchUserData = async (url: string) => {
    const userData = await getUserData(url);
    if (userData) {
      console.log("user data object is NOT empty");
    }
  }

  React.useEffect(() => {
    const url = window.location.pathname.split('/');
    const okName = githubUsernameRegex.test(url[1]);
    // console.log("url=", url, ", okName=", okName);

    if (okName) {
      fetchUserData(url[1]);
      setUserName(url[1]);
    }
  }, []);

  return (
    <div className="container">
      <header className='header'>
        <h1>HPE Github User Analyzer</h1>
      </header>
      <main className='content'>
        { !userName ?
          <p>
            Error - invalid user name entered ({userName})
          </p>
        :
          <>
            {userName}
          </>
        }
      </main>

      <footer className='footer'>
        <h4>Just a Test App ©2022</h4>
      </footer>
    </div>
  );
}

export default App;
