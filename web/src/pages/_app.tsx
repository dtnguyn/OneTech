import "../styles/globals.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import {
  Notification,
  useMeQuery,
  useNotificationsQuery,
  User,
} from "../generated/graphql";
import { AuthContext } from "../context/AuthContext";
import { client } from "../utils/withApollo";
//import NavBar from "../components/NavBar";
import withDarkMode from "next-dark-mode";
import { useDarkMode } from "next-dark-mode";
import { Router } from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import dynamic from "next/dynamic";

//Binding events.
NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const NavBar = dynamic(
  () => {
    return import("../components/NavBar");
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }: any) {
  const [user, setUser] = useState<User | null>(null);

  const { darkModeActive } = useDarkMode();

  const { data } = useMeQuery({
    variables: {},
    client: client,
  });

  useEffect(() => {
    const users = data?.me?.data as User[];
    if (users && users.length != 0) {
      setUser(users[0]);
    } else {
      setUser(null);
    }
  }, [data]);

  console.log("darkmode", darkModeActive);

  return (
    <Provider
      template={AlertTemplate}
      timeout={5000}
      position={positions.BOTTOM_CENTER}
    >
      <AuthContext.Provider value={{ user, setUser }}>
        <div className={darkModeActive ? `darkMode` : `lightMode`}>
          <NavBar />
          <Component {...pageProps} />
        </div>
      </AuthContext.Provider>
    </Provider>
  );
}

export default withDarkMode(MyApp, {});
