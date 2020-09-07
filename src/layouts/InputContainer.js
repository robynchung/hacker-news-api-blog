import React from "react";
import styled from "@emotion/styled";

const InputContainerWrapper = styled.form`
  display: flex;
  justify-content: center;
  padding: 30px;
`;

export default function InputContainer(props) {
  return <InputContainerWrapper>{props.children}</InputContainerWrapper>;
}
