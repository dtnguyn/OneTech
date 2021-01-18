import React, { useEffect } from "react";

interface AdBannerProps {}

const AdBanner: React.FC<AdBannerProps> = ({}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);
  return null;
};

export default AdBanner;
