import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormControl, Navbar } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchPhotosAsync, selectPhotos } from "./photosSlice";
import styles from "./Photos.module.css";
import ImageModalPopup from "./modelPopup";

export function Photos() {
  const photos = useAppSelector(selectPhotos);
  const [modalShow, setModalShow] = React.useState(false);
  const [zoomedImage, setZoomedImage] = useState({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPhotosAsync(1));
  }, [dispatch]);

  const handleOnImgClick = (e: any) => {
    const clickedImgId = e.target.id;
    const clickedImg = photos.find((item) => {
      return item.id === Number(clickedImgId);
    });
    setModalShow(true);
    setZoomedImage(clickedImg);
  };

  const photosRendered = photos?.map((item: any) => {
    return (
      <div key={item.id} className={styles.imageElmtContainer}>
        <img
          src={item.thumbnailUrl}
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
      <div className={styles.imagesContainer}>{photosRendered}</div>
    </div>
  );
}
