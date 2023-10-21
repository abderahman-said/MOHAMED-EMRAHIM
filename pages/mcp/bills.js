import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import styles from "styles/Admin/Cats.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  deleteOrder,
  finishOrderForAdmin,
  getBills,
  getOrderDeatils,
} from "store/ControlPanal";
import { Calendar } from "primereact/calendar";
import { Col, Container, Row, Table } from "react-bootstrap";
// import AdminNav from "components/Admin/AdminNav/AdminNav";
import dynamic from "next/dynamic";
const AdminNav = dynamic(() => import("components/Admin/AdminNav/AdminNav"), {
  loading: () => <p>Loading ...</p>,
});
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

// import { useDispatch, useSelector } from "react-redux";
// import { GtALlCats } from "store/ControlPanal";

// import { CustomerService } from '../service/CustomerService';
const Bills = () => {
  const dispatch = useDispatch();
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const date = new Date();
  const currentMonth = new Date().toLocaleDateString("en-GB");
  const lastMOnth = new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    date.getDay()
  ).toLocaleDateString("en-GB");
  const { BillsArr, OrderDeatilsArr } = useSelector(
    (state) => state.ControlPanal
  );
  useEffect(() => {
    const day = new Date();
    const getlastMonth = new Date(
      day.getFullYear(),
      day.getMonth() - 1,
      day.getDay()
    );
    if (!date1 && !date2) {
      setDate1(getlastMonth);
      setDate2(day);
    }
  }, [date1, date2]);

  const [globalFilterValue2, setGlobalFilterValue2] = useState("");
  const ShowSuccess = (e) =>
    toast.success(`${e}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const router = useRouter();
  useEffect(() => {
    const ISAdmin = window.localStorage.getItem("ib_Admin");
    if (ISAdmin !== "true" || !ISAdmin) {
      router.push("/");
    } else {
      const data = {
        from: lastMOnth,
        to: currentMonth,
      };
      if (!BillsArr) {
        dispatch(getBills(data));
      }
    }
  }, [router, dispatch, BillsArr, lastMOnth, currentMonth]);

  const onGlobalFilterChange2 = (e) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  };
  const renderHeader2 = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue2}
            onChange={onGlobalFilterChange2}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };
  const header2 = renderHeader2();
  const NumBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.id}`}>
        {rowData.id}
      </span>
    );
  };

  // CodeBody
  const DateBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.dat}`}>
        {rowData.dat}
      </span>
    );
  };
  const StateBody = (rowData) => {
    return (
      <>
        {rowData.done === 0 && (
          <button
            className={styles.activeBtn}
            onClick={() => {
              if (rowData.done === 0) {
                dispatch(deleteOrder(parseInt(rowData.id)))
                  .unwrap()
                  .then(() => {
                    ShowSuccess("تم الحذف بنجاح");
                  });
              }
            }}
          >
            الغاء
          </button>
        )}
        {rowData.pending === 1 && (
          <button
            className={styles.activeBtn}
            onClick={() => {
              if (rowData.pending === 1) {
                dispatch(finishOrderForAdmin(parseInt(rowData.id)))
                  .unwrap()
                  .then(() => {
                    ShowSuccess("تم الانهاء بنجاح");
                  });
              }
            }}
          >
            انهاء
          </button>
        )}
      </>
    );
  };

  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    number: { value: null, matchMode: FilterMatchMode.CONTAINS },
    dat: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const PhoneBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.id}`}>
        {rowData.phone}
      </span>
    );
  };
  const [selectedBills, setSelectedBills] = useState(null);

  const [ShowBills, setShowBills] = useState(false);
  const [billID, setBillID] = useState(false);
  const onClick = (name, position) => {
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
          // icon="pi pi-times"
          onClick={() => {
            onHide(name);
          }}
          className="p-button-text"
        />
      </div>
    );
  };
  return (
    <div className={styles.Mcp}>
      <ToastContainer
        position="top-center"
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
      <div className={styles.DateSection}>
        <div className={styles.Date}>
          <label htmlFor="from">من</label>
          <Calendar
            dateFormat="dd-mm-yy"
            id="from"
            value={date1}
            onChange={(e) => {
              setDate1(e.value);
              // console.log(e.value.toLocaleDateString("en-GB"));
            }}
          />
        </div>
        <div className={styles.Date}>
          <label htmlFor="to">الي</label>
          <Calendar
            dateFormat="dd-mm-yy"
            id="to"
            value={date2}
            onChange={(e) => {
              setDate2(e.value);
              if (e.value) {
                const data = {
                  from: date1.toLocaleDateString("en-GB"),
                  to: e.value.toLocaleDateString("en-GB"),
                };
                dispatch(getBills(data));
                // console.log(data);
                // sendDate();
              }
            }}
          />
        </div>
      </div>
      <Container fluid>
        <Row>
          <Col md={2}>
            <AdminNav />
          </Col>
          <Col md={10}>
            <div className={styles.Tabel}>
              <div className="card">
                <DataTable
                  scrollable
                  scrollHeight="60vh"
                  selectionMode="single"
                  selection={selectedBills}
                  onSelectionChange={(e) => {
                    setSelectedBills(e.value);
                    setBillID(e.value.id);

                  }}
                  value={BillsArr}
                  paginator
                  className="p-datatable-customers"
                  rows={20}
                  dataKey="id"
                  filters={filters2}
                  filterDisplay="row"
                  responsiveLayout="scroll"
                  globalFilterFields={["name", "id", "status"]}
                  header={header2}
                  emptyMessage="برجاء الانتظار يتم جلب البيانات"
                >
                  <Column
                    header="الرقم"
                    filterField="number"
                    body={NumBody}
                    style={{ minWidth: "12rem" }}
                    filter
                    filterPlaceholder="ادخل رقم العميل "
                  />
                  <Column
                    field="name"
                    header="الاسم"
                    filter
                    filterPlaceholder="ادخل اسم العميل"
                    style={{ minWidth: "12rem" }}
                  />
                  <Column
                    header="رقم التليفون"
                    filterField="phone"
                    body={PhoneBody}
                    style={{ minWidth: "12rem" }}
                    filter
                    filterPlaceholder="ادخل كود العميل"
                  />
                  <Column
                    header="التاريخ"
                    filterField="dat"
                    body={DateBody}
                    style={{ minWidth: "12rem" }}
                    filter
                    filterPlaceholder="ادخل التاريخ"
                  />
                  <Column
                    header="الحالة"
                    body={StateBody}
                    style={{ minWidth: "12rem" }}
                  />
                </DataTable>
              </div>
            </div>
            <div className={styles.ButnsSection}>
              <Button
                label="تفاصيل الفاتورة"
                // bill
                onClick={() => {
                  if (selectedBills) {
                    dispatch(getOrderDeatils(billID))
                      .unwrap()
                      .then(() => {
                        onClick("ShowBills");
                      });
                  }
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>

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
              <Table className={styles.tabel} style={{ width: "100%" }}>
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
              </Table>
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Bills;
