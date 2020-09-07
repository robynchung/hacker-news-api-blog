import React from "react";
import styled from "@emotion/styled";

const InputWrapper = styled.input`
  border-radius: 5px;
  border: solid 1px #ccc;
  padding: 10px;
  width: 70%;
`;

export default function Input(props) {
  return <InputWrapper {...props} />;
}
