import styled from "styled-components";

export const StoryWrapper = styled.div`
  border-bottom: #eee2d7 solid 2px;
  display: grid;
  grid-template-columns: 500px 1fr;
  margin-left: 4.16667%;
  padding: 2rem 0;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1440px) {
    grid-template-columns: 1fr;
    padding-left: 18.75%;
    padding-right: 18.75%;
    width: 100%;
  }

  @media (max-width: 767px) {
    margin-left: 0;
    padding-left: 0;
    padding-right: 0;
  }
`;
