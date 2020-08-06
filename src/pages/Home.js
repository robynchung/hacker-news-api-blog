/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect, useRef } from "react";
import axios from "axios";
import grabity from "grabity";
import StoryList from "../components/StoryList";

//component
import Loading from "../components/Loading";

// design
import Container from "../layouts/Container";
import { numOfBlog } from "../constants";

const Home = () => {
  const observer = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [totalStories, setTotalStoryList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [searchText, setSearchText] = useState("");

  const sortByDate = list => {
    return list.sort((prev, next) => next.time - prev.time);
  };

  const setNumberOfList = useCallback((storyList, numItem) => {
    let stories = [...storyList].splice(0, numItem);
    stories = sortByDate(stories);

    setStories(stories);
    setLoading(false);
  });

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

  useEffect(() => {
    setLoading(true);

    const maxNumberItem = 1 * numOfBlog;
    let promiseList = [];
    let storyList = [];

    axios
      .get("https://hacker-news.firebaseio.com/v0/newstories.json")
      .then(response => response.data)
      .then(async data => {
        let initialData = [...data];

        promiseList = initialData.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(response => response.data));
        storyList = await Promise.all(promiseList);
        storyList = await getMetaObjectByUrl(storyList);

        setTotalStoryList(storyList);
        setNumberOfList(storyList, maxNumberItem);
      })
      .catch(error => setErrorMessage(error.message));
  }, []);

  const getMetaObjectByUrl = async storyList => {
    const addedMetaDataList = await Promise.all(
      storyList.map(async story => {
        const metaData = await grabity
          .grab(story?.url)
          .then(response => {
            return response;
          })
          .catch(error => error.message);

        return { ...story, metaData };
      })
    );

    return addedMetaDataList;
  };

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
      {!loading ? <input onChange={event => onChange(event.target.value)} placeholder="Please search here" value={searchText} /> : null}
      <StoryList stories={stories} lastArticleRef={lastArticleRef} />
      <Loading loading={loading} />
      <div>{errorMessage ? errorMessage : null}</div>
    </Container>
  );
};

export default Home;
