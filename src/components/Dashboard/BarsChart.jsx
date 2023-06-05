import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { useState, useEffect } from "react";
import LoadingDashboard from "../Loading/LoadingDashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarsChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          " https://tuki-server.onrender.com/order/orderdate"
        );
        const data = response.data;
        setChartData(data);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const labels = chartData?.map((date) => date[0]);

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: chartData?.map((value) => value[1]),
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
      // {
      //   label: "Dataset 2",
      //   data: labels?.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  };
  console.log(data);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", //as const,
      },
      title: {
        display: true,
        text: "Ventas",
      },
    },
  };

  return (
    <div>
      {data ? <Bar data={data} options={options} /> : <LoadingDashboard />}
    </div>
  );
}
