import React, { Fragment, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import grabity from "grabity";
import moment from "moment";

const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [idList, setIdList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(response => response.data)
      .then(async data => {
        const maxNumberItem = pageNumber * 30;

        let initialData = [...data];
        let promiseList = [];
        let storyList = [];

        initialData = initialData.splice(maxNumberItem - 30, maxNumberItem);
        promiseList = initialData.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(response => response.data));
        storyList = await Promise.all(promiseList);

        storyList = sortByDate(storyList);

        setIdList(data);
        setStories(storyList);
      })
      .catch(error => setErrorMessage(error.message));
  }, [pageNumber]);

  const sortByDate = list => {
    return list.sort((prev, next) => prev.time - next.time);
  };

  const renderStories = () => {
    return stories.map((story, key) => {
      console.log(story.url);
      return (
        <Fragment key={key}>
          type: {story.type}
          <br />
          title: {story.title}
          <br />
          date : {moment(story.time).format("YYYY-MM-DD")}
          <br />
          url:
        </Fragment>
      );
    });
  };

  return (
    <div>
      <ul>{renderStories()}</ul>
      <button onClick={() => setPageNumber(pageNumber > 0 ? pageNumber - 1 : 0)}>prev</button>
      <button onClick={() => setPageNumber(pageNumber < idList.length ? pageNumber + 1 : idList.length)}>next</button>

      <div>{errorMessage ? errorMessage : null}</div>
      {/* <div ref={scrollRef}>ref position</div> */}
    </div>
  );
};

export default Home;
