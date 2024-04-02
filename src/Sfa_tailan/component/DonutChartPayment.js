import React, { useState, useEffect, useRef } from "react";
import css from "./donutChart.module.css";
import { IgrDoughnutChart, IgrRingSeries, IgrItemLegend } from "igniteui-react-charts";

import { IgrDoughnutChartModule } from "igniteui-react-charts";
import { IgrItemLegendModule } from "igniteui-react-charts";
import { IgrRingSeriesModule } from "igniteui-react-charts";

IgrDoughnutChartModule.register();
IgrRingSeriesModule.register();
IgrItemLegendModule.register();

export function DonutChartPayment(props) {
  const {
    totalAmount,
    belenTotal,
    dansTotal,
    zeelTotal,
    belenDansTotal,
    belenZeelTotal,
    dansZeelTotal,
  } = props;

  const belenPercent = Number(((belenTotal * 100) / totalAmount).toFixed(1));
  const dansPercent = Number(((dansTotal * 100) / totalAmount).toFixed(1));
  const zeelPercent = Number(((zeelTotal * 100) / totalAmount).toFixed(1));
  const belenDansPercent = Number(((belenDansTotal * 100) / totalAmount).toFixed(1));
  const belenZeelPercent = Number(((belenZeelTotal * 100) / totalAmount).toFixed(1));
  const dansZeelPercent = Number(((dansZeelTotal * 100) / totalAmount).toFixed(1));

  const formattedBelenTotal = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(belenTotal);

  const formattedDansTotal = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(dansTotal);

  const formattedZeelTotal = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(zeelTotal);

  const formattedBelenDansTotal = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(belenDansTotal);

  const formattedBelenZeelTotal = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(belenZeelTotal);

  const formattedDansZeelTotal = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(dansZeelTotal);

  const [data, setData] = useState([
    {
      MarketShare: 0,
      Category: "empty",
      Summary: ``,
    },
  ]);

  useEffect(() => {
    setData([
      {
        MarketShare: belenPercent,
        Category: "Бэлэн мөнгө",
        Summary: `${formattedBelenTotal}(${belenPercent}%)`,
      },
      {
        MarketShare: dansPercent,
        Category: "Данс",
        Summary: `${formattedDansTotal}(${dansPercent}%)`,
      },
      {
        MarketShare: zeelPercent,
        Category: "Зээл",
        Summary: `${formattedZeelTotal}(${zeelPercent}%)`,
      },
      {
        MarketShare: belenDansPercent,
        Category: "Бэлэн & Данс",
        Summary: `${formattedBelenDansTotal}(${belenDansPercent}%)`,
      },
      {
        MarketShare: belenZeelPercent,
        Category: "Бэлэн & Зээл",
        Summary: `${formattedBelenZeelTotal}(${belenZeelPercent}%)`,
      },
      {
        MarketShare: dansZeelPercent,
        Category: "Данс & Зээл",
        Summary: `${formattedDansZeelTotal}(${dansZeelPercent}%)`,
      },
    ]);
  }, [
    totalAmount,
    belenTotal,
    dansTotal,
    zeelTotal,
    belenDansTotal,
    belenZeelTotal,
    dansZeelTotal,
  ]);

  const [selectedSliceLabel, setSelectedSliceLabel] = useState(data[0].Category);
  const [selectedSliceValue, setSelectedSliceValue] = useState(data[0].Summary);

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
    <div className={`${css.hello} sample`}>
      <div className={`${css.container} relative`}>
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
              dataSource={data}
              labelMemberPath="Summary"
              labelsPosition="OutsideEnd"
              brushes="#ff9b85 #aaf683 #ffd97d #b8b8ff #00bbf9 #ea3c63"
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
        <span className={`${css.legend_title} `}>Payment type</span>
        <div className={`${css.legend} `}>
          <IgrItemLegend ref={legendRef} orientation="Horizontal" />
        </div>
      </div>
    </div>
  );
}
