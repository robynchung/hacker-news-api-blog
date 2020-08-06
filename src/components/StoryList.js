import React from "react";
import Story from "./Story";
import styled from "styled-components";

const StoryWrapper = styled.div`
  border-bottom: #eee2d7 solid 2px;
  display: flex;
  padding: 2rem 0;

  &:last-child {
    border-bottom: none;
  }
`;

const StoryList = ({ stories, lastArticleRef }) => {
  const renderStories = () => {
    return stories.map((story, index) => {
      if (stories.length - 1 === index) {
        return (
          <StoryWrapper ref={lastArticleRef} key={index}>
            <Story story={story} />
          </StoryWrapper>
        );
      }

      return (
        <StoryWrapper key={index}>
          <Story story={story} />
        </StoryWrapper>
      );
    });
  };

  return <ul>{renderStories()}</ul>;
};

export default StoryList;
