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

  const lastArticleRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      setHasMore(totalStories.length - stories.length * pageNumber > 0);

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, totalStories.length, stories.length, pageNumber, hasMore]
  );

  useEffect(() => {
    setLoading(true);

    let promiseList = [];
    let storyList = [];
    let stories = [];

    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(response => response.data)
      .then(async data => {
        const maxNumberItem = pageNumber * numOfBlog;

        let initialData = [...data];

        promiseList = initialData.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(response => response.data));
        storyList = await Promise.all(promiseList);
        storyList = await getMetaObjectByUrl(storyList);
        storyList = sortByDate(storyList);

        stories = storyList.splice(0, maxNumberItem);
        setTotalStoryList(storyList);
        setStories(stories);
        setLoading(false);
      })

      .catch(error => setErrorMessage(error.message));
  }, [pageNumber]);

  const sortByDate = list => {
    return list.sort((prev, next) => next.time - prev.time);
  };

  const getMetaObjectByUrl = async storyList => {
    const addedMetaDataList = await Promise.all(
      storyList.map(async story => {
        const metaData = await grabity
          .grab(story.url)
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

    const searchedStories = totalStories.filter(story => {
      if (searchText && story["title"].includes(value)) {
        return story;
      }

      return null;
    });

    setStories(searchedStories);
    setLoading(false);
  };

  return (
    <Container>
      <input onChange={event => onChange(event.target.value)} value={searchText} />
      <StoryList stories={stories} lastArticleRef={lastArticleRef} />
      <Loading loading={loading} />

      <div>{errorMessage ? errorMessage : null}</div>
    </Container>
  );
};

export default Home;
