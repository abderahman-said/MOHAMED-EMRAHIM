import React, { useState } from "react";
import styles from "styles/Login.module.css";
import { GoToNewPass, GoToRegister } from "store/AuthSlice";
import { useDispatch } from "react-redux";

const ResendCode = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const SendData = (e) => {
    e.preventDefault();
    dispatch(GoToNewPass());
  };
  return (
    <form>
      <h1 className={styles.mainHeading}>
        لقد تم ارسال رسالة الى بريدك الابكترونى
      </h1>
      <div className={styles.inputDiv}>
        <input
          type="text"
          name="code"
          id="code"
          placeholder="اسم المستخدم"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button
        name="ResendCode"
        type="submit"
        className={styles.submit_button}
        onClick={(e) => {
          SendData(e);
        }}
      >
        التالي
      </button>
      <div className={styles.go_to_Register_Div}>
        <span>ليس لديك حساب ؟</span>
        <button
          className={styles.go_to_regPage_button}
          name="go_to_regPage_button"
          type="button"
          onClick={() => {
            dispatch(GoToRegister());
          }}
        >
          انشاء حساب جديد
        </button>
      </div>
    </form>
  );
};

export default ResendCode;
