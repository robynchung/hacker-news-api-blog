import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import grabity from "grabity";
import moment from "moment";

import Container from "../layouts/Container";

import { numOfBlog } from "../constants";

const Home = () => {
  const scrollRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [idList, setIdList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [stories, setStories] = useState([]);
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  useEffect(() => {
    setSpinnerLoading(true);
    scrollRef.current.scrollIntoView({ behavior: "smooth" });

    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(response => response.data)
      .then(async data => {
        const maxNumberItem = pageNumber * numOfBlog;

        let initialData = [...data];
        let promiseList = [];
        let storyList = [];

        initialData = initialData.splice(maxNumberItem - 30, maxNumberItem);
        promiseList = initialData.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(response => response.data));
        storyList = await Promise.all(promiseList);
        storyList = await getMetaObjectByUrl(storyList);
        storyList = sortByDate(storyList);

        setIdList(data);
        setStories(storyList);
        setSpinnerLoading(false);
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
    return stories.map((story, key) => {
      return (
        <Fragment key={key}>
          type: {story.type}
          <br />
          title: {story.title}
          <br />
          date : {moment.unix(story.time).format()}
          <br />
          url: {story.metaData && typeof story.metaData === "object" ? story.url : story.metaData}
          <br />
        </Fragment>
      );
    });
  };

  console.log(scrollRef);

  return (
    <Container>
      <ul>{renderStories()}</ul>
      <h1>{spinnerLoading ? "spinnerLoading" : null}</h1>
      <button onClick={() => setPageNumber(pageNumber > 0 ? pageNumber - 1 : 0)}>prev</button>
      <button onClick={() => setPageNumber(pageNumber < idList.length ? pageNumber + 1 : idList.length)}>next</button>

      <div>{errorMessage ? errorMessage : null}</div>
      <div ref={scrollRef}>ref position</div>
    </Container>
  );
};

export default Home;
