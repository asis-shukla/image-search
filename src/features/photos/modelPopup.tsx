import { Button, Modal } from "react-bootstrap";

interface IImageModalPopup {
  show?: boolean;
  onHide?: any;
  zoomedImage?:any;
}

function ImageModalPopup(props: IImageModalPopup) {
    const {zoomedImage} = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {zoomedImage.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={zoomedImage.url} alt="full-pictur"/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageModalPopup;
