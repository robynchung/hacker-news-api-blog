import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import grabity from "grabity";
import { numOfBlog } from "../constants";

export default function useStory() {
  const [errorMessage, setErrorMessage] = useState("");
  const [totalStories, setTotalStoryList] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const sortByDate = list => {
    return list.sort((prev, next) => next.time - prev.time);
  };

  const setNumberOfList = useCallback((storyList, numItem) => {
    let stories = [...storyList].splice(0, numItem);
    stories = sortByDate(stories);

    setStories(stories);
    setLoading(false);
  });

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
  }, [setLoading, setNumberOfList]);

  return {
    errorMessage,
    loading,
    stories,
    totalStories,
    setStories,
    setLoading,
    setNumberOfList
  };
}
