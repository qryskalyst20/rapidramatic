import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export default function IssueChart({ chartData, type }) {
  return <Chart type={type} data={chartData} />;
}
