import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import Home from "./pages/Home";
import GlobalStyle from "./layouts/GlobalStyle";
import config from "./config";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={config.client}>
      <GlobalStyle />
      <Home />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
