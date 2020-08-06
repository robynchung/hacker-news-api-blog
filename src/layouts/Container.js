import React from "react";
import styled from "@emotion/styled";

const ContainerWrapper = styled.div`
  margin: 0 auto;
  width: 80%;

  @media (max-width: 1280px) {
    width: 85%;
  }

  @media (max-width: 767px) {
    padding: 0 1.5rem;
    width: 100%;
  }
`;

const Container = ({ children }) => {
  return <ContainerWrapper>{children}</ContainerWrapper>;
};

export default Container;
