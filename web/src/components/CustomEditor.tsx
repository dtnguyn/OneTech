import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import {
  useDeleteImagesMutation,
  useUploadImageMutation,
} from "../generated/graphql";
import styles from "../styles/CustomEditor.module.css";

interface CustomEditorProps {
  submitAllow: boolean;
  value: string;
  positiveText: string;
  handleChange: (a: string, editor: any) => void;
  handleSubmit: (images: string[]) => void;
  handleCancel: () => void;
}

const CustomEditor: React.FC<CustomEditorProps> = ({
  submitAllow,
  value,
  positiveText,
  handleChange,
  handleSubmit,
  handleCancel,
}) => {
  const [images, setImages] = useState<Array<string>>([]);
  const [uploadImageMutation, {}] = useUploadImageMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();

  const handleUploadImage = async (
    blobInfo: any,
    success: (url: string) => void,
    failure: (err: string, options?: any | undefined) => void,
    progress?: ((percent: number) => void) | undefined
  ) => {
    const imageId = "img_" + Date().toString().replaceAll(" ", "_");
    await uploadImageMutation({
      variables: {
        image: blobInfo.blob(),
        imageId,
      },
    })
      .then((res) => {
        if (res.data?.uploadImage.status) {
          images.push(imageId);
          success(res.data.uploadImage.data![0] as string);
        } else {
          failure(res.data?.uploadImage.message!);
        }
      })
      .catch((error) => {
        failure(error.message);
      });
  };

  const handleDeleteImages = (arr: Array<string>) => {
    deleteImagesMutation({
      variables: {
        imageIds: arr,
      },
    });
  };

  return (
    <div className={styles.customEditorContainer}>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_KEY}
        value={value}
        init={{
          width: "100%",
          height: 500,
          automatic_uploads: true,
          object_resizing: true,
          images_upload_handler: handleUploadImage,
          placeholder: "your post goes here...",
          plugins: [
            "advlist autolink lists link image imagetools",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount ",
          ],
          toolbar:
            "formatselect| fontselect | bold italic underline| backcolor forecolor|\
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | image | undo redo",
        }}
        onEditorChange={handleChange}
      />
      <div className={styles.customEditorButtonsContainer}>
        <Button
          onClick={() => handleSubmit(images)}
          className={styles.customEditorButton}
          variant="primary"
          disabled={!submitAllow}
        >
          {positiveText}
        </Button>
        <Button
          onClick={() => {
            handleDeleteImages(images);
            handleCancel();
          }}
          className={styles.customEditorButton}
          variant="danger"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CustomEditor;
