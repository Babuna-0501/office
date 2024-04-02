import React, { useState, useEffect, useRef } from "react";
import css from "./donutChart.module.css";
import { IgrDoughnutChart, IgrRingSeries, IgrItemLegend } from "igniteui-react-charts";

import { IgrDoughnutChartModule } from "igniteui-react-charts";
import { IgrItemLegendModule } from "igniteui-react-charts";
import { IgrRingSeriesModule } from "igniteui-react-charts";

IgrDoughnutChartModule.register();
IgrRingSeriesModule.register();
IgrItemLegendModule.register();

const oldData = [{ MarketShare: 100, Category: "...", Summary: "" }];

export function DonutChartBrand(props) {
  const { amounts, brands, totalAmount } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    let newDatas = [];
    if (amounts) {
      amounts.map((hello) => {
        const percent = Number(((hello.amount * 100) / totalAmount).toFixed(1));

        if (hello.id === 0) {
          newDatas.push({
            MarketShare: percent,
            Category: "Брэндгүй",
            Summary: `${new Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
            }).format(hello.amount)} (${percent}%)`,
          });
        } else {
      brands?.map((brand) => {
        if (brand.BrandID === hello.id) {
          const filteredCate = brands.filter((brand) => brand.BrandID === hello.id);
          newDatas.push({
            MarketShare: percent,
            Category: `${filteredCate[0].BrandName}`,
            Summary: `${new Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
            }).format(hello.amount)} (${percent}%)`,
          });
        }
      });
        }
      });
    }
    setTimeout(() => {
      setData(newDatas);
    }, "100");
  }, [amounts, brands, totalAmount]);

  const [selectedSliceLabel, setSelectedSliceLabel] = useState(oldData[0]?.Category);
  const [selectedSliceValue, setSelectedSliceValue] = useState(oldData[0]?.Summary);

  const chartRef = useRef(null);
  const legendRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.actualSeries[0].legend = legendRef.current;
      if (chartRef.current.actualSeries && chartRef.current.actualSeries.length > 0) {
        let series = chartRef.current.actualSeries[0];
        series.selectedSlices.add(0);
      }
    }
  }, []);

  const onSliceClick = (s, e) => {
    if (e.isSelected) {
      setSelectedSliceLabel(e.dataContext.Category);
      setSelectedSliceValue(e.dataContext.Summary);
    } else {
      setSelectedSliceLabel("No Selection");
      setSelectedSliceValue("0%");
    }
  };

  return (
    <div className={`${css.hello} ${css.sample}`}>
      <div className={`${css.container} ${css.relative}`}>
        <div className={`${css.container_overlay} `}>
          <IgrDoughnutChart
            ref={chartRef}
            width="100%"
            height="100%"
            allowSliceSelection="true"
            innerExtent={0.7}
            sliceClick={onSliceClick}
          >
            <IgrRingSeries
              name="ring1"
              dataSource={data.length > 0 ? data : oldData}
              labelMemberPath="Summary"
              labelsPosition="OutsideEnd"
              labelExtent={30}
              valueMemberPath="MarketShare"
              legendLabelMemberPath="Category"
              radiusFactor={0.6}
              startAngle={30}
            />
          </IgrDoughnutChart>

          <div className={`${css.overlay_center}`} style={{ lineHeight: 0.7 }}>
            <label className={`${css.options_label}`}>{selectedSliceLabel}</label>
            <label className={`${css.options_label} `}>{selectedSliceValue}</label>
          </div>
        </div>
      </div>

      <div className={`${css.options} ${css.vertical}`}>
        <span className={`${css.legend_title} `}>Brand</span>
        <div className={`${css.legend} `}>
          <IgrItemLegend ref={legendRef} orientation="Vertical" />
        </div>
      </div>
    </div>
  );
}
