import Image from "next/image";
import { useRouter } from "next/router";
import {useSelector } from "react-redux";
import styels from "styles/ProductCard.module.css";
import Link from "next/link";
import React from 'react'

const MatgerCard = ({ name, img, id }) => {
  const { Url } = useSelector((state) => state.HomeSlice);
  const router = useRouter();
  const PathName = name.replace(/\s/g, "-");
  return (
    <div>
      
      <div className={styels.productCard} aria-hidden="true">
        <div className={styels.imageCard}>
          <Image
            src={`${Url}/imgs?id=${img}`}
            layout="responsive"
            width={300}
            height={300}
            title={name}
            alt={name}
            onClick={() => {
              router.push({
                pathname: `/company/${id}/${PathName}`,
              });
            }}
          />
          {/* {type === "pro" || type === "pro2" ? (
            <div className={styels.icons}>
              <span
                onClick={() => AddToCartHandeler()}
                className={styels.addIcon}
              >
                <AiOutlineShoppingCart />
              </span>
              <span
                onClick={() => {
                  router.push({
                    pathname: `/company/${id}/${PathName}`,
                  });
                }}
              >
                <AiFillEye />
              </span>
            </div>
          ) : null} */}
        </div>
       <div aria-hidden="true">
       <Link
          href={` /company/${id}/${PathName}`}
        >
          <a className={styels.name}>{name}</a>
        </Link>
       </div>
       
        
      </div>
    </div>
  );
};

export default MatgerCard;
