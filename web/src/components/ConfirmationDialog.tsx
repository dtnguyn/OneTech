import React from "react";
import { Button, Modal } from "react-bootstrap";

export interface ConfirmationDialogProps {
  show: boolean;
  title: string;
  content: string;
  positiveText: string;
  negativeText: string;
  handleNegativeButtonClick: () => void;
  handlePositiveButtonClick: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  show,
  title,
  content,
  positiveText,
  negativeText,
  handleNegativeButtonClick,
  handlePositiveButtonClick,
}) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleNegativeButtonClick}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePositiveButtonClick}>
            {positiveText}
          </Button>
          <Button variant="secondary" onClick={handleNegativeButtonClick}>
            {negativeText}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfirmationDialog;
