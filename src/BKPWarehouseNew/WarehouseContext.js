import React, { useState, useEffect } from "react"
import myHeaders from "../components/MyHeader/myHeader";
const Ctx = React.createContext()

export const BackOfficeHook = (props) => {
    const [data, setData] = useState(null)
    const [activeWarehouse, setActiveWarehouse] = useState(null)
    const [warehouseList, setWarehouseList] = useState(null)

    useEffect(() => {
        const fetchdata = async () => {
            var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };
            const data = await fetch(
                "https://api2.ebazaar.mn/api/backoffice/suppliers",
                requestOptions
                );
            const res = await data.json();
            setData(res.data);
        }
        try {
            fetchdata();
        } catch (error) {
            console.log("suppliers error ", error);
        }
    }, [])

    return (
        <Ctx.Provider
        value={{
            activeWarehouse,
            data
        }}
        >
        {props.children}
        </Ctx.Provider>
    )
}

export default Ctx