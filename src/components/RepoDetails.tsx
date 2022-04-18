import {IGithubRepo} from "../external/github";
import '../App.css';

interface IProps {
  repo: IGithubRepo;
}

// Show information pertaining to one repository.
function RepoDetails(props: IProps): JSX.Element | null {

  return (
    <section style={{
    }}>
      <div className="repoItem">
        <a
          className="repoLink"
          href={props.repo.svn_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div style={{position: "relative"}}>
            <h3 className="repoTitle">{props.repo.name}</h3>
            <p style={{position: "absolute", top: -2, right: 20}}>★ {props.repo.stargazers_count}</p>
          </div>
          <p>{props.repo.description}</p>
          <p>{props.repo.language}</p>
        </a>
      </div>
    </section>
);
}

export default RepoDetails;
