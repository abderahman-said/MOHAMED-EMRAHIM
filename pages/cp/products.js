// import Head from "next/head";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
// import ProfilePic from "components/Profile/ProfilePic";
import styles from "styles/CP.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFinishedBills } from "store/ShopSlice";
import { getOrderDeatils } from "store/ControlPanal";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import Image from "next/image";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const ProfilePic = dynamic(() => import("components/Profile/ProfilePic"), {
  loading: () => <p>Loading ...</p>,
});
// import { GiClick } from "react-icons/gi";
// GiClick
const MyProducts = () => {
  const dispatch = useDispatch();
  const [ShowBills, setShowBills] = useState(false);
  // const [selectedBills, setSelectedBills] = useState(null);
  // const [billID, setBillID] = useState(false);

  // OrderDeatilsArr
  const { UserFinishedBillsArr } = useSelector((state) => state.ShopSlice);
  const { OrderDeatilsArr } = useSelector((state) => state.ControlPanal);
  const router = useRouter();
  useEffect(() => {
    const ISAdmin = window.localStorage.getItem("ib_Admin");
    if (ISAdmin !== "false" || !ISAdmin) {
      router.push("/");
    } else {
      const UserId =
        (typeof window !== "undefined" &&
          window.localStorage.getItem("ib_ID")) ||
        0;
      if (!UserFinishedBillsArr) {
        dispatch(getUserFinishedBills(UserId));
      }
    }
  }, [router, dispatch, UserFinishedBillsArr]);

  const onClick = (name) => {
    dialogFuncMap[`${name}`](true);
  };
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };
  const dialogFuncMap = {
    ShowBills: setShowBills,
  };
  const renderFooter = (name) => {
    return (
      <div className={styles.fotter_Btn}>
        <Button
          label="ok"
          onClick={() => {
            onHide(name);
          }}
          className="p-button-text"
        />
      </div>
    );
  };
  // const ALlBills =
  //   UserFinishedBillsArr &&
  //   UserFinishedBillsArr.map((ele, idx) => {
  //     return (
  //       <Col
  //         className={styles.Bill_col}
  //         md={12}
  //         key={idx}
  //         onClick={() => {
  //           dispatch(getOrderDeatils(ele.id))
  //             .unwrap()
  //             .then(() => {
  //               onClick("ShowBills");
  //             });
  //         }}
  //       >
  //         <div className={styles.BillSection}>

  //           <h3> رقم الفاتورة: {ele.id}</h3>
  //           <span>
  //             <GiClick />
  //           </span>
  //         </div>
  //       </Col>
  //     );
  //   });

  const NumBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.id}`}>
        {rowData.id}
      </span>
    );
  };
  const DateBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.dat}`}>
        {rowData.dat}
      </span>
    );
  };
  const ShowBillBtn = (rowData) => {
    return (
      <button
        className={styles.ShowBillBtn}
        onClick={() => {
          dispatch(getOrderDeatils(rowData.id))
            .unwrap()
            .then(() => {
              onClick("ShowBills");
            });
        }}
      >
        عرض الفاتورة
      </button>
    );
  };
  return (
    <div className={styles.CP_container}>
      <Container>
        <Row className={styles.center}>
          <Col md={12}>
            <ProfilePic />
            <h2 className={styles.heading2}>المنتجات التي تم شرائها</h2>
            <div className={styles.BillsSection}>
              <Container>
                <Row className={styles.center}>
                  {/* {ALlBills} */}
                  {UserFinishedBillsArr && UserFinishedBillsArr.length > 0 ? (
                    <Col md={10}>
                      <div className={styles.Tabel}>
                        <div className="card">
                          <DataTable
                            scrollable
                            scrollHeight="60vh"
                            value={UserFinishedBillsArr}
                            paginator
                            className="p-datatable-customers"
                            rows={20}
                            dataKey="id"
                            filterDisplay="row"
                            responsiveLayout="scroll"
                            emptyMessage="برجاء الانتظار يتم جلب البيانات"
                          >
                            <Column
                              header="رقم الفاتورة"
                              body={NumBody}
                              style={{ minWidth: "12rem" }}
                            />
                            <Column
                              field="name"
                              header="اسم العميل"
                              style={{ minWidth: "12rem" }}
                            />
                            <Column
                              header="تاريخ الفاتورة"
                              body={DateBody}
                              style={{ minWidth: "12rem" }}
                            />
                            <Column
                              // header="تاريخ الفاتورة"
                              body={ShowBillBtn}
                              style={{ minWidth: "12rem" }}
                            />
                          </DataTable>
                        </div>
                      </div>
                    </Col>
                  ) : (
                    <Col md={5}>
                      <Image
                        src="/images/empty.svg"
                        alt="login"
                        width={700}
                        height={600}
                      />
                      <h2>لا يوجد فواتير الان</h2>
                    </Col>
                  )}
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
        <Dialog
          header="تفاصيل الفاتورة"
          visible={ShowBills}
          onHide={() => onHide("ShowBills")}
          breakpoints={{ "960px": "99vw" }}
          style={{ width: "50vw" }}
          footer={renderFooter("ShowBills")}
        >
          <div className={styles.Dialog_Content}>
            {OrderDeatilsArr && (
              <>
                <div className={styles.header}>
                  <div className={styles.user_Info}>
                    <h3>اسم العميل :</h3>
                    <p>{OrderDeatilsArr.clientName}</p>
                    <p>{OrderDeatilsArr.clientPhone}</p>
                    <p>{OrderDeatilsArr.clientEmail}</p>
                  </div>
                  <div className={styles.Bills_Info}>
                    <h3>تفاصيل الفاتورة :</h3>
                    <p>تاريخ الفاتورة : {OrderDeatilsArr.dat}</p>
                    <p>حالة الفاتورة : {OrderDeatilsArr.stat}</p>
                  </div>
                  <div className={styles.Bills_id}>
                    <h3>رقم الفاتورة</h3>
                    <p>{OrderDeatilsArr.billId}</p>
                  </div>
                </div>
                <tabel className={styles.tabel} style={{ width: "100%" }}>
                  {/* OrderDeatilsArr */}
                  <thead>
                    <tr>
                      <th>كود</th>
                      <th>وصف المنتج</th>
                      <th>الكمية</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OrderDeatilsArr.lines.map((ele, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{ele.code}</td>
                          <td>{ele.name}</td>
                          <td>{ele.count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </tabel>
              </>
            )}
          </div>
        </Dialog>
      </Container>
    </div>
  );
};

export default MyProducts;
