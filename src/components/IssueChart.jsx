import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export default function IssueChart({ chartData }) {
  return <Chart type="line" data={chartData} />;
}
