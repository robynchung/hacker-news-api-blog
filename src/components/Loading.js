import React from "react";
import { LoadingWrapper } from "../layouts/Loading";

const Loading = ({ loading }) => {
  if (loading)
    return (
      <LoadingWrapper>
        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/dae67631234507.564a1d230a290.gif" alt="loading" />
      </LoadingWrapper>
    );

  return null;
};

export default Loading;
