import React from "react";
import styled from "styled-components";

const ContainerWrapper = styled.img`
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

const Thumbnail = ({ children }) => {
  return <ContainerWrapper>{children}</ContainerWrapper>;
};

export default Thumbnail;
