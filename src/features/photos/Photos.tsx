import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Navbar,
  Spinner,
} from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchRecentPhotosAsync,
  selectPhotos,
  selectStatus,
  fetchPhotoBySearchText,
  photosApiStatus,
} from "./photosSlice";
import styles from "./Photos.module.css";
import ImageModalPopup from "./modelPopup";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";

export function Photos() {
  const photos = useAppSelector(selectPhotos);
  const { photo, page, pages } = photos;
  const status = useAppSelector(selectStatus);
  const [modalShow, setModalShow] = useState(false);
  const [zoomedImage, setZoomedImage] = useState({});
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecentPhotosAsync(photos?.page + 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const fetchData = () => {
    if (inputQuery.length > 0) {
      dispatch(
        fetchPhotoBySearchText({ searchText: inputQuery, page: page + 1 })
      );
    } else {
      dispatch(fetchRecentPhotosAsync(page + 1));
    }
  };

  const handleOnImgClick = (e: any) => {
    const clickedImgId = e.target.id;
    const clickedImg = photos?.photo?.find((item: any) => {
      return item.id === clickedImgId;
    });
    setModalShow(true);
    setZoomedImage(clickedImg);
  };

  const photosRendered = photo?.map((item: any) => {
    const thumbnailUrl = `https://live.staticflickr.com/${item.server}/${
      item.id
    }_${item.secret}_${"w"}.jpg`;
    return (
      <div key={item.id} className={styles.imageElmtContainer}>
        <img
          src={thumbnailUrl}
          alt={item.title}
          id={item.id}
          onClick={handleOnImgClick}
        />
      </div>
    );
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(handleDebounceFn, 800), []);

  function handleDebounceFn(inputQuery: string) {
    if (inputQuery.length > 0) {
      let storedSearches = [];
      const existingItems = localStorage.getItem("imgSearches");
      if (existingItems) {
        storedSearches = JSON.parse(existingItems);
      }
      if (!storedSearches.includes(inputQuery)) {
        localStorage.setItem(
          "imgSearches",
          JSON.stringify([inputQuery, ...storedSearches])
        );
      }

      dispatch(fetchPhotoBySearchText({ searchText: inputQuery, page: 1 }));
    }
  }

  const handleOnChange = (e: any) => {
    const searchText = e?.target?.value;
    setInputQuery(searchText);
    debounceFn(e.target.value);
  };

  const handleSuggestedItemClick = (event: any) => {
    const itmeText = event.target.outerText;
    setInputQuery(itmeText);
    debounceFn(itmeText);
  };

  const renderSuggestions = () => {
    const existingItems = localStorage.getItem("imgSearches");
    let storedSearches = [];
    if (existingItems) {
      storedSearches = JSON.parse(existingItems);
    }
    const suggestions = storedSearches;
    const renderedSuggestions = suggestions.map((item: string) => {
      return (
        <>
          <Button variant="link" onClick={handleSuggestedItemClick}>
            {item}
          </Button>
          <hr />
        </>
      );
    });
    return (
      <div className={styles.suggestions}>
        {renderedSuggestions}
        <Button
          variant="danger"
          onClick={() => {
            localStorage.clear();
            setInputQuery("");
          }}
          className={styles.clearButton}
        >
          Clear
        </Button>
      </div>
    );
  };

  const handleOnFocus = (e: any) => {
    setShowSuggestionBox(true);
  };

  const handleOnBlur = (e: any) => {
    setShowSuggestionBox(false);
  };

  return (
    <div>
      <Navbar bg="dark" expand="lg" sticky="top">
        <Container className={styles.contentCenter}>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={inputQuery}
              autoComplete={"good"}
              onChange={handleOnChange}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
            />
          </Form>
        </Container>
      </Navbar>
      {showSuggestionBox && renderSuggestions()}
      <ImageModalPopup
        show={modalShow}
        onHide={() => setModalShow(false)}
        zoomedImage={zoomedImage}
      />

      <InfiniteScroll
        dataLength={photo?.length}
        next={fetchData}
        hasMore={!(pages === page)}
        loader={null}
        endMessage={null}
        className={styles.imagesContainer}
      >
        {photosRendered}
      </InfiniteScroll>
      {status === photosApiStatus.LOADING ? (
        <Spinner animation={"border"} />
      ) : null}
      {pages === page ? (
        <div>
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        </div>
      ) : null}
    </div>
  );
}
