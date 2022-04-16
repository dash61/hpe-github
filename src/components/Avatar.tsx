// import React from 'react';

interface IProps {
  avatarUrl: string;
}

function Avatar(props: IProps): JSX.Element | null {

  return (
    <img
      height={60} 
      src={props.avatarUrl}
      style={{borderRadius: 10}}
      width={60}
      alt={"Avatar"}
    />
  );
}

export default Avatar;