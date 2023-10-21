// import ProdcutCard from "components/ProdcutCard/ProdcutCard";
import dynamic from "next/dynamic";
const ProdcutCard = dynamic(
  () => import("components/ProdcutCard/ProdcutCard"),
  {
    loading: () => <p>Loading ...</p>,
  }
);

import React, { useEffect, useState } from "react";
import styels from "styles/ProductCard.module.css";
import { Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
const SimillerProducts = ({ col, list, type, item }) => {
  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        // className={className}
        // style={{ ...style, display: "block" }}
        className="NextArrow Arrow"
        onClick={onClick}
      >
        <MdKeyboardArrowRight />
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className={"PrevArrow Arrow"} onClick={onClick}>
        <MdKeyboardArrowLeft />
      </div>
    );
  };
  const [slideLength, setSLideLength] = useState(4);
  useEffect(() => {
    if (list) {
      setSLideLength(list.length);
    } else {
      setSLideLength(4);
    }
  }, [list]);
  const getLength = slideLength <= 3 ? 2 : slideLength <= 4 ? 4 : slideLength <=5 ? 4 : slideLength <= 6 ? 5 : 6 ;
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: getLength,
    // slidesToShow: 2,
    slidesToScroll: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    swipeToSlide: true,
    initialSlide: 0,
    rtl: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const ListMap =
    list &&
    list.map((ele, idx) => {
      return (
        <div key={idx} className={styels.lastPro} aria-hidden="true">
          <ProdcutCard
            name={ele.name}
            img={ele.imgs.imgs[0]}
            id={ele.id}
            type={type}
            catName ={ele.catName}

          />
        </div>
      );
    });

  // const SmallProducts =
  //   list &&
  //   list.map((ele, idx) => {
  //     return (
  //       <Col md={3} key={idx} className={styels.lastPro}>
  //         <ProdcutCard
  //           name={ele.name}
  //           img={ele.image}
  //           id={ele.id}
  //           type={type}
  //           catName ={ele.catName}
  //         />
  //       </Col>
  //     );
  //   });
  return (
    <Col md={col}>
      
      <Slider {...settings}>{ListMap}</Slider>
      {/* {list && list.length > 3 ? (
    
    
      ) : (
        <Row className={styels.center}>{SmallProducts}</Row>
      )} */}
    </Col>
  );
};

export default SimillerProducts;
