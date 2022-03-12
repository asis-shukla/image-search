import React, { useEffect, useState } from "react";
import { Container, Form, FormControl, Navbar, Spinner } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchRecentPhotosAsync, selectPhotos, selectStatus, fetchPhotoBySearchText } from "./photosSlice";
import styles from "./Photos.module.css";
import ImageModalPopup from "./modelPopup";
import InfiniteScroll from "react-infinite-scroll-component";

export function Photos() {
  const photos = useAppSelector(selectPhotos);
  const {photo, page} = photos;
  const status = useAppSelector(selectStatus);
  const [modalShow, setModalShow] = React.useState(false);
  const [zoomedImage, setZoomedImage] = useState({});
  const [inputQuery, setInputQuery] = useState("");
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchRecentPhotosAsync(photos?.page + 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const fetchData = () => {
    if (inputQuery.length > 0) {
      dispatch(fetchPhotoBySearchText({searchText: inputQuery, page : page + 1}));
    } else {
      dispatch(fetchRecentPhotosAsync(page + 1));  
    }
    
  };

  console.log("photos is", photos);

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
          alt={item?.title}
          id={item.id}
          onClick={handleOnImgClick}
        />
      </div>
    );
  });

  const handleOnChange = (e:any) => {
    const searchText = e.target.value;
    setInputQuery(searchText);
    dispatch(fetchPhotoBySearchText({searchText: searchText, page : 1}));
  }

  console.log("status is sadsad", status);

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
              onChange={handleOnChange}
            />
          </Form>
        </Container>
      </Navbar>
      <ImageModalPopup
        show={modalShow}
        onHide={() => setModalShow(false)}
        zoomedImage={zoomedImage}
      />

      <InfiniteScroll
        dataLength={photo?.length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={null}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        className={styles.imagesContainer}
      >
        {photosRendered}
      </InfiniteScroll>
      {status === "loading" ? <Spinner animation={"border"}/> : null}
    </div>
  );
}
