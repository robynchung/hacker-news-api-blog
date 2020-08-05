import React from "react";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  margin: 0 auto;
  width: 80%;

  @media (max-width: 1440px) {
    width: 85%;
  }

  @media (max-width: 767px) {
    padding: 0 1.5rem;
    width: calc(100% - 3rem);
  }
`;

const Container = ({ children }) => {
  return <ContainerWrapper>{children}</ContainerWrapper>;
};

export default Container;
