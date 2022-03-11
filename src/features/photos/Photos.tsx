import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormControl, Navbar } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchRecentPhotosAsync, selectPhotos } from "./photosSlice";
import styles from "./Photos.module.css";
import ImageModalPopup from "./modelPopup";
import InfiniteScroll from "react-infinite-scroll-component";

export function Photos() {
  const photos = useAppSelector(selectPhotos);
  const [modalShow, setModalShow] = React.useState(false);
  const [zoomedImage, setZoomedImage] = useState({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecentPhotosAsync(photos?.page + 1));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const fetchData = () => {
    dispatch(fetchRecentPhotosAsync(photos?.page + 1));
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

  const photosRendered = photos?.photo?.map((item: any) => {
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

  return (
    <div>
      <Navbar bg="dark" expand="lg">
        <Container className={styles.contentCenter}>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Container>
      </Navbar>
      <ImageModalPopup
        show={modalShow}
        onHide={() => setModalShow(false)}
        zoomedImage={zoomedImage}
      />
      <div className={styles.imagesContainer}>
        <InfiniteScroll
          dataLength={100000} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className={styles.imagesContainer}>{photosRendered}</div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
