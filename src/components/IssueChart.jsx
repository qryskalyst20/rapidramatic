import { Line } from "react-chartjs-2";

export default function IssueChart({ chartData }) {
  return <Line data={chartData} />;
}
