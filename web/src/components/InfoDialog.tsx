import React from "react";
import { Button, Modal } from "react-bootstrap";

interface InfoDialogProps {
  show: boolean;
  title: string;
  content: string;
  closeText: string;
  handleClose: () => void;
}

const InfoDialog: React.FC<InfoDialogProps> = ({
  show,
  title,
  content,
  closeText,
  handleClose,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{content}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>{closeText}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoDialog;
