import styles from "styles/CatSlick.module.css";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
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
import React from "react";
const CatSlick = ({ categ, SlickTotalCats }) => {
  const router = useRouter();
  const { Url } = useSelector((state) => state.HomeSlice);
  const [activeIcons, setActiveIcons] = useState([]);
// console.log(categ.length)
// console.log(categ)
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow:
      // SlickTotalCats <= 1
      //   ? 1
      //   : 
      SlickTotalCats < 2
        ? 1
        : SlickTotalCats <= 3
        ? 2
        : SlickTotalCats <= 4
        ? 3
        : SlickTotalCats <= 5
        ? 4
        : 5,
    // slidesToScroll:
    //   CatLength < 2 ? 1 : CatLength < 3 ? 2 : CatLength < 4 ? 3 : 4,
    slidesToScroll: 1,
    // slidesToShow: 2,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    // swipeToSlide: true,
    // initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    rtl: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
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
  const SubCategories =
    categ &&
    categ.map((ele, idx) => {
      const PathName = ele.name.replace(/\s/g, "-");
      return (
        <div key={idx}>
          <div
            className={styles.Slick_Div_container}
            onClick={() => {
              setActiveIcons((oldArray) => [...oldArray, ele.id]);
              const PathName = ele.name.replace(/\s/g, "-");
              router.push({
                pathname: `/shop/${ele.id}/${ele.parentId}/${PathName}`,
              });
              // dispatch(GetSubCats(ele.parentId));
            }}
          >
            {/* <Link
              href={`/shop/${ele.id}/${ele.parentId}/${ele.name.replace(
                /\s/g,
                "-"
              )}`}
              passHref
              className={styles.imageLink}
            > */}
            <div className={styles.Image_container}>
              <Image
                src={`${Url}/imgs?id=${
                  activeIcons.includes(ele.id)
                    ? ele.disabledIcon
                    : ele.activeIcon
                }`}
                alt={ele.name}
                layout={"responsive"}
                width={100}
                height={100}
              />
            </div>
            {/* </Link> */}

            <Link
              href={`/shop/${ele.id}/${ele.parentId}/${PathName}`}
              className={styles.SlickCatName}
              passHref
            >
              {ele.name}
            </Link>
          </div>
        </div>
      );
    });
  return <Slider {...settings}>{SubCategories}</Slider>;
};

export default CatSlick;
