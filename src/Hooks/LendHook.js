import React, { useState, useEffect } from "react";
import myHeaders from "../components/MyHeader/myHeader";
const Ctx = React.createContext();

export const LendHook = (props) => {
  const [lendState, setLendState] = useState(false);
  const [switchState, setSwitchState] = useState(true);
  const [worker, setWorker] = useState(null);
  const [leasingLimit, setLeasingLimit] = useState(null);
  const [shopLeasing, setShopLeasing] = useState([
    {
      id: 0,
      value: 0,
    },
  ]);
  const [zoneIDS, setZoneIDS] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [zoneState, setZoneState] = useState(false);
  const [specilCustomer, setSpecilCustomer] = useState(false);
  const [specilZones, setSpecilZones] = useState(false);
  const [filteredZones, setFilteredZones] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [zoneModal, setZoneModal] = useState(false);
  const [customerModal, setCustomerModal] = useState(false);
  const [allShops, setAllShops] = useState([]);
  const [zonesMap, setZonesMap] = useState([]);
  const [zoneMap, setZoneMap] = useState([]);
  const [selectedZoneMaps, setSelectedZoneMaps] = useState([]);
  const [allDelguur, setAllDelguur] = useState([]);
  const [newData, setNewData] = useState([]);
  const [collectedShops, setCollectedShops] = useState([]);
  const [newWorkers, setNewWorkers] = useState(false);
  const [xtZones, setXtZones] = useState([]);
  const [zoneIDSAAA, setZoneIDSAAA] = useState([]);
  // console.log("merchants++++++++++++", allDelguur);
  // console.log("worker", worker);
  // console.log("shopleasing", shopLeasing);
  // console.log("workers", worker);
  useEffect(() => {
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let controller = new AbortController();
    fetch(`https://api2.ebazaar.mn/api/tradeshop/alldata`, requestOptions)
      .then((r) => r.json())
      .then((response) => {
        // console.log("response+++--- all data", response);

        let allShopsFirst = [];
        response?.result?.map(item => {
					if (item.g_latitude !== null && item.g_longtitude !== null) {
						allShopsFirst.push(item);
					}
				});
        setAllShops(allShopsFirst);
        setAllDelguur(allShopsFirst);
        controller = null;
      })
      .catch((error) => {
        console.log("Zone fetch from lend component error", error);
      });
    return () => controller?.abort();
  }, []);

  useEffect(() => {
    getResponse();
  }, []);

  useEffect(() => {
    // console.log("worker------------zones", worker);
    if (zoneState && worker.zones !== null) {
      let zoneDatasaaa = [];
      let url = `https://api2.ebazaar.mn/api/zones`;

      if (worker.zones.includes(",")) {
        worker.zones.split(",").map((item) => {
          url = url + `?id=${item}`;
          // console.log("url - neg", url);

          fetch(url, {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          })
            .then((r) => r.json())
            .then((response) => {
              zoneDatasaaa.push(response.data[0]);
            })
            .catch((error) => {
              console.log("error", error);
            });
        });
      } else {
        url = url + `?id=${worker.zones}`;
        // console.log("url - hoer", url);
        fetch(url, {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        })
          .then((r) => r.json())
          .then((response) => {
            zoneDatasaaa.push(response.data[0]);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }

      setXtZones(zoneDatasaaa);
    }
  }, [zoneState]);

  async function getResponse() {
    const response = await fetch(
      "https://api2.ebazaar.mn/api/sfa/users/tradeshop",
      {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          zoneId: "641d5e465778aae99db6903b",
          supplierId: 14014,
          employeeId: 689,
        }),
      }
    );
    if (!response.ok) {
      console.log("aldaa garlaa");
    }
    const data = await response.json();
  }

  useEffect(() => {
    let data = [];
    zoneMap.map((item) => {
      zonesMap.map((x) => {
        if (x._id === item.value) {
          data.push(x);
        }
      });
    });
    // console.log("data delguur", data);
    setSelectedZoneMaps(data);
  }, [zoneMap]);

  useEffect(() => {
    // console.log("worker", worker);
    if (worker?.leasing) {
      let ids = [];
      ids.push(Object.keys(worker?.leasing));
      // console.log("worker ---- worker", ids);
      ids[0]?.map((item) => {
        if (item !== "leasing_total") {
          // console.log("item", item);
          let tradeshopID = item.split("_")[0];
          let zoneID = item.split("_")[1];
          let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };
          setZoneIDSAAA((prev) => [...prev, zoneID]);
          fetch(
            `https://api2.ebazaar.mn/api/zones?id=${zoneID}`,
            requestOptions
          )
            .then((r) => r.json())
            .then((response) => {
              let bbb = [];
              allShops.map((x) => {
                const aa = ray_casting(
                  x,
                  response.data[0].polygons.coordinates[0]
                );

                if (aa) {
                  bbb.push({
                    id: `${x.t_id}_${Math.random() * 10000000000000000}`,
                    zone_id: response.data[0]._id,
                    zone_name: response.data[0].name,
                    ...x,
                    total_amount:
                      Number(tradeshopID) === Number(x.t_id)
                        ? worker.leasing[item].total_amount
                        : null,
                  });
                }
              });

              setAllDelguur([...allDelguur, ...bbb]);
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      });
    }
  }, [worker?.leasing]);
  // console.log("alldelguuriin urt", allDelguur.length);

  useEffect(() => {}, []);

  useEffect(() => {
    let bbb = [];
    selectedZoneMaps.map((z) => {
      allShops.map((item) => {
        // console.log("item allshops", item);

        const aa = ray_casting(item, z.polygons.coordinates[0]);
        if (aa) {
          bbb.push({
            id: `${item.t_id}_${Math.random() * 10000000000000000}`,
            zone_id: z._id,
            zone_name: z.name,
            ...item,
          });
        }
      });
    });
    // console.log("alldelguur", allDelguur);
    setAllDelguur([...allDelguur, ...bbb]);
  }, [selectedZoneMaps]);
  function ray_casting(point, polygon) {
    var n = polygon.length,
      is_in = false,
      x = point.g_longtitude,
      y = point.g_latitude;
    var x1, x2, y1, y2;

    for (var i = 0; i < n - 1; ++i) {
      x1 = polygon[i][0];
      x2 = polygon[i + 1][0];
      y1 = polygon[i][1];
      y2 = polygon[i + 1][1];

      if (y < y1 != y < y2 && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1) {
        is_in = !is_in;
      }
    }

    return is_in;
  }
  // console.log(" lendctx.setWorker(worker);", worker);

  return (
    <Ctx.Provider
      value={{
        lendState,
        setLendState,
        switchState,
        setSwitchState,
        worker,
        setWorker,
        leasingLimit,
        setLeasingLimit,
        shopLeasing,
        setShopLeasing,
        zoneIDS,
        setZoneIDS,
        endDate,
        setEndDate,
        startDate,
        setStartDate,
        zoneState,
        setZoneState,
        specilCustomer,
        setSpecilCustomer,
        specilZones,
        setSpecilZones,
        filteredZones,
        setFilteredZones,
        customerData,
        setCustomerData,
        zoneModal,
        setZoneModal,
        customerModal,
        setCustomerModal,
        zoneMap,
        setZoneMap,
        setZonesMap,
        allDelguur,
        setAllDelguur,
        allShops,
        newData,
        setNewData,
        collectedShops,
        setCollectedShops,
        zoneIDSAAA,
        newWorkers,
        setNewWorkers,
        xtZones,
        setXtZones,
      }}
    >
      {props.children}
    </Ctx.Provider>
  );
};

export default Ctx;
