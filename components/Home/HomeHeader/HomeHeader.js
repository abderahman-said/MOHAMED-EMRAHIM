import Image from "next/image";
import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import styles from "styles/Home.module.css";
import { getHeaders } from "../../../store/ControlPanal";
import React from 'react'

const HomeHeader = () => {
  const { HeadersArr } = useSelector((state) => state.ControlPanal);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!HeadersArr) {
      dispatch(getHeaders());
    }
  }, [dispatch, HeadersArr]);
  const { Url } = useSelector((state) => state.HomeSlice);
  const Data =
    HeadersArr &&
    HeadersArr.map((ele, idx) => {
      return (
        <Carousel.Item key={idx}>
          <div className={styles.CarouselContainer}>
            <Image
              className="d-block"
              src={`${Url}/imgs?id=${ele.image}`}
              alt={`Slide ${ele.id}`}
              title={`Slide ${ele.id}`}
              layout="fill"
              objectFit="cover"
              // loading="lazy"
              loading="lazy"
              // loader="lazy"
              // width={1440}
              // height={400}
              // priority
            />
          </div>
        </Carousel.Item>
      );
    });
  return (
    <div className={styles.Carousel_container}>
      <Carousel>{Data}</Carousel>
    </div>
  );
};

export default HomeHeader;
