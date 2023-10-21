import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import styles from "styles/Admin/Cats.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  GetALLProducts,
  getClientss,
  getUnAvailableProducts,
  GtALlCats,
  updateProduct,
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
import { Checkbox } from "primereact/checkbox";
import { useRouter } from "next/router";

const UnAvailable = () => {
  const dispatch = useDispatch();
  const { ProvClientssArr, AllCatsArr, ALLProducts, UnAvailableProductsArr } = useSelector(
    (state) => state.ControlPanal
  );
  const { Url } = useSelector((state) => state.HomeSlice);

  const [globalFilterValue2, setGlobalFilterValue2] = useState("");
  const router = useRouter();
  useEffect(() => {
    const ISAdmin = window.localStorage.getItem("ib_Admin");
    if (ISAdmin !== "true" || !ISAdmin) {
      router.push("/");
    } else {
      if (!ALLProducts) {
        // dispatch(GetALLProducts());
        dispatch(getUnAvailableProducts());
      }

      if (!AllCatsArr) {
        dispatch(GtALlCats());
      }
      if (!ProvClientssArr) {
        dispatch(getClientss());
      }
    }
  }, [router, dispatch, ProvClientssArr, AllCatsArr, ALLProducts]);

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
  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.name}`}>
        {rowData.catName}
      </span>
    );
  };
  const statusRowFilterTemplate = (options) => {
    // console.log(options)
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
        placeholder="اختار التصنيف"
        className="p-column-filter"
        showClear
      />
    );
  };
  // const UnAvailableProductsArr =
  //   ALLProducts && ALLProducts.filter((ele) => ele.available === false);

  const statuses =
    UnAvailableProductsArr && UnAvailableProductsArr.map((a) => a.catName);
  // console.log(statuses)
  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const CompBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.company}`}>
        {rowData.company}
      </span>
    );
  };

  // CodeBody
  const CodeBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.code}`}>
        {rowData.code}
      </span>
    );
  };
  // imagesBody
  const imagesBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.code}`}>
        {rowData.images.map((ele, idx) => {
          return (
            <div className={styles.imageCOntainer} key={idx}>
              <Image
                src={`${Url}/imgs?id=${ele}`}
                width={30}
                height={30}
                alt={idx}
                blurDataURL="blur"
              />
            </div>
          );
        })}
      </span>
    );
  };

  const SpacificimagesBody = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.code}`}>
        <div className={styles.imageCOntainer}>
          <Image
            src={`${Url}/imgs?id=${rowData.images[0]}`}
            width={100}
            height={100}
            alt={rowData.images[0]}
          />
        </div>
      </span>
    );
  };

  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    company: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    catName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    // 'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
  });
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const [companyID, setCompanyID] = useState("");
  const [catID, setCatID] = useState("");
  const [checked, setChecked] = useState(false);
  const [ProductID, setProductId] = useState("");
  const [updataName, setUpdateName] = useState("");
  const [updataCode, setUpdateCode] = useState("");
  const [updataDescription, setUpdateDescription] = useState("");
  const [updataImages, setUpdateImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const UploadUpdateImges = (file) => {
    // console.log(file[0]);
    const test = [...file];
    // console.log(test);
    test.map((ele) => {
      const reader = new FileReader();
      reader.readAsDataURL(ele);
      return (reader.onload = () => {
        // Make a fileInfo Object
        const baseURL = reader.result;
        const position = baseURL.search("base64,");
        const res = baseURL.slice(position + 7);
        setUpdateImages((current) => [...current, res]);
      });
    });
  };

  const SendUpdateData = () => {
    const data = {
      companyId: parseInt(companyID),
      catId: parseInt(catID),
      id: ProductID,
      name: updataName,
      code: updataCode,
      active: +checked,
      description: updataDescription,
      images: updataImages,
    };
    // console.log(data)
    dispatch(updateProduct(data))
      .unwrap()
      .then(() => {
        dispatch(GetALLProducts());
      });
  };

  const [UpdateDialog, SetUpdateDialog] = useState(false);
  const [selectedComp, setSelectedComp] = useState(null);

  const selectedCompTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };
  const ParentCats =
    AllCatsArr && Array.from(new Set(AllCatsArr.map((a) => a)));
  const AllCompanies = ProvClientssArr && ProvClientssArr.map((a) => a);
  const onDropCompChange = (e) => {
    setSelectedComp(e.value);
    setCompanyID(e.value.code);
  };

  const onSelectedComTest = (e) => {
    const seletedTest = AllCompanies.filter(
      (ele) => ele.code === parseFloat(e.companyId)
    );
    const selectedCatTest = ParentCats.filter((ele) => ele.id === e.catId);
    setSelectedComp(seletedTest[0]);
    setSelectedCats(selectedCatTest[0]);

  };
  const companyOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.name}</div>
      </div>
    );
  };
  const [selectedCats, setSelectedCats] = useState(null);
  const onDropCatsChange = (e) => {
    // console.log(e.value)
    setSelectedCats(e.value);
    setCatID(e.value.id);
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
  // UPDATE Dialog
  const renderUpdateFooter = (name) => {
    return (
      <div lassName={styles.fotter_Btn}>
        <Button
          label="الغاء"
          // icon="pi pi-times"
          onClick={() => {
            onHide(name);
          }}
          className="p-button-text"
        />
        <Button
          label="حفظ"
          // icon="pi pi-check"
          onClick={() => {
            onHide(name);
            // UpdateData();
            SendUpdateData();
          }}
          autoFocus
        />
      </div>
    );
  };
  const onClick = (name) => {
    dialogFuncMap[`${name}`](true);
  };
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };
  const dialogFuncMap = {
    UpdateDialog: SetUpdateDialog,
  };
  const activeData = () => {
    const data = {
      companyId: parseInt(companyID),
      catId: parseInt(catID),
      id: ProductID,
      name: updataName,
      code: updataCode,
      active: 1,
      description: updataDescription,
      images: updataImages,
    };
    dispatch(updateProduct(data))
      .unwrap()
      .then(() => {
        dispatch(getUnAvailableProducts());
      });
    // console.log(data)
  };
  return (
    <div className={styles.Mcp}>
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
                    onSelectedComTest(e.value)
                    setSelectedProduct1(e.value);
                    setCompanyID(e.value.companyId);
                    setCatID(e.value.catId);
                    setProductId(e.value.id);
                    // setUpdateCompanyID(e.value.id);
                    // setUpdateCatID(e.value.id);
                    setUpdateName(e.value.name);
                    setUpdateCode(e.value.code);
                    setUpdateDescription(e.value.description);
                    setOldImages(e.value.images);
                    setChecked(e.value.available);
                  }}
                  value={UnAvailableProductsArr}
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
                    header="الشركة"
                    filterField="company"
                    body={CompBody}
                    style={{ minWidth: "12rem" }}
                    filter
                    filterPlaceholder="ادخل اسم الشركة"
                  />
                  <Column
                    header="الكود"
                    filterField="code"
                    body={CodeBody}
                    style={{ minWidth: "12rem" }}
                    filter
                    filterPlaceholder="ادخل كود المنتج"
                  />
                  <Column
                    field="catName"
                    header="التصنيف"
                    showFilterMenu={false}
                    filterMenuStyle={{ width: "14rem" }}
                    style={{ minWidth: "12rem" }}
                    body={statusBodyTemplate}
                    filter
                    filterElement={statusRowFilterTemplate}
                  />
                  <Column
                    field="images"
                    header="الصور"
                    showFilterMenu={false}
                    filterMenuStyle={{ width: "14rem" }}
                    style={{ minWidth: "12rem" }}
                    body={imagesBody}
                  />
                  <Column
                    field="images"
                    header="الصورة المختارة"
                    showFilterMenu={false}
                    filterMenuStyle={{ width: "14rem" }}
                    style={{ minWidth: "12rem" }}
                    body={SpacificimagesBody}
                  />
                </DataTable>
              </div>
            </div>
            <div className={styles.ButnsSection}>
              <Button
                label="تعديل "
                onClick={() => {
                  selectedProduct1 && onClick("UpdateDialog");
                }}
              />
              <Button
                label="تفعيل"
                onClick={() => {
                  activeData();
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <>
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
              value={selectedComp}
              options={AllCompanies}
              onChange={onDropCompChange}
              optionLabel="parentName"
              filter
              filterBy="parentName"
              placeholder="اختار الشركة"
              valueTemplate={selectedCompTemplate}
              itemTemplate={companyOptionTemplate}
              className={styles.DialogDrop}
            />
            <Dropdown
              value={selectedCats}
              options={ParentCats}
              onChange={onDropCatsChange}
              optionLabel="parentName"
              filter
              filterBy="parentName"
              placeholder="اختار المجموعة"
              valueTemplate={selectedCatsTemplate}
              itemTemplate={countryOptionTemplate}
              className={styles.DialogDrop}
            />

            <div className={styles.input_Section}>
              <label htmlFor="name"> الاسم</label>
              <input
                type={"text"}
                id="name"
                value={updataName}
                onChange={(e) => setUpdateName(e.target.value)}
              />
            </div>
            <div className={styles.input_Section}>
              <label htmlFor="code"> الكود</label>
              <input
                type={"number"}
                id="code"
                value={updataCode}
                onChange={(e) => setUpdateCode(e.target.value)}
              />
            </div>
            <div className={styles.input_Section}>
              <Checkbox
                inputId="binary"
                checked={checked}
                onChange={(e) => {
                  setChecked(e.checked);
                }}
              />
              <label htmlFor="binary" className={styles.labelcheck}>
                متاح
              </label>
            </div>
            <div className={styles.input_Section}>
              <label htmlFor="description"> الوصف</label>
              <textarea
                id="description"
                rows="5"
                cols="50"
                width={100}
                value={updataDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
              />
            </div>

            <div className={styles.select_div}>
              <label htmlFor="img">اضف الصور </label>
              <input
                type="file"
                // style={{ visibility: "hidden" }}
                id="img"
                name="img"
                multiple={true}
                accept="image/*"
                onChange={(e) => {
                  UploadUpdateImges(e.target.files);
                }}
              />
              <div className={styles.image_container}>
                {updataImages.length > 0 ? (
                  <div className={styles.imageCOntainer}>
                    {updataImages.map((ele, idx) => {
                      return (
                        <Image
                          key={idx}
                          src={`data:image/jpeg;base64,${ele}`}
                          width={50}
                          height={50}
                          alt={"update"}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className={styles.imageCOntainer}>
                    {oldImages.map((ele, idx) => {
                      return (
                        <Image
                          key={idx}
                          src={`${Url}/imgs?id=${ele}`}
                          width={50}
                          height={50}
                          alt={"update"}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog>
      </>
    </div>
  );
};

export default UnAvailable;
