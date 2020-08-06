import React from "react";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Loading = ({ loading }) => {
  if (loading)
    return (
      <LoadingWrapper>
        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/dae67631234507.564a1d230a290.gif" />
      </LoadingWrapper>
    );

  return null;
};

export default Loading;
