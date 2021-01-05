import { title } from "process";
import Slider from "react-slick";
import { Device } from "../generated/graphql";
import styles from "../styles/Devices.module.css";
import DeviceItem from "./Devices/DeviceItem";

interface DeviceCarouselProps {
  devices: Device[];
  title: string;
}

const DeviceCarousel: React.FC<DeviceCarouselProps> = ({ devices, title }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    rows: 1,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: false,
        },
      },
    ],
  };

  return (
    <div className={styles.deviceCarouselContainer}>
      <h4 className={styles.deviceCarouselTitle}>{title}</h4>
      <Slider {...settings}>
        {devices.map((device) => (
          <div key={device.id} className={styles.deviceCarouselItem}>
            <DeviceItem key={device.id} device={device} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DeviceCarousel;
