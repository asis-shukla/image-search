import React, { useEffect } from "react";
import { Button, Container, Form, FormControl, Navbar } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchPhotosAsync, selectPhotos } from "./photosSlice";
import styles from "./Photos.module.css";

export function Photos() {
  const photos = useAppSelector(selectPhotos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPhotosAsync(1));
  }, [dispatch]);

  console.log("The value of photos is", photos);
  const photosRendered = photos?.map((item: any) => {
    return (
      <div key={item.id} className={styles.imageElmtContainer}>
        <img src={item.thumbnailUrl} alt={item?.title} />
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
      <div className={styles.imagesContainer} >{photosRendered}</div>
    </div>
  );
}
