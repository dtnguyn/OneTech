import React from "react";

interface Props {}

const MobileAuthError: React.FC<Props> = ({}) => {
  return (
    <div style={{ width: "100vw", height: "100vh", textAlign: "center" }}>
      <p style={{ fontSize: 30, margin: 30 }}>
        Register in successfully! Press "Done" to finish!
      </p>
      <img style={{ width: "30%", marginTop: 30 }} src="/images/rocket.png" />
    </div>
  );
};

export default MobileAuthError;
