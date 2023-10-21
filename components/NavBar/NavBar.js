import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchChar, SearchDis } from "store/ShopSlice";
import styles from "styles/Navbar.module.css";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { TbMessages } from "react-icons/tb";
import { SlLogin } from "react-icons/sl";
import {
  AiOutlineHome,
  AiOutlineQuestionCircle,
  AiFillShop,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RiMenu4Line } from "react-icons/ri";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Logout } from "store/AuthSlice";

const options = [
  {
    scroll: true,
    backdrop: true,
  },
];
function OffCanvasExample({ ...props }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  ;
  const Log =
    typeof window !== "undefined" &&
      window.localStorage.getItem("ib_ID") === "0" ? (
      <Link href={"/auth"}>
        <a
          className={router.pathname === "/auth" ? styles.active : styles.link2}
        >
          تسجيل الدخول
          <SlLogin />
        </a>
      </Link>
    ) : (
      <Link href={"/"}>
        <a
          onClick={() => {
            dispatch(Logout());
          }}
          className={router.pathname === "/auth" ? styles.active : styles.link2}
        >
          تسجيل الخروج
          <SlLogin />
        </a>
      </Link>
    );

  return (
    <div className={styles.OffCanv_container}>
      <button
        onClick={toggleShow}
        className={styles.mobileButton}
        name="navbar"
        type="button"
        aria-label="navbar"
      >
        <RiMenu4Line className={styles.mobileIcon} />
      </button>
      <Offcanvas
        show={show}
        className="dallel-canves"
        onHide={handleClose}
        {...props}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>القائمة</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className={styles.Link_Nav2}>
            <Link href={"/"}>
              <a
                className={
                  router.pathname === "/" ? styles.active : styles.link2
                }
              >
                الرئيسية
                <AiOutlineHome />
              </a>
            </Link>
            <Link href={"/about"}>
              <a
                className={
                  router.pathname === "/about" ? styles.active : styles.link2
                }
              >
                من نحن <AiOutlineQuestionCircle />
              </a>
            </Link>
            <Link href={"/shop"}>
              <a
                className={
                  router.pathname === "/shop" ? styles.active : styles.link2
                }
              >
                المتجر
                <AiFillShop />
              </a>
            </Link>
            <Link href={"/contact"}>
              <a
                className={
                  router.pathname === "/contact" ? styles.active : styles.link2
                }
              >
                تواصل معنا
                <TbMessages />
              </a>
            </Link>

            {Log}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

const NavBar = () => {
  const dispatch = useDispatch();
  const { searchArr, CartsArr } = useSelector((state) => state.ShopSlice);
  const { Url } = useSelector((state) => state.HomeSlice);
  // const { userInfo } = useSelector((state) => state.AuthSlice);
  const router = useRouter();
  const [toggelSearch, setToggleSearch] = useState(false);
  // const [shadow, setShadow] = useState(null);
  // const [color, setColor] = useState(null);
  const [search, setSearch] = useState("");
  const [max, setMax] = useState(0);
  useEffect(() => {
    setMax(window.innerWidth);
  }, [max])
  const handleScroll = () => {
    if (window.scrollY >= 100) {
      // setShadow({
      //   boxShadow: "0 3px 12px #27262624",
      //   backgroundColor: "#ffffff",
      // });
      // setColor({
      //   color: "#000",
      // });
      document.getElementById("Search_bar").style.display = "none";
    } else {
      document.getElementById("Search_bar").style.display = "block";
      // setShadow({
      //   boxShadow: "0 3px 12px #27262624",
      //   backgroundColor: "#ffffff",
      // });
      // setColor({
      //   color: "#fff",
      // });
    }
  };
  useEffect(() => {
    if (router.pathname === "/") {
      window.addEventListener("scroll", handleScroll, { passive: false });
    }
    return () => {
      window.removeEventListener("scroll", handleScroll, { passive: false });
    };
  }, [router.pathname]);

  const handleScroll2 = () => {
    if (window.scrollY >= 100) {
      document.getElementById("Search_bar").style.display = "none";
    } else {
      document.getElementById("Search_bar").style.display = "block";
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll2, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll2, { passive: false });
    };
  }, []);

  const SearchData = (e) => {
    if (e.length >= 1) {
      const data = {
        text: e,
        page: 0,
      };
      dispatch(SearchDis(data));
    } else {
      const data = {
        text: " ",
        page: 0,
      };
      dispatch(SearchDis(data));
    }
  };

  const SerchResult =
    searchArr &&
    searchArr.slice(0, 5).map((ele, idx) => {
      return (
        <li
          key={idx}
          className={styles.srarch_li}
          onClick={() => {
            const PathName = ele.name.replace(/\s/g, "-");
            setToggleSearch(false);
            router.push({
              pathname: `/product/${ele.id}/${PathName}`,
              // query: { id: ele.id, productName: ele.name },
            });
          }}
        >
          <p>{ele.name}</p>
          <Image
            src={`${Url}/imgs?id=${ele.images[0]}`}
            alt={ele.name}
            width={50}
            height={50}
            layout="responsive"
            loading="lazy"

          />
        </li>
      );
    });
  return (
    <Container>
      <nav
        // style={{ ...shadow }}
        className={`${styles.navbar} ${router.pathname === "/" ? styles.nav1 : styles.nav2} `}
      >
        <Row className={styles.center}>
          <Col xs={4} className={styles.offCan}>
            {options.map((props, idx) => (
              <OffCanvasExample key={idx} placement={"end"} {...props} />
            ))}
          </Col>
          <Col xs={4} md={3}>
            <div
              className={styles.NavLogo}
              onClick={() => {
                router.push({
                  pathname: `/`,
                });
              }}
            >
              <Image
                src={"/images/mlogo.webp"}
                alt="mohamed"
                width={217}
                height={100}
                layout="responsive"
                // loading="lazy"
                priority
              />
            </div>
          </Col>
          <Col sm={6} md={5} className={styles.search_Col}>
            <div className={styles.Search} id="Search_bar">
              <form className={styles.input_div}>
                <input
                  type="search"
                  name="search"
                  placeholder="البحث عن المنتجات "
                  id="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setTimeout(() => {
                      dispatch(searchChar(e.target.value));
                      SearchData(e.target.value);
                    }, 1000);
                    setToggleSearch(true);
                  }}
                />
                <button
                  name="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/shop");
                  }}
                  type="submit"
                  aria-label="submit"
                >
                  {" "}
                  <AiOutlineSearch />
                </button>
              </form>

              <div className={styles.searchResult}>
                {search.length > 0 &&
                  searchArr &&
                  searchArr.length &&
                  toggelSearch > 0 && <ul>{SerchResult}</ul>}
              </div>
            </div>

            <div className={styles.Links}>
              <Link href={"/"}>
                <a

                  className={
                    router.pathname === "/" ? styles.active : styles.link
                  }
                >
                  الرئيسية
                </a>
              </Link>
              <Link href={"/shop"}>
                <a

                  className={
                    router.pathname === "/shop" ? styles.active : styles.link
                  }
                >
                  المتجر
                </a>
              </Link>
              <Link href={"/about"}>
                <a

                  className={
                    router.pathname === "/about" ? styles.active : styles.link
                  }
                >
                  من نحن{" "}
                </a>
              </Link>
              <Link href={"/contact"}>
                <a

                  className={
                    router.pathname === "/contact" ? styles.active : styles.link
                  }
                >
                  تواصل معنا
                </a>
              </Link>
            </div>
          </Col>
          <Col xs={4} md={3}>
            <div className={styles.icons}>
              <span className={styles.span_div}>
                <IoIosNotificationsOutline />
                <span>0</span>
              </span>{" "}
              <span
                className={styles.span_div}
                onClick={() => {
                  if (
                    window.localStorage.getItem("ib_Admin") &&
                    window.localStorage.getItem("ib_Admin") === "false"
                  ) {
                    router.push("/cp");
                  } else if (
                    window.localStorage.getItem("ib_Admin") === "true" &&
                    window.localStorage.getItem("ib_pass") === "5702" &&
                    window.localStorage.getItem("ib_Name") === "admin" &&
                    window.localStorage.getItem("ib_ID") === "2"
                  ) {
                    router.push("/mcp/products");
                  } else {
                    router.push("/auth");
                  }
                }}
              >
                <BsPerson />
              </span>
              <span
                onClick={() => router.push("/cart")}
                className={styles.span_div}
              >
                <AiOutlineShoppingCart />
                <span>{CartsArr ? CartsArr.lines.length : 0}</span>
              </span>
              {max >= 700 && (
                <>
                  <span
                    // onClick={() => router.push("/cart")}
                    className={styles.span_div}
                  >
                    <a
                      aria-label="our android application"
                      href={`https://play.google.com/store/apps/details?id=com.deltawy.mansour_app`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={"/images/google-play.webp"}
                        alt="google_play"
                        width={35}
                        height={35}
                        title="google_play"
                        priority
                      />
                    </a>
                  </span>
                  <span className={styles.span_div}>
                    <a
                      aria-label="our ios application"
                      href={"https://apps.apple.com/us/app/mansourapp/id6444230336"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={"/images/app-store.webp"}
                        alt="App Store"
                        width={35}
                        height={35}
                        title="App Store"
                        priority
                      />
                    </a>
                  </span></>
              )}
            </div>
          </Col>
        </Row>
      </nav>
    </Container>
  );
};

export default NavBar;
