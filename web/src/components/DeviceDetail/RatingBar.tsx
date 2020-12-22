import styles from "../../styles/DeviceDetail.module.css";

interface RatingBarProps {
  rating: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ rating }) => {
  const handleRatingBarColor = (number: number) => {
    if (number > 80) {
      return "#9bc72b";
    } else if (number > 60) {
      return "#a8d8ad";
    } else if (number > 40) {
      return "#f3e70a";
    } else if (number > 20) {
      return "#c65151";
    } else {
      return "#ca241c";
    }
  };

  return (
    <div
      className={styles.ratingBar}
      style={{
        width: `${rating * 10}%`,
        backgroundColor: handleRatingBarColor(rating * 10),
      }}
    >
      {rating}
    </div>
  );
};

export default RatingBar;
