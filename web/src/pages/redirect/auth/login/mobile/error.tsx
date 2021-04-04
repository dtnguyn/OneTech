import React from "react";

interface Props {}

const MobileAuthError: React.FC<Props> = ({}) => {
  return (
    <div style={{ width: "100vw", height: "100vh", textAlign: "center" }}>
      <p style={{ fontSize: 30, margin: 30 }}>
        There's something wrong :( Press "Cancel" and try again!
      </p>
      <img style={{ width: "30%", marginTop: 30 }} src="/images/sad.png" />
    </div>
  );
};

export default MobileAuthError;
