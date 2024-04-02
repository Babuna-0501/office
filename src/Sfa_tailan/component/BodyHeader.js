import css from "../sfa_tailan.module.css";

export const BodyHeader = (props) => {
  const {
    totalAmount,
    goalAmount,
    belenTotal,
    dansTotal,
    merchantLength,
    totalQuantity,
    goalMerchants,
    topDistricts,
  } = props;

  const formattedTotalAmount = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(totalAmount);

  const formattedBelenTotal = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(belenTotal);

  const formattedDansTotal = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(dansTotal);

  return (
    <div className={`${css.bodyHeader}  ${css.chartParentRow}`}>
      <div className={css.Indicators}>
        <div className={css.indicatorPart}>
          <div className={css.indicatorChild}>
            <p>Мерчант</p>
            <p
              style={{
                color: merchantLength * 100 > goalMerchants * 80 ? "green" : "red",
                fontWeight: "800",
              }}
            >
              {merchantLength}!
            </p>
            <p>Goal : {goalMerchants}</p>
          </div>
          <div className={css.indicatorChild}>
            <p>Нийт</p>
            <p
              style={{
                color: totalAmount * 100 > goalAmount * 80 ? "green" : "red",
                fontWeight: "800",
              }}
            >
              {formattedTotalAmount}
            </p>
            <p>
              Goal :{" "}
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "short",
              }).format(goalAmount)}
            </p>
          </div>
          <div className={css.indicatorChild}>
            <p>...</p>
            <p>Хүргэлтийн хувь</p>
          </div>
        </div>
        <div className={css.indicatorPart}>
          <div className={css.indicatorChild}>
            <p
              style={{
                fontWeight: "800",
              }}
            >
              {formattedTotalAmount}
            </p>
            <p>Нийт дүн</p>
          </div>
          <div className={css.indicatorChild}>
            <p
              style={{
                fontWeight: "800",
              }}
            >
              {formattedBelenTotal}
            </p>
            <p>Бэлэн мөнгө</p>
          </div>
          <div className={css.indicatorChild}>
            <p
              style={{
                fontWeight: "800",
              }}
            >
              {formattedDansTotal}
            </p>
            <p>Данс</p>
          </div>
          <div className={css.indicatorChild}>
            <p style={{ fontWeight: "800" }}>{totalQuantity.toFixed(3)}</p>
            <p>Тоо ш/кг</p>
          </div>
        </div>
      </div>

      {topDistricts.length > 0 ? (
        <div className={css.Districts}>
          <div className={`${css.districtBetter} ${css.districtTextStyle}`}>
            <div className={css.districtText}>{Object.keys(topDistricts[0])} </div>
            <div className={css.districtText}>{Object.values(topDistricts[0])}</div>
          </div>
          <div
            className={`${css.districtOther} ${css.districtTextStyle}`}
            style={{ backgroundColor: "#AAF683" }}
          >
            <div className={css.districtText}>{Object.keys(topDistricts[1])}</div>
            <div className={css.districtText}>{Object.values(topDistricts[1])}</div>
          </div>
          <div
            className={`${css.districtOther} ${css.districtTextStyle}`}
            style={{ backgroundColor: "#FFD97D" }}
          >
            <div className={css.districtText}>{Object.keys(topDistricts[2])}</div>
            <div className={css.districtText}>{Object.values(topDistricts[2])}</div>
          </div>
          <div
            className={`${css.districtOther} ${css.districtTextStyle}`}
            style={{ backgroundColor: "#B8B8FF" }}
          >
            <div className={css.districtText}>{Object.keys(topDistricts[3])}</div>
            <div className={css.districtText}>{Object.values(topDistricts[3])}</div>
          </div>
          <div className={`${css.districtLess}`}>
            <div className={`${css.districtLessChild1} ${css.districtTextStyle}`}>
              <div className={css.districtText}>{Object.keys(topDistricts[4])}</div>
              <div className={css.districtText}>{Object.values(topDistricts[4])}</div>
            </div>
            <div className={`${css.districtLessChild2} ${css.districtTextStyle}`}>
              <div className={css.districtText}>{Object.keys(topDistricts[5])}</div>
              <div className={css.districtText}>{Object.values(topDistricts[5])}</div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={css.Districts}
          style={{ flexDirection: "column", justifyContent: "center", backgroundColor: "#60d394" }}
        >
          <p style={{ color: "#fff", fontWeight: "700", fontSize: "18px" }}>Хөдөө орон нутаг</p>
          <p style={{ color: "#fff", fontWeight: "700", fontSize: "18px" }}>
            {totalAmount.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};
