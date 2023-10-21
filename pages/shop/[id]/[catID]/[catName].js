import styles from "styles/Shop.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineFilePdf } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { getParentCategories } from "store/ShopSlice";
import dynamic from "next/dynamic";
const ProdcutCard = dynamic(
  () => import("components/ProdcutCard/ProdcutCard"),
  {
    loading: () => <p>Loading ...</p>,
  }
);
import Head from "next/head";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import CatSlick from "../../../../components/CatSlick/CatSlick";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const CatsProducts = ({ productsCat, Cats, MetaName, CatLength, CatIDSer }) => {
  const [dataTest, SetDataTest] = useState(productsCat);
  const [activeIcons, setActiveIcons] = useState([]);
  const [toggel, setToggel] = useState(false);
  const dispatch = useDispatch();
  const [page2, setPagenumber2] = useState(1);
  const [counter, setcounter] = useState(10);
  const router = useRouter();
  const { Url } = useSelector((state) => state.HomeSlice);
  const { MainCatsArr } = useSelector((state) => state.ShopSlice);

  useEffect(() => {
    if (!MainCatsArr) {
      dispatch(getParentCategories());
    }
  }, [MainCatsArr, dispatch]);
  useEffect(() => {
    if (dataTest.length <= 10) {
      SetDataTest(productsCat);
    }
  }, [dataTest, productsCat]);

  const getMorePost = async () => {
    setPagenumber2((state) => state + 1);
    const response = await axios
      .post(`${Url}/rest/test.product/getproductJson/`, {
        id: router.query.id,
        page: page2,
      })
      .then((res) => res.data.products);
    setcounter(response.length);
    SetDataTest((res) => [...res, ...response]);
    // console.log(counter.length);
  };
  // const [color, setColorList] = useState([]);

  // console.log(router.query)

  const getMainCats =
    MainCatsArr &&
    MainCatsArr.map((ele, idx) => {
      return (
        <li
          className={styles.fontBold}
          key={idx}
          style={{
            // style={{
            //   color: color.includes(ele.id) ? "#C72527" : "#000",
            // }}
            color: parseFloat(router.query.catID) === ele.id ? "#C72527" : "#000",
            // color: color.includes(ele.id) ? "#C72527" : "#000"
          }}
          onClick={() => {
            setToggel(false);
            setPagenumber2(1);
            // setColorList((oldArray) => [...oldArray, ele.id]);
            const PathName = ele.name.replace(/\s/g, "-");
            router.push({
              pathname: `/shop/${ele.id}/${ele.id}/${PathName}`,
            });
            SetDataTest([]);
          }}
        >
          {ele.name}
        </li>
      );
    });
  const SubCategories =
    Cats &&
    Cats.slice(1);
  // console.log(SubCategories)
  // .map((ele, idx) => {
  //   return (
  //     <div key={idx}>
  //       <div
  //         className={styles.Slick_Div_container}
  //         onClick={() => {
  //           setActiveIcons((oldArray) => [...oldArray, ele.id]);
  //           const PathName = ele.name.replace(/\s/g, "-");
  //           router.push({
  //             pathname: `/shop/${ele.id}/${ele.parentId}/${PathName}`,
  //             // query: { id: ele.id, catName: ele.name },
  //           });
  //           // dispatch(GetSubCats(ele.parentId));
  //         }}
  //       >
  //         <div className={styles.Image_container}>
  //           <Image
  //             src={`${Url}/imgs?id=${
  //               activeIcons.includes(ele.id)
  //                 ? ele.disabledIcon
  //                 : ele.activeIcon
  //             }`}
  //             alt={ele.name}
  //             width={100}
  //             height={100}
  //           />
  //         </div>
  //         <p className={styles.SlickCatName}>{ele.name}</p>
  //       </div>
  //     </div>
  //   );
  // });

  const ALlCats = Cats && (
    <div>
      <div
        className={styles.Slick_Div_container}
        onClick={() => {
          setActiveIcons((oldArray) => [...oldArray, Cats[0].id]);
          const PathName = Cats[0].name.replace(/\s/g, "-");
          router.push({
            pathname: `/shop/${router.query.catID}/${router.query.catID}/${PathName}`,
          });
        }}
      >
        <div className={styles.Image_container}>
          <Image
            src="/images/All.png"
            alt={Cats[0].name}
            width={100}
            height={100}
          />
        </div>
        <p className={styles.SlickCatName}>{Cats[0].name}</p>
      </div>
    </div>
  );
  const SlickTotal = Cats && Cats.slice(1).length;

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   slidesToShow:
  //     SlickTotalCats < 2
  //       ? 1
  //       : SlickTotalCats < 3
  //       ? 2
  //       : SlickTotalCats < 4
  //       ? 3
  //       : 4,
  //   // slidesToScroll:
  //   //   CatLength < 2 ? 1 : CatLength < 3 ? 2 : CatLength < 4 ? 3 : 4,
  //   slidesToScroll: 1,
  //   // slidesToShow: 2,
  //   speed: 500,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  //   cssEase: "linear",
  //   // swipeToSlide: true,
  //   // initialSlide: 0,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  //   rtl: false,
  //   arrows: true,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         infinite: false,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };

  const DownlodPDF = () => {
    window.open(`${Url}/PDF2/pdf.pdf?jasper=products&id=${CatIDSer}`);

    // dispatch(PDF_Print(CatIDSer))
    //   .unwrap()
    //   .then((originalPromiseResult) => {
    //     const newWIndow = window.open();
    //     if (typeof window !== "undefined") {
    //       window.open("https://www.w3schools.com");
    //       console.log(originalPromiseResult);
    //     }
    //     // console.log(originalPromiseResult)
    //     // window.open("https://deltawy.com/", "_blank");
    //   })
    //   .catch((rejectedValueOrSerializedError) => {
    //     console.log(rejectedValueOrSerializedError);
    //     // console.log(rejectedValueOrSerializedError);
    //   });
  };

  return (
    <div className={styles.shop}>
      <Head>
        <title>{MetaName}</title>
      </Head>
      <Container fluid>
        <Row>
          <Col md={3} className={styles.Cats_Header_Col}>
            <h1 className={styles.Cats_Header}>اقسام المنتجات</h1>
          </Col>
          <Col md={9}>
            <div className={styles.Search}>
              <input type="text" placeholder="البحث عن المنتجات" />
              <button onClick={() => DownlodPDF()}>
                نسخه pdf
                <AiOutlineFilePdf />
              </button>
            </div>
            <div className={styles.cats_Select}>
              <h1
                className={styles.Cats_Header}
                onClick={() => setToggel((prev) => !prev)}
              >
                التصنيفات
                <IoIosArrowDown />
              </h1>
              {toggel && (
                <div className={styles.main_cats2}>
                  <ul className={styles.ul_cats}>{getMainCats}</ul>
                </div>
              )}
            </div>
          </Col>
          <Col md={3}>
            <div className={styles.main_cats}>
              <ul className={styles.ul_cats}>{getMainCats}</ul>
            </div>
          </Col>
          <Col md={9}>
            <Row>
              <Col xs={5} md={2}>
                {CatLength > 1 && ALlCats}
              </Col>
              <Col xs={7} md={10}>
                {CatLength > 1 && (
                  <CatSlick categ={SubCategories} SlickTotalCats={SlickTotal} />
                  // <Slider {...settings}>{SubCategories}</Slider>
                )}
              </Col>
            </Row>
            {dataTest.length > 0 ? (
              <InfiniteScroll
                dataLength={dataTest.length}
                next={getMorePost}
                hasMore={true}
                hasChildren={true}
              // loader={

              // }
              >
                <Row className={styles.row_center}>
                  {dataTest.map((ele, idx) => {
                    return (
                      <Col key={idx} xs={6}
                        sm={6}
                        md={4}
                        lg={2}
                        xl={2}
                        xxl={2}>
                        <ProdcutCard
                          name={ele.name}
                          img={ele.imgs.imgs[0]}
                          id={ele.id}
                          catName={ele.catName}
                          type={"pro2"}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </InfiniteScroll>
            ) : (
              <Row className={styles.emptycenter}>
                <Col md={3}>
                  <Image
                    src="/images/empty.svg"
                    alt="login"
                    width={700}
                    height={600}
                  />
                  <h2>لا يوجد منتجات الان</h2>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
        {counter > 0 && (
          <div className={styles.ScrollLoading}>
            <div className="load-wrapp">
              <div className="load-10">
                <p>Loading...</p>
                <div className="bar"></div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CatsProducts;

export async function getServerSideProps({ params, res }) {
  // const Url = "http://192.168.0.201:8080/mohamedibrahim";
  const Url = "https://apps.mohamed-ibrahiem.com";

  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )
  const response = await axios
    .post(`${Url}/rest/test.product/getproductJson/`, {
      id: params.id,
      page: 0,
    })
    .then((res) => res.data);
  const GetCats = await axios
    .post(`${Url}/rest/test.product/getSubCategories/`, {
      id: params.catID,
    })
    .then((res) => res.data);

  return {
    props: {
      productsCat: response.products,
      Cats: GetCats.cats,
      MetaName: params.catName,
      CatIDSer: params.id,
      CatLength: GetCats.total,
    },
  };
}
