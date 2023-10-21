import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineFilePdf } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getParentCategories, searchChar, SearchDis } from "store/ShopSlice";
import styles from "styles/Shop.module.css";
// import ProdcutCard from "components/ProdcutCard/ProdcutCard";
import dynamic from "next/dynamic";
const ProdcutCard = dynamic(
  () => import("components/ProdcutCard/ProdcutCard"),
  {
    loading: () => <p>Loading ...</p>,
  }
);
import { IoIosArrowDown } from "react-icons/io";
const Shop = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPagenumber] = useState(1);
  const [search, setSearch] = useState("");
  const [color, setColorList] = useState([]);
  const [toggel, setToggel] = useState(false);
  const { MainCatsArr, searchArr } = useSelector((state) => state.ShopSlice);
  const { Url } = useSelector((state) => state.HomeSlice);

  useEffect(() => {
    if (!MainCatsArr) {
      dispatch(getParentCategories());
    }
  }, [MainCatsArr, dispatch]);

  useEffect(() => {
    if (searchArr.length <= 0) {
      const data = {
        text: " ",
        page: 0,
      };
      dispatch(SearchDis(data));
    }
  }, [dispatch, searchArr]);
  // Get Main Cats
  const getMainCats =
    MainCatsArr &&
    MainCatsArr.map((ele, idx) => {
      return (
        <li
          className={styles.fontBold}
          key={idx}
          style={{
            color: color.includes(idx) ? "#C72527" : "#000",
          }}
          onClick={() => {
            setToggel(false);
            setColorList((oldArray) => [...oldArray, idx]);
            const PathName = ele.name.replace(/\s/g, "-");
            router.push({
              pathname: `/shop/${ele.id}/${ele.id}/${PathName}`,
              // query: { id: ele.id, catName: ele.name },
            });
          }}
        >
          {ele.name}
        </li>
      );
    });

  // Search And All Products
  const SerchResult =
    searchArr.length > 0 &&
    searchArr.map((ele, idx) => {
      return (
        <Col
          className={styles.column_style}
          key={idx}
          xs={6}
          sm={6}
          md={4}
          lg={2}
          xl={2}
          xxl={2}
        >
          <ProdcutCard
            name={ele.name}
            img={ele.imgs.imgs[0]}
            id={ele.id}
            catName={ele.catName}
            type={"pro2"}
          />
        </Col>
      );
    });

  const FetchData = () => {
    setPagenumber((state) => state + 1);
    const data = {
      page,
      text: " ",
    };
    dispatch(SearchDis(data));
  };

  const SearchData = (e) => {
    if (e.length >= 1) {
      const data = {
        text: e,
        page: 0,
      };
      // console.log(e).
      setTimeout(() => {
        dispatch(SearchDis(data));
      }, 1000);
    } else {
      const data = {
        text: " ",
        page: 0,
      };

      dispatch(SearchDis(data));
      setPagenumber(1);
    }
  };

  return (
    <div className={styles.shop}>
      <Container fluid>
        <Row>
          <Col md={3} className={styles.Cats_Header_Col}>
            <h1 className={styles.Cats_Header}>اقسام المنتجات</h1>
          </Col>
          <Col md={9}>
            <div className={styles.Search}>
              <input
                type="search2"
                name="search2"
                placeholder="البحث عن المنتجات "
                id="search2"
                value={search}
                onChange={(e) => {
                  // console.log("test")
                  setSearch(e.target.value);
                  dispatch(searchChar(e.target.value));
                  SearchData(e.target.value);
                }}
              />
              <button
                name="PDFDownload"
                onClick={() => {
                  window.open(`${Url}/PDF2/pdf.pdf?jasper=products&id=0`);
                }}
              >
                نسخه pdf
                <AiOutlineFilePdf />
              </button>
            </div>

            <div className={styles.cats_Select}>
              <h2
                className={styles.Cats_Header}
                onClick={() => setToggel((prev) => !prev)}
              >
                التصنيفات
                <IoIosArrowDown />
              </h2>
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
            <InfiniteScroll
              dataLength={searchArr.length}
              next={FetchData}
              hasMore={true}
              loader={
                <div className={styles.ScrollLoading}>
                  <div className="load-wrapp">
                    <div className="load-10">
                      <p>Loading...</p>
                      <div className="bar"></div>
                    </div>
                  </div>
                </div>
              }
              // loader={<h4>Loading...</h4>}
            >
              <Row className={styles.row_center}>{SerchResult}</Row>
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Shop;
