import { Pie } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import LoadingDashboard from "../Loading/LoadingDashboard";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://tuki-server.onrender.com/admin/piechart"
        );
        const data = response.data;

        const formattedData = {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [],
              borderColor: [],
              borderWidth: 3,
            },
          ],
        };

        data.forEach((item) => {
          formattedData.labels.push(item[0]);
          formattedData.datasets[0].data.push(item[1]);
          formattedData.datasets[0].backgroundColor.push(
            `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)}, 1)`
          );
          formattedData.datasets[0].borderColor.push("rgb(255, 255, 255)");
        });

        setChartData(formattedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Leyenda",
        position: "top",
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      {chartData ? (
        <Pie data={chartData} options={options} />
      ) : (
        <LoadingDashboard />
      )}
    </div>
  );
}
