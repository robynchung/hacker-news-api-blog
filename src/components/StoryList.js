import React from "react";
import Story from "./Story";
import { StoryWrapper } from "../layouts/StoryList";

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
