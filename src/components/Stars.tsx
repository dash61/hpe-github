
interface IProps {
  count: number;
}

const Stars = (props: IProps): JSX.Element => {
  return (
    <div className="starsContainer">
      <span className="star">★ </span>
      <span>{props.count}</span>
    </div>
  );
}

export default Stars;
