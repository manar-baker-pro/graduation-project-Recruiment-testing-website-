import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ActivateCompany,
  GetCNA,
} from "../../../../setup/store/actionsCreators/companyActionCreators/companyActionCreater";
import { RootState } from "../../../../setup/store/store";
import styles from "../../adminDash.module.css";
import anonymous from "../../../../../public/assets/images/Developer.png";
import { Company } from "../../../../setup/store/actions/company.Actions";
export default function COMPNOTACTIVE() {
  const dispatch = useDispatch();
  const comp = useSelector((state: RootState) => state.companyReducer);
  const { CNADa } = comp;
  useEffect(() => {
    dispatch(GetCNA());
    // console.log(CNADa);
  }, [dispatch]);
  const handleClick = () => {
    console.log(CNADa);
  };
  return (
    <div className={styles.CNAContainer}>
      <div className={styles.TitleList} onClick={handleClick}>
        InActive Companies
      </div>
      <div className={styles.CNAlist}>
        {}
        {CNADa?.map((CNA, CNAIndex) => {
          return (
            <div key={CNAIndex} className={styles.CNAitem}>
              <div className={styles.cardTop}>
                <img src={anonymous} />
                <div className={styles.companyTitle}>
                  {CNA.companyName}
                </div>{" "}
              </div>

              <div className={styles.btnContainer}>
                <button
                  className={`${styles.btnCNA} ${styles.activate}`}
                  onClick={() => {
                    dispatch(ActivateCompany(CNA?._id));
                  }}
                >
                  Activate
                </button>{" "}
                <button className={`${styles.btnCNA} ${styles.ignore}`}>
                  {" "}
                  Ignore
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
