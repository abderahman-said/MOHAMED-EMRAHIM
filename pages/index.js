import React, { useEffect } from "react";
import { DeferredContent } from "primereact/deferredcontent";
import { Container, Row } from "react-bootstrap";
import styles from "styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getClients,
  getMostViewed,
  getLastproductJson,
  getBanners,
} from "store/HomeSlice";
import { getCarts, getParentCategories } from "store/ShopSlice";
import dynamic from "next/dynamic";

// import CatSlick from "components/CatSlick/CatSlick";
// import { getBanners } from "../store/HomeSlice";
const SelectProducts = dynamic(
  () => import("components/Home/SelectProducts/SelectProducts"),
  { loading: () => <p>Loading ...</p> }
);
const MApLocation = dynamic(
  () => import("components/MapLocation/MapLocation"),
  { loading: () => <p>Loading ...</p> }
);
const CatSlick = dynamic(() => import("components/CatSlick/CatSlick"), {
  loading: () => <p>Loading ...</p>,
});
const LastProducts = dynamic(
  () => import("components/Home/LastProducts/LastProducts"),
  { loading: () => <p>Loading ...</p> }
);

// const MatgersBanners = dynamic(
//   () => import("components/Home/MatgersBanners/MatgersBanners"),
//   { loading: () => <p>Loading ...</p> }
// );
// import "aos/dist/aos.css";
// import AOS from "aos";

const HomeHeader = dynamic(
  () => import("components/Home/HomeHeader/HomeHeader.js"),
  { loading: () => <p>Loading ...</p> }
);
function Home() {
  const dispatch = useDispatch();
  const {
    ClientsArr,
    MostViewedArr,
    LastproductJsonArr,
    BannersArr,
    // Url,
    // HeaderBannersArr,
  } = useSelector((state) => state.HomeSlice);
  const { CartsArr, MainCatsArr } = useSelector((state) => state.ShopSlice);
  // useEffect(() => {
  //   AOS.init({
  //     duration: 700,
  //     delay: 10,
  //     once: true,
  //   });
  // }, []);
  useEffect(() => {
    const UserId = window.localStorage.getItem("ib_ID") || 0;
    if (!CartsArr) {
      dispatch(getCarts(UserId));
    }
  }, [dispatch, CartsArr]);

  const onDataLoad = () => {
    if (!LastproductJsonArr) {
      dispatch(getLastproductJson());
    }
  };

  const onMostViewedLoad = () => {
    if (!MostViewedArr) {
      dispatch(getMostViewed());
    }
  };
  const onClientsLoad = () => {
    if (!ClientsArr) {
      dispatch(getClients());
    }
  };
  const onCatLoad = () => {
    if (!MainCatsArr) {
      dispatch(getParentCategories());
    }
  };
  const getHomeBanars = () => {
    if (!BannersArr) {
      dispatch(getBanners());
    }
  };

  return (
    <>
      {/* <div style={{ minHeight: "400px"  , maxHeight: "50vh"}}> */}
      <HomeHeader />
      {/* </div> */}
      <div className={styles.container}>
        <Container>
          <h1 className="text-center ">التصنيفات</h1>

          <div style={{ minHeight: "300px" }}>
            <DeferredContent onLoad={() => onCatLoad()}>
              {MainCatsArr && (
                <CatSlick
                  categ={MainCatsArr}
                  SlickTotalCats={MainCatsArr.length}
                />
              )}
            </DeferredContent>
          </div>

          <DeferredContent onLoad={() => getHomeBanars()}>
            {BannersArr  && BannersArr.length > 0 && (
              <div style={{ minHeight: "800px" }}>
                {BannersArr.map((ele, idx) => {
                  return (
                    <div style={{ minHeight: "500px" }} key={idx}>
                      <SelectProducts Banar={ele} />
                    </div>
                  );
                })}
              </div>
            )}
          </DeferredContent>

          <hr />
          <div
            style={{ minHeight: "350px" }}
            // data-aos="flip-up"
            // data-aos-easing="ease-in-out"
            // data-aos-mirror="true"
            // data-aos-once="true"
            // data-aos-anchor-placement="top-center"
          >
            <DeferredContent onLoad={() => onDataLoad()}>
              {LastproductJsonArr && (
                <Row>
                  <h2> اخر المنتجات</h2>
                  <LastProducts
                    list={LastproductJsonArr}
                    col={12}
                    type={"pro"}
                  />
                </Row>
              )}
            </DeferredContent>
          </div>
          <div
            style={{ minHeight: "350px" }}
            // data-aos="flip-up"
            // data-aos-easing="ease-in-out"
            // data-aos-mirror="true"
            // data-aos-once="true"
            // data-aos-anchor-placement="top-center"
          >
            <DeferredContent onLoad={() => onMostViewedLoad()}>
              {MostViewedArr && (
                <Row>
                  <h2> الاكثر مشاهده</h2>
                  <LastProducts list={MostViewedArr} col={12} type={"pro"} />
                </Row>
              )}
            </DeferredContent>
          </div>
          {/* <Col md={3} className={styles.CenterCol}>
                <div
                  className={styles.MainCatBackgound}
                  style={{
                    backgroundColor: `#39D5CF`,
                  }}
                >
                  <h2> شركات نتعامل معها</h2>
                </div>
              </Col> */}
          <div
            style={{ minHeight: "300px" }}
            // data-aos="flip-up"
            // data-aos-easing="ease-in-out"
            // data-aos-mirror="true"
            // data-aos-once="true"
            // data-aos-anchor-placement="top-center"
          >
            <DeferredContent onLoad={() => onClientsLoad()}>
              <Row>
                <h2> شركات نتعامل معها</h2>
                <LastProducts list={ClientsArr} col={12} type={"compcard"} />
              </Row>
            </DeferredContent>
          </div>
        </Container>
        <DeferredContent>
          <MApLocation />
        </DeferredContent>
      </div>
    </>
  );
}

export default Home;
