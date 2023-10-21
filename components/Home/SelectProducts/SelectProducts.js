import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "styles/Home.module.css";
// import ProdcutCard from "../../ProdcutCard/ProdcutCard";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const ProdcutCard = dynamic(() => import("../../ProdcutCard/ProdcutCard"), {
  loading: () => <p>Loading ...</p>,
});
const SelectProducts = ({ Banar }) => {
  const router = useRouter()
  const { Url } = useSelector((state) => state.HomeSlice);
  const [productsSta, setProducts] = useState([]);
  const [color, setColor] = useState(null);
  const [mainProducts, setMainProducts] = useState(null);
  const [max, setMax] = useState(0);
  useEffect(() => {
    setMax(window.innerWidth);
    // console.log(max)
    if (!color) {
      setColor(Banar.cats[0].id);
    }
    if (!mainProducts) {
      setMainProducts(Banar.products);
    }
  }, [color, Banar.cats, mainProducts, Banar.products, max]);
  // useEffect(() => {
  //   Aos.init({
  //     duration: 700,
  //     delay: 20,
  //     // once: true,
  //   });
  // },[]);
  const productsRes =
    max >= 700 ? productsSta.slice(0, 10) : productsSta.slice(0, 4);
  // console.log(productsRes)
  // const mobile =
  //   mainProducts &&
  //   mainProducts.slice(0, 4).map((ele, idx) => {
  //     return (
  //       <Col key={idx} xs={6} md={2} className={styles.colMar}>
  //         <ProdcutCard
  //           name={ele.name}
  //           img={ele.image}
  //           id={ele.id}
  //           type="pro"
  //           catName={ele.catName}
  //         />
  //       </Col>
  //     );
  //   });

  // const website =
  //   mainProducts &&
  //   mainProducts.slice(0, 10).map((ele, idx) => {
  //     return (
  //       <Col key={idx} xs={6} md={2} className={styles.colMar}>
  //         <ProdcutCard
  //           name={ele.name}
  //           img={ele.imgs.imgs[0]}

  //           id={ele.id}
  //           type="pro"
  //           catName={ele.catName}
  //         />
  //       </Col>
  //     );
  //   });

  const prod = Banar.products.map((ele, idx) => {
    return (
      <Col key={idx} xs={6} md={2} className={styles.colMar}>
        <ProdcutCard
          name={ele.name}
          img={ele.imgs.imgs[0]}

          id={ele.id}
          type="pro"
          catName={ele.catName}
        />
      </Col>
    );
  });

  // : mainProducts  && max <= 700 && mainProducts.slice(0, 10).map((ele, idx) => {
  //   return (
  //     <Col key={idx} xs={6} md={2} className={styles.colMar}>
  //       <ProdcutCard
  //         name={ele.name}
  //         img={ele.image}
  //         id={ele.id}
  //         type="pro"
  //         catName={ele.catName}
  //       />
  //     </Col>
  //   );
  // })

  // const fristPro = fristProRes.map((ele, idx) => {
  //   return (
  //     <Col key={idx} xs={6} md={2} className={styles.colMar}>
  //       <ProdcutCard
  //         name={ele.name}
  //         img={ele.images[0]}
  //         id={ele.id}
  //         type="pro"
  //         catName={ele.catName}
  //       />
  //     </Col>
  //   );
  // });
  const categ = Banar.cats.slice(0, 4).map((ele, idx) => {
    return (
      <button
        key={idx}
        onClick={() => getdata(ele.id)}
        style={{
          backgroundColor: `${color === ele.id ? "#C72527" : "transparent"} `,
          color: `${color === ele.id ? "white" : "black"} `,
        }}
      >
        {ele.name}
      </button>
    );
  });

  const getdata = async (id) => {
    setColor(id);
    const data = await axios
      .post(`${Url}/rest/test.product/getproductJson/`, {
        id,
        page: 0,
      })
      .then((res) => res.data.products);
    setProducts(data);
  };

  return (
    <>
      <div
        className={styles.BanarContainer}
        onClick={() => router.push(`shop/${Banar.catId}/${Banar.catId}/${Banar.name.replace(
          /\s/g,
          "-"
        )}`)}
        //  data-aos="flip-up"
        //  data-aos-easing="ease-in-out"
        //  data-aos-mirror="true"
        //  data-aos-once="true"
        //  data-aos-anchor-placement="top-center"
      >
        <Image
          src={`${Url}/imgs?id=${Banar.horizontalImage}`}
          alt={Banar.horizontalImage}
          layout={"fill"}
          objectFit="cover"
        />
      </div>

      <Row>
        <Col md={2}>
          <span className={`text-center ${styles.mainLink}`}>
            <Link
              href={`shop/${Banar.catId}/${Banar.catId}/${Banar.name.replace(
                /\s/g,
                "-"
              )}`}
            >
              {Banar.name}
            </Link>
          </span>
          <div
            className={styles.BanarContainer2}
            //  data-aos="flip-up"
            //  data-aos-easing="ease-in-out"
            //  data-aos-mirror="true"
            //  data-aos-once="true"
            //  data-aos-anchor-placement="top-center"
            onClick={() => router.push(`shop/${Banar.catId}/${Banar.catId}/${Banar.name.replace(
              /\s/g,
              "-"
            )}`)}
          >
            <Image
              src={`${Url}/imgs?id=${Banar.verticalImage}`}
              alt={Banar.verticalImage}
              layout={"fill"}
              objectFit="cover"
            />
          </div>
        </Col>
        <Col md={10}>
          <div className={styles.catTAbs}>{categ}</div>
          <div
            className={styles.proCont}
            // data-aos="flip-up"
            // data-aos-easing="ease-in-out"
            // data-aos-mirror="true"
            // data-aos-once="true"
            // data-aos-anchor-placement="top-center"
          >
            <Row>
              {[...productsSta].length > 0
                ? productsRes.map((ele, idx) => {
                    // console.log(ele.images[0])
                    return (
                      <Col key={idx} xs={6} md={2} className={styles.colMar}>
                        <ProdcutCard
                          name={ele.name}
                          img={ele.imgs.imgs[0]}
                          // img={ele.images[0]}
                          id={ele.id}
                          type="pro"
                          catName={ele.catName}
                        />
                      </Col>
                    );
                  })
                : prod}

              {/* {prod} */}

              {/* {
                  [...productsSta].length <= 0 &&  max <= 700 ? mobile : null
                }
                {
                  [...productsSta].length <= 0 &&  max > 700 ?  website : null
                } */}
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SelectProducts;
