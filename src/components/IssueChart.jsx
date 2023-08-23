import "chart.js/auto";
import { scales } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

export default function IssueChart({ chartData, type, theme }) {
  return (
    <Chart
      type={type}
      data={chartData}
      options={{
        scales: {
          y: {
            grid: {
              color: theme === "dark" ? "#27272a" : "#cbd5e1",
            },
          },
          x: {
            grid: {
              color: theme === "dark" ? "#27272a" : "#cbd5e1",
            },
          },
        },
      }}
    />
  );
}
