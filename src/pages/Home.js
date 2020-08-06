import React, { useCallback, useState, useEffect, useRef } from "react";
import axios from "axios";
import grabity from "grabity";
import moment from "moment";
import Container from "../layouts/Container";
import { numOfBlog } from "../constants";

const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [totalStories, setTotalStoryList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef();
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

  const renderStories = () => {
    return stories.map((story, index) => {
      console.log(stories.length, index);
      if (stories.length - 1 === index) {
        return (
          <div ref={lastArticleRef} key={index}>
            ref --------------------------------------- type: {story.type}
            <br />
            title: {story.title}
            <br />
            date : {moment.unix(story.time).format()}
            <br />
            url: {story.metaData && typeof story.metaData === "object" ? story.url : story.metaData}
            <br />
          </div>
        );
      }

      return (
        <div key={index}>
          type: {story.type}
          <br />
          title: {story.title}
          <br />
          date : {moment.unix(story.time).format()}
          <br />
          url: {story.metaData && typeof story.metaData === "object" ? story.url : story.metaData}
          <br />
        </div>
      );
    });
  };

  return (
    <Container>
      <ul>{renderStories()}</ul>
      <h1>{loading && "spinnerLoading"}</h1>

      <div>{errorMessage ? errorMessage : null}</div>
    </Container>
  );
};

export default Home;
