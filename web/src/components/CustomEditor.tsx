import { Editor } from "@tinymce/tinymce-react";
import { fail } from "assert";
import { useEffect, useRef, useState } from "react";
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
    //   console.log("blob", blobInfo);
    //   const imageDir = `images/${blobInfo.id()}`;
    //   const uploadTask = storage.ref().child(imageDir).put(blobInfo.blob());
    //   uploadTask.on(
    //     "state_changed",
    //     function (snapshot) {
    //       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       console.log("Upload is " + progress + "% done");
    //     },
    //     function (error) {
    //       failure("Error: " + error.message);
    //     },
    //     function () {
    //       uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
    //         console.log("File available at", downloadURL);
    //         setImages([...images, imageDir]);
    //         success(downloadURL);
    //       });
    //     }
    //   );

    await uploadImageMutation({
      variables: {
        image: blobInfo.base64(),
        imageId: blobInfo.id(),
      },
    }).then((res) => {
      if (res.data?.uploadImage.status) {
        images.push(blobInfo.id());
        success(res.data.uploadImage.data![0] as string);
      } else {
        failure(res.data?.uploadImage.message!);
      }
    });
  };

  const handleDeleteImages = (arr: Array<string>) => {
    console.log(arr);
    deleteImagesMutation({
      variables: {
        imageIds: arr,
      },
    });
  };

  // window.onbeforeunload = () => {
  //   console.log("Stop this");
  //   handleDeleteImages(images);
  // };

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
            "advlist autolink lists link image imagetools imageresize",
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
