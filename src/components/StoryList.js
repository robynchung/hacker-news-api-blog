import React from "react";
import PropTypes from "prop-types";
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

StoryList.propTypes = {
  lastArticleRef: PropTypes.func.isRequired,
  stories: PropTypes.array.isRequired
};

export default StoryList;
