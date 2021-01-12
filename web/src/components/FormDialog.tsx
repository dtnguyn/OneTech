import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface InfoDialogProps {
  show: boolean;
  title: string;
  closeText: string;
  submitText: string;
  handleSubmit: (title: string, content: string) => void;
  handleClose: () => void;
}

const InfoDialog: React.FC<InfoDialogProps> = ({
  show,
  title,
  closeText,
  submitText,
  handleSubmit,
  handleClose,
}) => {
  const [formState, setFormState] = useState({
    title: "",
    content: "",
  });

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
        <p>Title</p>
        <input
          onChange={(event) =>
            setFormState({ ...formState, title: event.target.value })
          }
        />
        <p>Content</p>
        <textarea
          onChange={(event) =>
            setFormState({ ...formState, content: event.target.value })
          }
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          {closeText}
        </Button>
        <Button
          onClick={() => handleSubmit(formState.title, formState.content)}
        >
          {submitText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoDialog;
