import React from 'react';
import './App.css';
import githubUsernameRegex from 'github-username-regex';
import {getUserData, getUserRepos, IGithubUser, IGithubRepo} from "./external/github";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GithubUser from './components/GithubUser';
import RepoDetails from './components/RepoDetails';
import Paginator from './components/Paginator';

export const MAX_REPOS_PER_PAGE = 5;
const MAX_PAGES_TO_SHOW_IN_PAGINATOR = 4;

function App() {
  const [userName, setUserName] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [numRepos, setNumRepos] = React.useState(0);
  const [repos, setRepos] = React.useState<IGithubRepo[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const fetchUserData = async (url: string) => {
    const userData: IGithubUser | undefined = await getUserData(url);
    if (userData) {
      setAvatarUrl(userData.avatar_url);
      setLocation(userData.location);
      setNumRepos(userData.public_repos);
      return;
    }
    throw new Error("User not found");
  }

  const fetchUserRepos = React.useCallback(async (url: string) => {
    const userRepos: IGithubRepo[] = await getUserRepos(url, currentPage, MAX_REPOS_PER_PAGE);
    if (userRepos.length) {
      setRepos([...userRepos]);
    }
  }, [currentPage]);

  const handlePaginatorBtn = (currentPaginatorPage: number) => {
    setCurrentPage(currentPaginatorPage);
  }

  React.useEffect(() => {
    const url = window.location.pathname.split('/');
    const okName = githubUsernameRegex.test(url[1]);

    if (okName) {
      fetchUserData(url[1])
      .then(() => {
        fetchUserRepos(url[1]);
        setUserName(url[1]);
      })
      .catch((err: unknown) => {
        const errMsg = (err as Error)?.message;
        console.log("fetching user data - EXCEPTION - err=", errMsg);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (userName) {
      fetchUserRepos(userName);
    }
  }, [currentPage, userName, fetchUserRepos]);

  return (
    <div className="container">
      <Header />
      <main className='content'>
        { !userName ?
          <p>
            Error - invalid user name entered
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
        <Paginator
          totalItems={numRepos}
          maxItemsPerPage={MAX_REPOS_PER_PAGE}
          maxPagesToShowInPaginator={MAX_PAGES_TO_SHOW_IN_PAGINATOR}
          onSelectPage={handlePaginatorBtn}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
