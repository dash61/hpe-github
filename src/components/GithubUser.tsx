import '../App.css';
import Avatar from './Avatar';

interface IProps {
  avatarUrl: string;
  userName: string;
  location: string;
}
function GithubUser (props: IProps): JSX.Element {
  return (
    <div className='ghubUser'>
      <Avatar avatarUrl={props.avatarUrl} />
      <a
        className="App-link"
        href={`https://github.com/${props.userName}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.userName} {props.location ? `from ${props.location}` : ""}
      </a>
    </div>
);
}

export default GithubUser;
