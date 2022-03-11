import { Button, Modal } from "react-bootstrap";
import Image from "react-bootstrap/Image";

interface IImageModalPopup {
  show?: boolean;
  onHide?: any;
  zoomedImage?: any;
}

function ImageModalPopup(props: IImageModalPopup) {
  const { zoomedImage: item } = props;

  const imageURL = `https://live.staticflickr.com/${item.server}/${item.id}_${
    item.secret
  }_${"c"}.jpg`;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {item.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image fluid rounded src={imageURL} alt="full-pictur" />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageModalPopup;
