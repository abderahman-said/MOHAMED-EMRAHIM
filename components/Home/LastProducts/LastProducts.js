import React from "react";
import { Col } from "react-bootstrap";
import Slider from "react-slick";
// import ProdcutCard from "../../ProdcutCard/ProdcutCard";
import styels from "styles/ProductCard.module.css";
import dynamic from "next/dynamic";
// import MatgerCard from "../../MatgerCard/MatgerCard";
const ProdcutCard = dynamic(() => import("../../ProdcutCard/ProdcutCard"), {
  loading: () => <p>Loading ...</p>,
});

const MatgerCard = dynamic(() => import("../../MatgerCard/MatgerCard"), {
  loading: () => <p>Loading ...</p>,
});
const LastProducts = ({ col, list, type }) => {
  // const [slideLength, setSLideLength] = useState(4);
  // useEffect(() => {
  //   if (list) {
  //     setSLideLength(list.length);
  //   } else {
  //     setSLideLength(4);
  //   }
  // }, [list]);
  // const getLength = slideLength < 3 ? 2 : 4;
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const ListMap =
    list &&
    list.map((ele, idx) => {
      return (
        <div key={idx} className={styels.lastPro}>
          {type === "compcard" ? (
            <MatgerCard name={ele.name} img={ele.image} id={ele.id} />
          ) : (
            <ProdcutCard
              name={ele.name}
              // marketImage = {ele.}
              img={ele.imgs.imgs[0]}
              id={ele.id}
              type={type}
              catName={ele.catName}
            />
          )}
        </div>
      );
    });
  return (
    <Col md={col}>
      <Slider {...settings}>{ListMap}</Slider>
    </Col>
  );
};

export default LastProducts
