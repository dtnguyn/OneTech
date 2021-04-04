import React from "react";

interface Props {}

const WebAuthError: React.FC<Props> = ({}) => {
  return (
    <div style={{ width: "100vw", height: "100vh", textAlign: "center" }}>
      <p style={{ fontSize: 30, margin: 30 }}>
        There's something wrong :( Press "Login" to try again!
      </p>
      <img style={{ width: "30%", marginTop: 30 }} src="/images/sad.png" />
    </div>
  );
};

export default WebAuthError;
