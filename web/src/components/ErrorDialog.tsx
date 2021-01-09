interface ErrorDialogProps {
  show: boolean;
  message: string;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ show, message }) => {
  if (!show) return null;
};

export default ErrorDialog;
