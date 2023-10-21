import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styels from "styles/ProductCard.module.css";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart, AiFillEye } from "react-icons/ai";
import { AddToCart, getCarts, getOriginalImagee } from "store/ShopSlice";
import ImageDialog from "components/ImageDialog/ImageDialog";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import React from "react";
function MyVerticallyCenteredModal(props) {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  // const { OriginalImageArr } = useSelector((state) => state.ShopSlice);
  const { Url } = useSelector((state) => state.HomeSlice);

  const getCart = () => {
    const ID = window.localStorage.getItem("ib_ID");
    dispatch(getCarts(ID));
  };
  const AddToCartHandeler = () => {
    if (
      !window.localStorage.getItem("ib_ID") ||
      window.localStorage.getItem("ib_ID") === "0"
    ) {
      router.push("/auth");
    } else {
      const data = {
        UserId: window.localStorage.getItem("ib_ID"),
        productId: props.id,
        count,
      };
      dispatch(AddToCart(data)).then(() => {
        toast.success("تم اضافة المنتج الي السلة ", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getCart();
      });
    }
  };
  useEffect(() => {
    if (count < 1) {
      setCount(1);
    }
  }, [count]);
  // console.log(OriginalImageArr)

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className={"DIalog_content"}>
          <div className={styels.Dialog_Product_info}>
            <h4>{props.catsName}</h4>
            <p>{props.name}</p>

            <div className={styels.counter}>
              <button
                className={styels.add_to_cart_button}
                onClick={AddToCartHandeler}
              >
                اضف الى السلة
              </button>
              <div className={styels.Product_Count}>
                <input
                  className={styels.count_input}
                  type={"number"}
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={styels.parent}>
            <div className={styels.imageCard}>
              <ImageDialog
                img={`${Url}/imgs?id=${props.medImage}`}
                largIma={`${Url}/imgs?id=${props.LargeImage}`}
                altImg={props.name}
              />
            </div>
            <button
              name="view"
              className={`text-center ${styels.viewBtn}`}
              onClick={() => {
                const PathName = props.name.replace(/\s/g, "-");
                const MAinName = PathName.replace(/%/g, "-");

                if (props.type === "pro" || props.type === "pro2") {
                  router.push({
                    pathname: `/product/${props.id}/${MAinName}`,
                  });
                } else {
                  router.push({
                    pathname: `/company/${props.id}/${MAinName}`,
                  });
                }
              }}
            >
              صفحة المنتج
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
const ProdcutCard = ({ name, img, type, id, catName }) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const AddToCartHandeler = () => {
    if (
      !window.localStorage.getItem("ib_ID") ||
      window.localStorage.getItem("ib_ID") === "0"
    ) {
      router.push("/auth");
    } else {
      const data = {
        UserId: window.localStorage.getItem("ib_ID"),
        productId: id,
        count,
      };
      dispatch(AddToCart(data)).then(() => {
        getCart();
        ShowSuccess();
      });
    }
  };
  const getCart = () => {
    const ID = window.localStorage.getItem("ib_ID");
    dispatch(getCarts(ID));
  };
  const { Url } = useSelector((state) => state.HomeSlice);
  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();
  const ShowSuccess = () =>
    toast.success("تم اضافة المنتج الي السلة ", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
// 
  const PathName = name.replace(/\s/g, "-");
  const MAinName = PathName.replace(/%/g, "-");
  console.log("PathName" , PathName)
  console.log("MAinName " ,MAinName)
  return (
    <div>
      <ToastContainer
        position="top-center"
        limit={1}
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={styels.productCard} aria-hidden="true">
        <div className={styels.imageCard}>
          <Image
            src={`${Url}/imgs?id=${img?.small}`}
            layout="responsive"
            width={300}
            height={300}
            title={name}
            alt={name}
            // sizes="(max-width: 768px) 100vw,
            // (max-width: 1200px) 50vw,
            // 33vw"
            // layout ="responsive"
            // loading="lazy"

            // placeholder="blur"
            // blurDataURL="blur"
            onClick={() => {
              if (type === "pro" || type === "pro2") {
                // const data = {
                //   productId: id,
                //   imageId: img,
                // };
                // dispatch(getOriginalImagee(data))
                //   .unwrap()
                //   .then(() => {
                setModalShow(true);
                //   });
              } else if (type === "comp") {
                // const PathName = name.replace(/\s/g, "-");
                router.push({
                  pathname: `/company/${id}/${MAinName}`,
                });
              }
            }}
          />
          {/* {type === "pro" && <div className={styels.loadingImage}></div>}
          {type === "pro2" && <div className={styels.loadingImage2}></div>} */}
          {type === "pro" || type === "pro2" ? (
            <div className={styels.icons}>
              <span
                onClick={() => AddToCartHandeler()}
                className={styels.addIcon}
              >
                <AiOutlineShoppingCart />
              </span>
              <span
                onClick={() => {
                  if (type === "pro" || type === "pro2") {
                    // const data = {
                    //   productId: id,
                    //   imageId: img,
                    // };
                    // dispatch(getOriginalImagee(data))
                    //   .unwrap()
                    //   .then(() => {
                    //     setModalShow(true);
                    //   });
                    setModalShow(true);
                  } else if (type === "comp") {
                    // const PathName = name.replace(/\s/g, "-");
                    router.push({
                      pathname: `/company/${id}/${MAinName}`,
                    });
                  }
                }}
              >
                <AiFillEye />
              </span>
            </div>
          ) : null}
        </div>
        <div aria-hidden="true">
          <Link
            href={`${type === "pro" || type === "pro2"
              ? `/product/${id}/${MAinName}`
              : `/company/${id}/${MAinName}`
              }`}
          >
            <a className={styels.name}>{name.replace(/-/g, ' ')}</a>
          </Link>
        </div>
        <MyVerticallyCenteredModal
          name={name}
          catsName={catName}
          show={modalShow}
          medImage={img?.medium}
          LargeImage={img?.large}
          type={type}
          id={id}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
};

export default ProdcutCard;
