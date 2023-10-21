import Image from "next/image";
import React from "react";
// import { AiFillCamera } from "react-icons/ai";
import styles from "styles/CP.module.css";
import logo from "public/images/testLogo.svg";
import { Logout } from "store/AuthSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ClearCart } from "store/ShopSlice";
const ProfilePic = ({ name }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const [Logo, setUploadLogo] = useState("");
  // // console.log()
  // const [loadngImage, setLoadingImage] = useState(logo);
  // const UploadImge = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     // Make a fileInfo Object
  //     const baseURL = reader.result;
  //     const position = baseURL.search("base64,");
  //     const res = baseURL.slice(position + 7);
  //     console.log(res);
  //     setUploadLogo(res);
  //     setLoadingImage("");
  //   };
  // };
  return (
    <div className={styles.ProfilePic}>
      <div className={styles.image_select_container}>
        <div className={styles.Card_image}>
          {/* {loadngImage ? (
            <Image src={logo} alt={"name"} width={100} height={100} />
          ) : (
            <Image
              src={`data:image/jpeg;base64,${Logo}`}
              alt={"name"}
              width={100}
              height={100}
            />
          )} */}
          <Image src={logo} alt={"name"} width={100} height={100} />
        </div>
        {/* <div className={styles.select_div}>
          <label htmlFor="img">
            {" "}
            <AiFillCamera />
          </label>
          <input
            type="file"
            style={{ visibility: "hidden" }}
            id="img"
            name="img"
            accept="image/*"
            onChange={(e) => {
              // getBase64(e.target.files[0]);
              UploadImge(e.target.files[0]);
            }}
            // onChange={onFileChange}
          />
        </div> */}
      </div>
      <h1 className={styles.mainHeading}> {name}</h1>
      <button
        name="logout"
        type="button"
        onClick={() => {
          dispatch(Logout());
          dispatch(ClearCart());
          router.push("/");
        }}
        className={styles.logoutBtn}
      >
        تسجيل الخروج
      </button>
    </div>
  );
};

export default ProfilePic;
