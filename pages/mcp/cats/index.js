import React, { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import styles from "styles/Admin/Cats.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  GtALlCats,
  saveCategory,
  updateCategory,
} from "store/ControlPanal";
// import Button1 from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import { Col, Container, Row } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Image from "next/image";
// import AdminNav from "components/Admin/AdminNav/AdminNav";
import dynamic from "next/dynamic";
const AdminNav = dynamic(() => import("components/Admin/AdminNav/AdminNav"), {
  loading: () => <p>Loading ...</p>,
});
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Modal from "react-bootstrap/Modal";

const Cats = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const { Url } = useSelector((state) => state.HomeSlice);
  const { AllCatsArr } = useSelector((state) => state.ControlPanal);
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [UpdateDialog, SetUpdateDialog] = useState(false);
  // UpdateDialog
  const [selectedCats, setSelectedCats] = useState(null);
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");

  const router = useRouter();
  useEffect(() => {
    const ISAdmin = window.localStorage.getItem("ib_Admin");
    if (ISAdmin !== "true" || !ISAdmin) {
      router.push("/");
    } else {
      if (!AllCatsArr) {
        dispatch(GtALlCats());
      }
    }
  }, [router, dispatch, AllCatsArr]);
  // const TabelValue = customers2
  const onGlobalFilterChange2 = (e) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  };
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

  const renderHeader2 = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue2}
            onChange={onGlobalFilterChange2}
            placeholder="البحث في اي مكان"
          />
        </span>
      </div>
    );
  };
  const header2 = renderHeader2();
  const representativeBodyTemplate = (rowData) => {
    const representative = rowData.ord;
    return (
      <React.Fragment>
        <span className="image-text">{representative}</span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.name}`}>
        {rowData.parentName}
      </span>
    );
  };
  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
        placeholder="اختار التصنيف"
        className="p-column-filter"
        showClear
        filter
      />
    );
  };

  const statuses =
    AllCatsArr && Array.from(new Set(AllCatsArr.map((a) => a.parentName)));

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const selectedCatsTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.parentName}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };
  const countryOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.parentName}</div>
      </div>
    );
  };

  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    ord: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    parentName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
    UpdateDialog: SetUpdateDialog,
  };
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);
  };
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };
  const renderFooter = (name) => {
    return (
      <div className={styles.fotter_Btn}>
        <Button
          label="الغاء"
          // icon="pi pi-times"
          onClick={() => {
            setSelectedCats(null);
            setUploadImage1("");
            setUploadImage2("");
            setCatName("");
            setCatOrder(0);
            setCatID("");
            onHide(name);
          }}
          className="p-button-text"
        />
        <Button
          label="حفظ"
          // icon="pi pi-check"
          onClick={() => {
            onHide(name);
            SendData();
          }}
          autoFocus
        />
      </div>
    );
  };
  const renderUpdateFooter = (name) => {
    return (
      <div lassName={styles.fotter_Btn}>
        <Button
          label="الغاء"
          onClick={() => {
            onHide(name);
            setNameUpdate(selectedProduct1.name);
            setOrderUpdate(selectedProduct1.ord);
            setparentIDUpdate(selectedProduct1.parentId);
            setID(selectedProduct1.id);
            setUpdateImage1(selectedProduct1.activeIcon);
            setUpdateImage2(selectedProduct1.disabledIcon);
          }}
          className="p-button-text"
        />
        <Button
          label="حفظ"
          onClick={() => {
            onHide(name);
            UpdateData();
          }}
          autoFocus
        />
      </div>
    );
  };

  // ADD
  const [Image1, setUploadImage1] = useState("");
  const [Image2, setUploadImage2] = useState("");
  const [catName, setCatName] = useState("");
  const [catOrder, setCatOrder] = useState(0);
  const [catID, setCatID] = useState("");
  // console.log()
  const UploadImge1 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Make a fileInfo Object
      const baseURL = reader.result;
      const position = baseURL.search("base64,");
      const res = baseURL.slice(position + 7);
      setUploadImage1(res);
    };
  };
  const UploadImge2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Make a fileInfo Object
      const baseURL = reader.result;
      const position = baseURL.search("base64,");
      const res = baseURL.slice(position + 7);
      setUploadImage2(res);
    };
  };

  const SendData = () => {
    const data = {
      parentId: parseFloat(catID),
      order: parseFloat(catOrder),
      name: catName,
      activeIcon: Image1,
      disabledIcon: Image2,
    };
    // console.log(data);
    dispatch(saveCategory(data))
      .unwrap()
      .then(() => {
        dispatch(GtALlCats());
        ShowSuccess("تمت الاضافة بنجاح");
      });
  };

  // UPDATE
  const [nameUpdate, setNameUpdate] = useState("");
  const [orderUpdate, setOrderUpdate] = useState("");
  const [ParentIDUpdate, setparentIDUpdate] = useState("");
  const [iD, setID] = useState("");
  const [updateImage1, setUpdateImage1] = useState("");
  const [updateImage2, setUpdateImage2] = useState("");
  const UploadUpdateImge1 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const baseURL = reader.result;
      const position = baseURL.search("base64,");
      const res = baseURL.slice(position + 7);
      setUpdateImage1(res);
    };
  };

  const UploadUpdateImge2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Make a fileInfo Object
      const baseURL = reader.result;
      const position = baseURL.search("base64,");
      const res = baseURL.slice(position + 7);
      setUpdateImage2(res);
    };
  };

  const onDropCatsChange = (e) => {
    setSelectedCats(e.value);
    setCatID(e.value.id);
  };
  const UpdateData = () => {
    const data = {
      id: iD,
      parentId: ParentIDUpdate,
      order: orderUpdate,
      name: nameUpdate,
      activeIcon: typeof updateImage1 === "number" ? null : updateImage1,
      disabledIcon: typeof updateImage2 === "number" ? null : updateImage2 ,
    };
    dispatch(updateCategory(data))
      .unwrap()
      .then(() => {
        dispatch(GtALlCats());
        ShowSuccess("تم التعديل بنجاح");
      });
  };
  const DeleteHAndeller = () => {
    if (iD.toString().length > 0) {
      dispatch(deleteCategory(iD))
        .unwrap()
        .then(() => {
          setSelectedProduct1(null);
          ShowSuccess("تم الحذف بنجاح ");
        });
    }
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
      {/* Page Content */}
      <Container fluid>
        <Row>
          <Col md={2}>
            <AdminNav />
          </Col>
          <Col md={10}>
            <div className={styles.Tabel}>
              <div className="card">
                <DataTable
                  // head
                  // header={header}
                  scrollable
                  scrollHeight="60vh"
                  selectionMode="single"
                  selection={selectedProduct1}
                  onSelectionChange={(e) => {
                    setSelectedCats(e.value);
                    setSelectedProduct1(e.value);
                    setNameUpdate(e.value.name);
                    setOrderUpdate(e.value.ord);
                    setparentIDUpdate(e.value.parentId);
                    setID(e.value.id);
                    setUpdateImage1(e.value.activeIcon);
                    setUpdateImage2(e.value.disabledIcon);
                    // const [updateImage2, setUpdateImage2] = useState("");
                  }}
                  value={AllCatsArr}
                  paginator
                  className="p-datatable-customers"
                  rows={20}
                  dataKey="id"
                  filters={filters2}
                  filterDisplay="row"
                  responsiveLayout="scroll"
                  globalFilterFields={["name", "ord", "status"]}
                  header={header2}
                  emptyMessage="No customers found."
                >
                  <Column
                    field="name"
                    header="مجموعة فرعية"
                    filter
                    filterPlaceholder="ادخل الاسم "
                    style={{ minWidth: "12rem" }}
                  />
                  <Column
                    field="parentName"
                    header="مجموعة رئيسية"
                    showFilterMenu={false}
                    filterMenuStyle={{ width: "14rem" }}
                    style={{ minWidth: "12rem" }}
                    body={statusBodyTemplate}
                    filter
                    filterElement={statusRowFilterTemplate}
                  />
                  <Column
                    field="ord"
                    header="الترتيب"
                    filterField="ord"
                    body={representativeBodyTemplate}
                    style={{ minWidth: "12rem" }}
                    filter
                    filterPlaceholder="ادخل رقم التصنيف"
                  />
                </DataTable>
              </div>
            </div>
            <div className={styles.ButnsSection}>
              <Button
                label="أضافة  "
                // icon="pi pi-external-link"
                onClick={() => onClick("displayResponsive")}
              />
              <Button
                label="تعديل "
                // icon="pi pi-external-link"
                onClick={() => {
                  selectedProduct1 && onClick("UpdateDialog");
                }}
              />
              <Button
                label="حذف "
                // icon="pi pi-external-link"
                onClick={() => selectedProduct1 && handleShow()}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <>
        {/* ADD Dialog */}
        <Dialog
          header="اضافة مجموعة جديدة"
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          breakpoints={{ "960px": "99vw" }}
          style={{ width: "50vw" }}
          footer={renderFooter("displayResponsive")}
        >
          <div className={styles.Dialog_Content}>
            <Dropdown
              value={selectedCats}
              options={AllCatsArr && AllCatsArr}
              onChange={onDropCatsChange}
              optionLabel="parentName"
              filter
              showClear
              filterBy="parentName"
              placeholder="اختار التصنيف"
              valueTemplate={selectedCatsTemplate}
              itemTemplate={countryOptionTemplate}
              className={styles.DialogDrop}
            />
            <div className={styles.input_Section}>
              <label htmlFor="name"> الاسم</label>
              <input
                type={"text"}
                id="name"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
              />
            </div>

            <div className={styles.input_Section}>
              <label htmlFor="ord"> ترتيب الظهور</label>

              <input
                type={"number"}
                id="ord"
                value={catOrder}
                onChange={(e) => setCatOrder(e.target.value)}
              />
            </div>

            <div className={styles.select_div}>
              <label htmlFor="img">
                {" "}
                {/* <AiFillCamera /> */}
                اضف الصورة الاولي
              </label>
              <input
                type="file"
                // style={{ visibility: "hidden" }}
                id="img"
                name="img"
                accept="image/*"
                onChange={(e) => {
                  // getBase64(e.target.files[0]);
                  UploadImge1(e.target.files[0]);
                }}
              />
            </div>
            <br />
            <div className={styles.select_div}>
              <label htmlFor="img">
                {" "}
                {/* <AiFillCamera /> */}
                اضف الصورة الثانية
              </label>
              <input
                type="file"
                // style={{ visibility: "hidden" }}
                id="img"
                name="img"
                accept="image/*"
                onChange={(e) => {
                  // getBase64(e.target.files[0]);
                  UploadImge2(e.target.files[0]);
                }}
              />
            </div>
          </div>
        </Dialog>
        {/* Update Dialog */}
        <Dialog
          header="تعديل المجموعة"
          visible={UpdateDialog}
          onHide={() => onHide("UpdateDialog")}
          breakpoints={{ "960px": "99vw" }}
          style={{ width: "50vw" }}
          footer={renderUpdateFooter("UpdateDialog")}
        >
          <div className={styles.Dialog_Content}>
            <Dropdown
              value={selectedCats}
              options={AllCatsArr && AllCatsArr}
              onChange={onDropCatsChange}
              optionLabel="parentName"
              filter
              // showClear
              filterBy="parentName"
              placeholder="اختار التصنيف"
              valueTemplate={selectedCatsTemplate}
              itemTemplate={countryOptionTemplate}
              className={styles.DialogDrop}
            />
            <div className={styles.input_Section}>
              <label htmlFor="name"> الاسم</label>
              <input
                type={"text"}
                id="name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div className={styles.input_Section}>
              <label htmlFor="ord"> ترتيب الظهور</label>
              <input
                type={"number"}
                id="ord"
                value={orderUpdate}
                onChange={(e) => setOrderUpdate(e.target.value)}
              />
            </div>
            <div className={styles.select_div}>
              <label htmlFor="img">اضف الصورة الاولي</label>
              <input
                type="file"
                // style={{ visibility: "hidden" }}
                id="img"
                name="img"
                accept="image/*"
                onChange={(e) => {
                  UploadUpdateImge1(e.target.files[0]);
                }}
              />
              <div className={styles.image_container}>
                {updateImage1.toString().length > 10 ? (
                  <Image
                    src={`data:image/jpeg;base64,${updateImage1}`}
                    // src={`${Url}/imgs?id=${updateImage1}`}
                    width={50}
                    height={50}
                    alt={updateImage1}
                  />
                ) : (
                  <Image
                    src={`${Url}/imgs?id=${updateImage1}`}
                    width={50}
                    height={50}
                    alt={updateImage1}
                  />
                )}
              </div>
            </div>
            <div className={styles.select_div}>
              <label htmlFor="img">اضف الصورة الثانية</label>
              <input
                type="file"
                id="img"
                // style={{ visibility: "hidden" }}
                name="img"
                accept="image/*"
                onChange={(e) => {
                  UploadUpdateImge2(e.target.files[0]);
                }}
              />
              <div className={styles.image_container}>
                {updateImage2.toString().length > 10 ? (
                  <Image
                    src={`data:image/jpeg;base64,${updateImage2}`}
                    // src={`${Url}/imgs?id=${updateImage1}`}
                    width={50}
                    height={50}
                    alt={updateImage2}
                  />
                ) : (
                  <Image
                    src={`${Url}/imgs?id=${updateImage2}`}
                    width={50}
                    height={50}
                    alt={updateImage2}
                  />
                )}
              </div>
            </div>
          </div>
        </Dialog>
        <Modal
          show={show}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title> هل تريد الحذف</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div className={styles.DeletDIalog}>
              <Button variant="secondary" onClick={handleClose}>
                لا
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  DeleteHAndeller();
                  handleClose();
                }}
              >
                نعم
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default Cats;
