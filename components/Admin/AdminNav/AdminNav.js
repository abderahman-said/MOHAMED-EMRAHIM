import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillHome, AiFillLayout, AiFillShop } from "react-icons/ai";
import {
  MdBlock,
  MdCategory,
  MdHideImage,
  MdNotificationsActive,
  MdOutlineEventAvailable,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
// MdOutlineKeyboardArrowDown CgWebsite BiMessageDetail GiVerticalBanner HiUserGroup
import Accordion from "react-bootstrap/Accordion";
import styles from "styles/Admin/CPHome.module.css";
import { GiVerticalBanner } from "react-icons/gi";
import { CgWebsite } from "react-icons/cg";
import { HiUserGroup } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";
import { FaFileInvoice, FaPeopleCarry } from "react-icons/fa";
import { Logout } from "store/AuthSlice";
import { SlLogin } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { ClearCart } from "store/ShopSlice";
const AdminNav = () => {
  const [activeIcon, setActiveIcon] = useState(false);
  // const { CartsArr } = useSelector((state) => state.ShopSlice);

  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className={styles.AdminNav}>
      <ul>
        <li>
          <Link href={"/"}>
            <a
              // style={{ ...color }}
              className={router.pathname === "/" ? styles.active : styles.link2}
            >
              <AiFillHome />
              الرئيسية
            </a>
          </Link>
        </li>
        <li>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header
                onClick={() => setActiveIcon((state) => !state)}
              >
                <div className={styles.accHeading}>
                  <AiFillShop />
                  المنتجات
                </div>
                <MdOutlineKeyboardArrowDown
                  className={activeIcon && styles.activeIcon}
                />
              </Accordion.Header>
              <Accordion.Body>
                <ul className={styles.accUlContainer}>
                  <li>
                    <Link href={"/mcp/products"}>
                      <a
                        // style={{ ...color }}
                        className={
                          router.pathname === "/mcp/products"
                            ? styles.active
                            : styles.link2
                        }
                      >
                        <MdOutlineEventAvailable />
                        كل المنتجات
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/mcp/products/availbale"}>
                      <a
                        // style={{ ...color }}
                        className={
                          router.pathname === "/mcp/products/availbale"
                            ? styles.active
                            : styles.link2
                        }
                      >
                        <MdOutlineEventAvailable />
                        منتجات متاحه
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/mcp/products/unavilbale"}>
                      <a
                        // style={{ ...color }}
                        className={
                          router.pathname === "/mcp/products/unavilbale"
                            ? styles.active
                            : styles.link2
                        }
                      >
                        <MdBlock />
                        منتجات غير متاحه
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/mcp/products/noimages"}>
                      <a
                        // style={{ ...color }}
                        className={
                          router.pathname === "/mcp/products/noimages"
                            ? styles.active
                            : styles.link2
                        }
                      >
                        <MdHideImage />
                        منتجات بدون صور
                      </a>
                    </Link>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </li>
        <li>
          <Link href={"/mcp/cats"}>
            <a
              // style={{ ...color }}
              className={
                router.pathname === "/mcp/cats" ? styles.active : styles.link2
              }
            >
              <MdCategory />
              المجموعات
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/mcp/bills"}>
            <a
              // style={{ ...color }}
              className={
                router.pathname === "/mcp/bills" ? styles.active : styles.link2
              }
            >
              <FaFileInvoice />
              الفواتير
            </a>
          </Link>
        </li>

        <li>
          <Link href={"/mcp/websiteBanars"}>
            <a
              // style={{ ...color }}
              className={
                router.pathname === "/mcp/websiteBanars"
                  ? styles.active
                  : styles.link2
              }
            >
              <AiFillLayout />
              بنارات الموقع
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/mcp/headers"}>
            <a
              // style={{ ...color }}
              className={
                router.pathname === "/mcp/headers"
                  ? styles.active
                  : styles.link2
              }
            >
              <CgWebsite />
              التطبيق
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/mcp/providerBanars"}>
            <a
              // style={{ ...color }}
              className={
                router.pathname === "/mcp/providerBanars"
                  ? styles.active
                  : styles.link2
              }
            >
              <GiVerticalBanner />
              بنرات الموردين
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/mcp/clients"}>
            <a
              // style={{ ...color }}
              className={
                router.pathname === "/mcp/clients"
                  ? styles.active
                  : styles.link2
              }
            >
              <HiUserGroup />
              العملاء
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/mcp/providers"}>
            <a
              // style={{ ...color }}
              className={
                router.pathname === "/mcp/providers"
                  ? styles.active
                  : styles.link2
              }
            >
              <FaPeopleCarry />
              موردين نتعامل معهم
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/mcp/messages"}>
            <a
              // style={{ ...color }}
              className={
                router.pathname === "/mcp/messages"
                  ? styles.active
                  : styles.link2
              }
            >
              <BiMessageDetail />
              الرسايل
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/mcp/social"}>
            <a
              // style={{ ...color }}
              className={
                router.pathname === "/mcp/social" ? styles.active : styles.link2
              }
            >
              <MdNotificationsActive />
              وسائل التواصل
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <a
              onClick={() => {
                dispatch(Logout());
                dispatch(ClearCart());
              }}
              className={styles.link2}
            >
              <SlLogin />
              تسجيل الخروج
            </a>
          </Link>
          {/* <button
        name="logout"
        type="button"
        onClick={() => {
          dispatch(Logout())
          dispatch(ClearCart());
          // router.push("/");
        }}
        className={styles.logoutBtn}
      >
          <SlLogin />
        تسجيل الخروج
      </button> */}
        </li>
      </ul>
    </div>
  );
};
export default AdminNav;
