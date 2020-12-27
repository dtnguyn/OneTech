import "../styles/globals.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { useMeQuery, User } from "../generated/graphql";
import { AuthContext } from "../context/AuthContext";
import { client } from "../utils/withApollo";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }: any) {
  const [user, setUser] = useState<User | null>(null);

  const { data } = useMeQuery({
    variables: {},
    client: client,
  });

  useEffect(() => {
    const users = data?.me?.data as User[];
    if (users && users.length != 0) {
      setUser(users[0]);
      console.log(users[0]);
    } else {
      setUser(null);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavBar />
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
