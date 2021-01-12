import { Divider } from "@material-ui/core";
import parse from "html-react-parser";
import moment from "moment";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { Review, ReviewRating } from "../../generated/graphql";
import styles from "../../styles/DeviceDetail.module.css";
import SpecsTable from "./SpecsTable";

interface ReviewItemProps {
  review: Review;
  handleEdit: (review: Review) => void;
  handleDelete: (id: string, images: string[]) => void;
  handleReport: (id: string) => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  handleEdit,
  handleDelete,
  handleReport,
}) => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div>
      <div className={styles.reviewContainer}>
        <div
          className={styles.reviewHeaderContainer}
          onClick={() => router.push(`/user/${review.author.id}`)}
        >
          <img src={review.author.avatar} className={styles.postAvatar} />
          <div className={styles.reviewHeaderTextContainer}>
            <p className={styles.reviewAuthorName}>{review.author.username}</p>
            <p className={styles.postDate}>
              {moment(review.createdAt).format("LL")}
            </p>
          </div>
        </div>
        <div className={`row flex-row-reverse`}>
          <div className={`col-lg-7 col-md-12`}>
            <SpecsTable
              switchState="rating"
              category="phone"
              rating={review.rating}
            />
          </div>
          <div
            className={`col-lg-5 col-md-12 ` + styles.reviewContentContainer}
          >
            <h5 className={styles.reviewTitle}>{review.title}</h5>
            {parse(review.content)}
          </div>
        </div>
        <div className={styles.postItemButtonsContainer}>
          <img
            src="/images/flag.png"
            className={styles.postItemButton}
            onClick={() => {
              handleReport(review.id);
            }}
          />
          {user?.id === review.author?.id ? (
            <div>
              <img
                src="/images/trash.png"
                className={styles.postItemButton}
                onClick={() => {
                  const images = review.images?.map((image) => {
                    return image.path;
                  });
                  console.log("images", images);
                  handleDelete(review.id, images ? images : []);
                }}
              />
              <img
                src="/images/pencil.png"
                className={styles.postItemButton}
                onClick={() => {
                  handleEdit(review);
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
      <br />
      <div className="divider" />
      <br />
    </div>
  );
};

export default ReviewItem;
