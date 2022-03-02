import "../styles/globals.scss";
import React from "react";
import withRedux from "next-redux-wrapper";
import { makeStore } from "redux/store";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default withRedux(makeStore)(MyApp);
