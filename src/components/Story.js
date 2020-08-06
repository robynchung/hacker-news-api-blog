import React from "react";
import moment from "moment";

import { ContentContainer, Image, ReadMore, TitleWrapper, TopicWrapper } from "../layouts/Story";
const Story = ({ story }) => {
  return (
    <>
      <Image backgroundImage={story.metaData["og:image"] || story["twitter:image"]} />

      <ContentContainer>
        <TopicWrapper>{story?.type}</TopicWrapper>
        <div>{moment.unix(story?.time).format("YYYY-MM-DD hh:mm")}</div>
        <TitleWrapper>
          <a href={story?.url} target="_blank">
            {story?.title}
          </a>
        </TitleWrapper>

        <div>
          <ReadMore href={story?.url} target="_blank">
            read this article
          </ReadMore>
        </div>
      </ContentContainer>
    </>
  );
};

export default Story;
