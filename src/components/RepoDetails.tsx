import {IGithubRepo} from "../external/github";
import Stars from "./Stars";
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
            <Stars count={props.repo.stargazers_count} />
          </div>
          <p>{props.repo.description}</p>
          <p>{props.repo.language}</p>
        </a>
      </div>
    </section>
);
}

export default RepoDetails;
