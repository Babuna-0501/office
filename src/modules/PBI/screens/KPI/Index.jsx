import { useMemo } from "react";
import css from "./styles.module.css";

export const KPI = ({ orders, setSelectedMonth }) => {
  const totalStat = useMemo(() => {
    const result = {
      title: "Нийт дүн",
    };

    return result;
  }, [orders]);
  const deliveredStat = useMemo(() => {
    const result = {
      title: "Нийт дүн",
    };

    return result;
  }, [orders]);
  const merchantStat = useMemo(() => {
    const result = {
      title: "Нийт дүн",
    };

    return result;
  }, [orders]);
  const percentageStat = useMemo(() => {
    const result = {
      title: "Нийт дүн",
    };

    return result;
  }, [orders]);

  return (
    <div className={css.container}>
      <div className={css.row}>
        <KPIChart stat={totalStat} />
        <KPIChart stat={deliveredStat} />
      </div>
      <div className={css.row}>
        <KPIChart stat={merchantStat} />
        <KPIChart stat={percentageStat} />
      </div>
    </div>
  );
};

const KPIChart = ({ stat }) => {
  return (
    <div className={css.chartContainer}>
      <h3 className={css.chartTitle}>{stat.title}</h3>

      <div className={css.chartContent}>
        <div className={css.chartIndicators}>
          <div className={`${css.singleIndicator} ${css.past}`}>2022</div>
          <div className={`${css.singleIndicator} ${css.present}`}>2023</div>
          <div className={`${css.singleIndicator} ${css.future}`}>Төлөвлөгөө</div>
        </div>

        <div className={css.chartBody}>
          <ul className={css.yAxis}>
            <li>
              <span>6bn</span>
            </li>
            <li>
              <span>4bn</span>
            </li>
            <li>
              <span>2bn</span>
            </li>
            <li>
              <span>0bn</span>
            </li>
          </ul>

          <ul className={css.xAxis}>
            <li>January</li>
            <li>February</li>
            <li>March</li>
            <li>April</li>
            <li>May</li>
            <li>June</li>
            <li>July</li>
            <li>August</li>
            <li>September</li>
            <li>October</li>
            <li>November</li>
            <li>December</li>
          </ul>

          <div className={css.charts}>
            <div className={css.singleChartWrapper}>
              <div className={`${css.singleChart} ${css.past}`} style={{ height: "75%" }}></div>
              <div className={`${css.singleChart} ${css.present}`} style={{ height: "67%" }}></div>
              <div className={`${css.singleChart} ${css.future}`} style={{ height: "33%" }}>
                <span>2390.5M</span>
                <div className={css.singleChartPopover}>
                  <div className={css.triangle} />
                  <div className={css.popOverContent}>
                    <div className={css.titles}>
                      <span>Сар</span>
                      <span>Төлөвлөгөө</span>
                    </div>
                    <div className={css.infos}>
                      <p>January</p>
                      <p>1,234,123</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
