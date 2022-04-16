import React from 'react';
import './App.css';
import githubUsernameRegex from 'github-username-regex';
import {getUserData, getUserRepos, IGithubUser, IGithubRepo} from "./external/github";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GithubUser from './components/GithubUser';
import RepoDetails from './components/RepoDetails';

function App() {
  const [userName, setUserName] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [numRepos, setNumRepos] = React.useState(0);
  const [repos, setRepos] = React.useState<IGithubRepo[]>([]);

  const fetchUserData = async (url: string) => {
    const userData: IGithubUser | undefined = await getUserData(url);
    if (userData) {
      console.log("user data object is NOT empty");
      if (userData) {
        console.log("user data object is NOT empty");
        setAvatarUrl(userData.avatar_url);
        setLocation(userData.location);
        setNumRepos(userData.public_repos);
      }
    }
  }

  const fetchUserRepos = async (url: string) => {
    const userRepos: IGithubRepo[] = await getUserRepos(url);
    if (userRepos.length) {
      setRepos([...userRepos]);
    }
  }

  React.useEffect(() => {
    const url = window.location.pathname.split('/');
    const okName = githubUsernameRegex.test(url[1]);
    // console.log("url=", url, ", okName=", okName);

    if (okName) {
      fetchUserData(url[1]);
      fetchUserRepos(url[1]);
      setUserName(url[1]);
    }
  }, []);

  return (
    <div className="container">
      <Header />
      <main className='content'>
        { !userName ?
          <p>
            Error - invalid user name entered ({userName})
          </p>
        :
          <>
            <GithubUser avatarUrl={avatarUrl} userName={userName} location={location}/>
            { numRepos && repos.map((repo, index) => {
                return (
                  <RepoDetails repo={repo} key={`repo-${index}`} />
                )
              })
            }
          </>
        }
      </main>

      <Footer />
    </div>
  );
}

export default App;
