import { Col, Container, Row } from "react-bootstrap";
import styels from "styles/Footer.module.css";
import { IoLogoWhatsapp } from "react-icons/io";
import { SiMessenger } from "react-icons/si";
import { FaFacebookF, FaOpencart } from "react-icons/fa";
import { BsPerson, BsTelephoneFill } from "react-icons/bs";
import { AiOutlineHome, AiFillShop } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSiteJson } from "store/ControlPanal";
import React from 'react';
import src2 from "../../public/images/deltawy.webp"
const Footer = () => {
  const router = useRouter();
  // const src2 = "";
  const { SiteJsonArr } = useSelector((state) => state.ControlPanal);
  const [phone, setPhone] = useState("");
  const [face, setFace] = useState("");
  const [whats, setWhats] = useState("");
  const [messenger, setMessanger] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!SiteJsonArr) {
      dispatch(getSiteJson())
        .unwrap()
        .then((data) => {
          setFace(data.face);
          setWhats(data.whats);
          setMessanger(data.messenger);
          setPhone(data.phone);
        });
    } else {
      setFace(SiteJsonArr.face);
      setWhats(SiteJsonArr.whats);
      setMessanger(SiteJsonArr.messenger);
      setPhone(SiteJsonArr.phone);
    }
  }, [SiteJsonArr, dispatch]);
  return (
    <footer className={styels.footer}>
      <Container fluid>
        <Row>
          <Col md={3} className={styels.column_footer}>
            <ul>
              <li>
                <Image
                  src={"/images/mlogo.webp"}
                  alt="mohamed"
                  width={130}
                  height={60}
                />
              </li>
              <li>
                <p>
                  تأسست شركه منصور لتجاره وتوزيع الأدوات الكهربائية والمعروفة
                  بشركه ( محمد إبراهيم ) نسبه لصاحبها عام 1995 في مدينه المحلة
                  الكبرى
                </p>
              </li>
            </ul>
          </Col>
          <Col md={3} className={styels.column_footer}>
            <ul>
              <li>
                {" "}
                <Link href={"/"}> الرئيسية </Link>{" "}
              </li>
              <li>
                {" "}
                <Link href={"/shop"}>كل المنتجات</Link>{" "}
              </li>
              <li>
                {" "}
                <Link href={"/about"}>من نحن</Link>
              </li>
              <li>
                {" "}
                <Link href={"/contact"}> تواصل معنا </Link>
              </li>
            </ul>
          </Col>
          <Col md={3} className={styels.column_footer}>
            <ul>
              <li>
                <p>اتصل بنا</p>
              </li>
              <li>
                <a
                  aria-label="our phone number"
                  href={`tel:${phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{phone}</span>
                  <BsTelephoneFill />
                </a>
              </li>
              <li>
                <span>
                  <a
                    href={`${face}`}
                    aria-label="our facebook page"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF />
                  </a>
                </span>
                <span>
                  <a
                    aria-label="our messanger chat"
                    href={`${messenger}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiMessenger />
                  </a>
                </span>
                <span>
                  <a
                    aria-label="our whatsapp number"
                    href={`https://wa.me/${whats}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoLogoWhatsapp />
                  </a>
                </span>
              </li>
            </ul>
          </Col>
          <Col md={3} className={styels.column_footer}>
            <ul>
              <li>
                <p>حمل التطبيق</p>
              </li>
              <li className={styels.apps}>
                <span>
                  <a
                    aria-label="our android application"
                    href={`https://play.google.com/store/apps/details?id=com.deltawy.mansour_app`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={"/images/google-play.webp"}
                      alt="google_play"
                      width={50}
                      height={50}
                      // layout="responsive"
                      title="google_play"
                    />
                  </a>
                </span>
                <span>
                  <a
                    aria-label="our ios application"
                    href={
                      "https://apps.apple.com/us/app/mansourapp/id6444230336"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={"/images/app-store.webp"}
                      alt="App Store"
                      width={50}
                      height={50}
                      title="App Store"
                    // layout="fill"
                    />
                  </a>
                </span>
              </li>
            </ul>
          </Col>
        </Row>
        <div className={styels.rights_container}>
          <h3 className={styels.rights}>جميع الحقوق محفوظة لدي</h3>
          <a
            className={styels.rights_logo}
            href="https://deltawy.com/"
            // target="_blank"
          >
            {" "}
            <Image
              width={100}
              height={100}
              src={src2}
              title="شركة دلتاوي"
              alt="تصميم و برمجة شركة دلتاوي للبرمجيات وتصميم المواقع و تطبيقات الموبايل"
            />
          </a>
        </div>
      </Container>
      <div className={styels.nav_Footer}>
        <Link href={"/"}>
          <a
            // style={{ ...color }}
            className={router.pathname === "/" ? styels.active : styels.link2}
          >
            الرئيسية
            <AiOutlineHome />
          </a>
        </Link>
        <Link href={"/auth"}>
          <a
            // style={{ ...color }}
            className={
              router.pathname === "/auth" ? styels.active : styels.link2
            }
          >
            حسابي
            <BsPerson />
          </a>
        </Link>
        <Link href={"/shop"}>
          <a
            // style={{ ...color }}
            className={
              router.pathname === "/shop" ? styels.active : styels.link2
            }
          >
            كل المنتجات
            <AiFillShop />
          </a>
        </Link>
        <Link href={"/cart"}>
          <a
            // style={{ ...color }}
            className={
              router.pathname === "/cart" ? styels.active : styels.link2
            }
          >
            عربة التسوق
            <FaOpencart />
          </a>
        </Link>
        <div className={styels.contact_Nav_Btn}>
          <span>
            <a
              aria-label="our phone number"
              href={`tel:${phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTelephoneFill />
            </a>
          </span>

          <span>
            <a
              aria-label="our whatsapp number"
              href={`https://wa.me/${whats}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoWhatsapp />
            </a>
          </span>
          <span>
            <a
              aria-label="our whatsapp facebook page"
              href={`${face}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
