/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useRef } from "react";
import useStory from "../hooks/useStory";
import StoryList from "../components/StoryList";

//component
import Loading from "../components/Loading";

// design
import Container from "../layouts/Container";
import InputContainer from "../layouts/InputContainer";
import Input from "../layouts/Input";
import { numOfBlog } from "../constants";

const Home = () => {
  const observer = useRef();
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { errorMessage, loading, stories, totalStories, setStories, setLoading, setNumberOfList } = useStory();

  const lastArticleRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      setHasMore(totalStories.length - stories.length * pageNumber > 0);

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore && stories.length > 10) {
          const maxNumberItem = pageNumber * numOfBlog;
          setLoading(true);
          setPageNumber(prevPageNumber => prevPageNumber + 1);
          setNumberOfList(totalStories, maxNumberItem);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, totalStories, stories.length, pageNumber, hasMore, setNumberOfList]
  );

  const onChange = value => {
    setSearchText(value);
    setLoading(true);
    setStories([]);

    if (!searchText) {
      setNumberOfList(totalStories, 1 * numOfBlog);
    }

    const searchedStories = totalStories.filter(story => {
      if (searchText && story && story?.title && story?.title.toLowerCase().includes(value.toLowerCase())) {
        return story;
      }

      return null;
    });

    setStories(searchedStories);
    setLoading(false);
  };

  return (
    <Container>
      {!loading ? (
        <InputContainer>
          <Input onChange={event => onChange(event.target.value)} placeholder="Please search here" value={searchText} />
        </InputContainer>
      ) : null}

      <StoryList stories={stories} lastArticleRef={lastArticleRef} />
      <Loading loading={loading} />
      <div>{errorMessage ? errorMessage : null}</div>
    </Container>
  );
};

export default Home;
