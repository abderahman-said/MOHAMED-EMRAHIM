import React from "react";
import styles from "styles/MapLocation.module.css";
const MApLocation = () => {
  return (
    <>
      <iframe
        loading="lazy"
        title="map"
        src="https://maps.google.com/maps?q=30.96603893014795,31.16160786961355&z=19&output=embed"
        // frameBorder="0"
        className={styles.location}
        style={{ border: 0 }}
      ></iframe>
    </>
  );
};

export default React.memo(MApLocation);
