import React from "react";
import moment from "moment";

import styled from "styled-components";

const defaultImage = "https://www.fintros.com/assets/how-it-works-anonymous-9410b457c2f2ee0bc77fe28c21aed3df6ddb647175c2dbd78fcbff4aa3c23145.png";

const ContentContainer = styled.div`
  margin-left: 4.16667%;
`;

const Image = styled.div`
  background-image: url('${props => props.backgroundImage || defaultImage}');
  background-size: cover;
  color: #000;
  height: 28.75rem;
  width: 28.75rem;
`;

const ReadMore = styled.a`
  border-bottom: 0.125rem solid currentcolor;
  color: rgba(0, 0, 0, 0.88);
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 0.125em;
  line-height: 1;
  margin: 0px;
  padding-bottom: 0.25rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 100ms ease-in 0s;
`;

const TitleWrapper = styled.h2`
  font-weight: bold;
  margin-top: 2rem;
`;

const TopicWrapper = styled.span`
  border-bottom: 0.125rem solid transparent;
  color: rgb(204, 131, 92);
  color: rgb(204, 131, 92);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.125em;
  line-height: 1;
  margin: 0px;
  padding-bottom: 0.25rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 100ms ease-in 0s;
`;

const Story = ({ story }) => {
  return (
    <>
      <Image />

      <ContentContainer>
        <TopicWrapper>{story?.type}</TopicWrapper>
        <div>{moment.unix(story?.time).format("YYYY-MM-DD hh:mm")}</div>
        <TitleWrapper>{story?.title}</TitleWrapper>

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
