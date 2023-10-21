import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import styles from "styles/Admin/Cats.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import {
  // GtALlCats,
  saveBanner,
  deleteHomeBannerPojo, updateHomeBannerPoj
} from "store/ControlPanal";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
// import AdminNav from "components/Admin/AdminNav/AdminNav";
import dynamic from "next/dynamic";
const AdminNav = dynamic(() => import("components/Admin/AdminNav/AdminNav"), {
  loading: () => <p>Loading ...</p>,
});
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { getBanners } from "store/HomeSlice";
import { getParentCategories } from "store/ShopSlice";


const WebsiteBanars = () => {
  const dispatch = useDispatch();
  //   const { HeadersArr } = useSelector((state) => state.ControlPanal);
  // const { AllCatsArr } = useSelector((state) => state.ControlPanal);
  const { Url, BannersArr } = useSelector((state) => state.HomeSlice);
  const { MainCatsArr } = useSelector((state) => state.ShopSlice);
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
      if (!BannersArr) {
        dispatch(getBanners());
      }
      if (!MainCatsArr) {
        dispatch(getParentCategories());
      }
    }
  }, [router, dispatch, BannersArr, MainCatsArr]);
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

  const SpacificimagesBody = (rowData) => {
    // افقي
    return (
      <span className={`customer-badge status-${rowData.verticalImage}`}>
        <div className={styles.verticalImage}>
          <Image
            src={`${Url}/imgs?id=${rowData.verticalImage}`}
            width={40}
            height={90}
            alt={rowData.verticalImage}
          />
        </div>
      </span>
    );
  };
  const SpacifichorizontalImage = (rowData) => {
    // رأسي
    return (
      <span className={`customer-badge status-${rowData.horizontalImage}`}>
        <div className={styles.horizontalImage}>
          <Image
            src={`${Url}/imgs?id=${rowData.horizontalImage}`}
            width={100}
            height={50}
            alt={rowData.horizontalImage}
          />
        </div>
      </span>
    );
  };
  //   SpacifichorizontalImage

  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [AddProduct, setAddProduct] = useState(false);
  const [UpdateDialog, SetUpdateDialog] = useState(false);
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);
  };
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };
  const dialogFuncMap = {
    AddProduct: setAddProduct,
    UpdateDialog: SetUpdateDialog,
    // DescriptionDialog: setDescriptionDialog,
  };
  const renderFooter = (name) => {
    return (
      <div className={styles.fotter_Btn}>
        <Button
          label="الغاء"
          // icon="pi pi-times"
          onClick={() => {
            // setName("");
            // setDescription("");
            // setImage("");
            onHide(name);
          }}
          className="p-button-text"
        />
        <Button
          label="حفظ"
          onClick={() => {
            onHide(name);
            SendData();
          }}
          autoFocus
        />
      </div>
    );
  };
  // renderUpdateFooter
  const renderUpdateFooter = (name) => {
    return (
      <div className={styles.fotter_Btn}>
        <Button
          label="الغاء"
          // icon="pi pi-times"
          onClick={() => {
            // setName("");
            // setDescription("");
            // setImage("");
            onHide(name);
          }}
          className="p-button-text"
        />
        <Button
          label="حفظ"
          onClick={() => {
            onHide(name);
            SendUpdateData();
          }}
          autoFocus
        />
      </div>
    );
  };

  const selectedCatsTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.name}</div>
      </div>
    );
  };

  const onDropCatsChange = (e) => {
    // console.log(e.value)
    setSelectedCats(e.value);
    setCatID(e.value.id);
    // console.log(selectedCats)
  };
  const [selectedCats, setSelectedCats] = useState(null);
  const ParentCats =
  MainCatsArr && Array.from(new Set(MainCatsArr.map((a) => a)));
  //   const AllCompanies = ProvClientssArr && ProvClientssArr.map((a) => a);
  //   const selectedCatTest =
  //   ParentCats && ParentCats.filter((ele) => ele.id === e.catId);

  //   const onSelectedComTest = (e) => {
  //     const seletedTest = AllCompanies.filter(
  //       (ele) => ele.code === parseFloat(e.companyId)
  //     );
  //     const selectedCatTest =
  //       ParentCats && ParentCats.filter((ele) => ele.id === e.catId);

  //     // setSelectedComp(null);
  //     console.log(selectedCatTest[0]);
  //     if (selectedCatTest[0] === null) {
  //       setSelectedCats(null);
  //     } else {
  //       setSelectedCats(selectedCatTest[0]);
  //     }

  //     if (seletedTest[0] === null) {
  //       setSelectedComp(null);
  //     } else {
  //       setSelectedComp(seletedTest[0]);
  //     }
  //   };
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const [horizontalImage, setHorizontalImage] = useState(null);
  const [verticalImage, setVerticalImage] = useState(null);
  const [ord, setOrd] = useState(1);
  const [id, setID] = useState(null);
  const [catId, setCatID] = useState(null);

  //   const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const UploadsetHorizontalImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Make a fileInfo Object
      const baseURL = reader.result;
      const position = baseURL.search("base64,");
      const res = baseURL.slice(position + 7);
      setHorizontalImage(res);
    };
  };

  const UploadVerticalImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Make a fileInfo Object
      const baseURL = reader.result;
      const position = baseURL.search("base64,");
      const res = baseURL.slice(position + 7);
      setVerticalImage(res);
    };
  };

  const SendData = () => {
    const data = {
      categoryId: catId,
      ord,
      horizontalImage: horizontalImage,
      verticalImage: verticalImage,
    };
    // console.log(data);
    dispatch(saveBanner(data))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          dispatch(getBanners());
        }, 1000);
        setOrd(0);
        setCatID(null);
        setSelectedCats(null);

        // setDescription("");
        setHorizontalImage(null);
        setVerticalImage(null);
        ShowSuccess("تمت الاضافة بنجاح");
      });
  };
  const SendUpdateData = () => {
    const data = {
      id,
      categoryId: catId,
      ord : parseInt(ord),
      horizontalImage: horizontalImage,
      verticalImage: verticalImage,
    };
    // console.log(data)
    dispatch(updateHomeBannerPoj(data))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          dispatch(getBanners());
          ShowSuccess("تم التعديل بنجاح");
        }, 1000);
      });
  };
  const DeleteHandeller = () => {
    const data = {
      id,
    };
    // console.log(data);
    dispatch(deleteHomeBannerPojo(data))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          dispatch(getBanners());
        }, 1000);
        ShowSuccess("تم الحذف بنجاح");
      });
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
                  selection={selectedProduct1}
                  onSelectionChange={(e) => {
                    setSelectedProduct1(e.value);
                    setID(e.value.id);
                    setHorizontalImage(e.value.horizontalImage);
                    setVerticalImage(e.value.verticalImage);
                    setCatID(e.value.catId);
                    setOrd(e.value.ord);
                    // setName(e.value.name);
                    // const [selectedProduct1, setSelectedProduct1] = useState(null);
                    // const [horizontalImage, setHorizontalImage] = useState(null);
                    // const [verticalImage, setVerticalImage] = useState(null);
                    // const [ord, setOrd] = useState(1);
                    // const [id, setID] = useState(null);
                    // const [catId, setCatID] = useState(null);
                  }}
                  value={BannersArr}
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
                    field="name"
                    header="الاسم"
                    filter
                    filterPlaceholder="ادخل اسم المنتج"
                    style={{ minWidth: "12rem" }}
                  />
                  <Column
                    header="رأسي "
                    body={SpacificimagesBody}
                    style={{ minWidth: "12rem" }}
                    filterPlaceholder="ادخل اسم الشركة"
                  />
                  <Column
                    header="افقي"
                    body={SpacifichorizontalImage}
                    style={{ minWidth: "12rem" }}
                    filterPlaceholder="ادخل اسم الشركة"
                  />
                </DataTable>
              </div>
            </div>
            <div className={styles.ButnsSection}>
              <Button
                label="أضافة  "
                // icon="pi pi-external-link"
                onClick={() => onClick("AddProduct")}
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
                onClick={() => {
                  if (id) {
                    DeleteHandeller();
                  }
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <>
        <Dialog
          header="اضافة منتج جديد"
          visible={AddProduct}
          onHide={() => onHide("AddProduct")}
          breakpoints={{ "960px": "99vw" }}
          style={{ width: "50vw" }}
          footer={renderFooter("AddProduct")}
        >
          <div className={styles.Dialog_Content}>
            <Dropdown
              value={selectedCats}
              options={ParentCats}
              onChange={onDropCatsChange}
              optionLabel="name"
              filter
              filterBy="name"
              placeholder="اختار المجموعة"
              valueTemplate={selectedCatsTemplate}
              itemTemplate={countryOptionTemplate}
              className={styles.DialogDrop}
            />
            <div className={styles.input_Section}>
              <label htmlFor="ord"> الترتيب</label>
              <input
                type={"number"}
                id="ord"
                value={ord}
                onChange={(e) => setOrd(e.target.value)}
              />
            </div>

            <div className={styles.select_div}>
              <label htmlFor="img">اضف صورة رأسية </label>
              <input
                type="file"
                // style={{ visibility: "hidden" }}
                id="img"
                name="img"
                accept="image/*"
                onChange={(e) => {
                  UploadVerticalImage(e.target.files[0]);
                }}
              />
            </div>
            <div className={styles.select_div}>
              <label htmlFor="img">اضف صورة أفقية </label>
              <input
                type="file"
                // style={{ visibility: "hidden" }}
                id="img"
                name="img"
                accept="image/*"
                onChange={(e) => {
                  UploadsetHorizontalImage(e.target.files[0]);
                }}
              />
            </div>
          </div>
        </Dialog>
        {/* Update */}
        <Dialog
          header="اضافة منتج جديد"
          visible={UpdateDialog}
          onHide={() => onHide("UpdateDialog")}
          breakpoints={{ "960px": "99vw" }}
          style={{ width: "50vw" }}
          footer={renderUpdateFooter("UpdateDialog")}
        >
          <div className={styles.Dialog_Content}>
            <Dropdown
              value={selectedCats}
              options={ParentCats}
              onChange={onDropCatsChange}
              optionLabel="name"
              filter
              filterBy="name"
              placeholder="اختار المجموعة"
              valueTemplate={selectedCatsTemplate}
              itemTemplate={countryOptionTemplate}
              className={styles.DialogDrop}
            />
            <div className={styles.input_Section}>
              <label htmlFor="ord"> الترتيب</label>
              <input
                type={"number"}
                id="ord"
                value={ord}
                onChange={(e) => setOrd(e.target.value)}
              />
            </div>

            <div className={styles.select_div}>
              <label htmlFor="img">اضف صورة رأسية </label>
              <input
                type="file"
                // style={{ visibility: "hidden" }}
                id="img"
                name="img"
                accept="image/*"
                onChange={(e) => {
                  UploadVerticalImage(e.target.files[0]);
                }}
              />
            </div>
            <div className={styles.select_div}>
              <label htmlFor="img">اضف صورة أفقية </label>
              <input
                type="file"
                // style={{ visibility: "hidden" }}
                id="img"
                name="img"
                accept="image/*"
                onChange={(e) => {
                  UploadsetHorizontalImage(e.target.files[0]);
                }}
              />
            </div>
          </div>
        </Dialog>
      </>
    </div>
  );
};

export default WebsiteBanars;
