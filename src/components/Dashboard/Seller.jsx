import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import LoadingDashboard from "../Loading/LoadingDashboard";

export default function PieChartSeller() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://tuki-server.onrender.com/admin/sellers");
        console.log(response.data);

        setData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  // for (let i = 1; i < data.length; i++) {
  //   const red = Math.floor(Math.random() * 256);
  //   const green = Math.floor(Math.random() * 256);
  //   const blue = Math.floor(Math.random() * 256);

  //   data[i].push(`rgb(${red}, ${green}, ${blue})`);
  // }

  const options = {
    title: "Facturacion Por Vendedor",

    bar: { groupWidth: "100%" },
    legend: { position: "none" },
  };

  return (
    <div>
      {data.length > 0 ? (
        <Chart chartType="BarChart" data={data} options={options} />
      ) : (
        <LoadingDashboard />
      )}
    </div>
  );
}
