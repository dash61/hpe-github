import {IGithubRepo} from "../external/github";

interface IProps {
  repo: IGithubRepo;
}

function RepoDetails(props: IProps): JSX.Element | null {

  return (
    <section style={{
      backgroundColor: "darkgrey",
      textAlign: "left",
      margin: "5px 50px 10px 50px",
      borderRadius: 5,
    }}>
      <div style={{
        paddingLeft: 10,
        paddingBottom: 5,
        margin: 0,
      }}>
        <h3 style={{
          margin: 0,
          paddingTop: 5,
          textAlign: "left",
        }}>{props.repo.name}</h3>
        <p style={{
          margin: 0,
          marginTop: 5,
        }}>{props.repo.description}</p>
        <p style={{
          margin: 0,
          marginTop: 5,
        }}>{props.repo.language}</p>

      </div>
    </section>
);
}

export default RepoDetails;
