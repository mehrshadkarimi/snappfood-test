import React from "react";
import styles from "./vendorCard.module.scss";
import Image from "next/image";
import formatAndConvertToPersian from "@/helpers/numberFormatter";

type TVendorCard = {
  title: string;
  rate: string | number;
  voteCount: string | number;
  deliveryFee: string | number;
  backgroundImage: string;
  logo: string;
  badges?: { title: string }[];
  discountValueForView: string;
  is_pro: boolean;
};

const VendorCard = ({
  title,
  rate,
  voteCount,
  deliveryFee,
  backgroundImage,
  logo,
  badges,
  discountValueForView,
  is_pro,
}: TVendorCard) => {
  return (
    <div className={styles.container}>
      <section>
        <header>
          <div className={styles.coverContainer}>
            <Image
              src={backgroundImage}
              alt="cover"
              objectFit="cover"
              placeholder="empty"
              fill
              quality={100}
              className={styles.cover}
            />
            <div
              className={styles.logoContainer}
              style={{ backgroundColor: is_pro ? "#ff00a4" : "white" }}
            >
              <Image
                src={logo}
                alt="logo"
                placeholder="empty"
                width={50}
                height={50}
                className={styles.logo}
              />
            </div>
            {is_pro ? <div className={styles.pro}>Pro</div> : null}
          </div>
        </header>
        <div className={styles.content}>
          <div className={styles.firstRow}>
            <div className={styles.titleContainer}>
              <div>{title}</div>
              {discountValueForView ? (
                <div className={styles.discountBadge}>
                  <span>تا</span>
                  <span>{formatAndConvertToPersian(discountValueForView)}</span>
                  <span>%</span>
                </div>
              ) : null}
            </div>
            <div className={styles.vote}>
              <span>{formatAndConvertToPersian(voteCount)}</span>
              <i className="material-symbols-outlined">star</i>
              {formatAndConvertToPersian(rate)}
            </div>
          </div>
          <div className={styles.deliveryFee}>
            <span>
              پیک
              {` ${
                badges?.[0]?.title === "ارسال با اسنپ فود"
                  ? "اسنپ فود"
                  : "رستوران"
              }`}
              :
            </span>
            <span>
              {deliveryFee
                ? `${formatAndConvertToPersian(deliveryFee)} تومان`
                : "رایگان"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendorCard;
