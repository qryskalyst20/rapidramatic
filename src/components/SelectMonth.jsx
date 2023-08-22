import { useEffect, useState } from "react";
import issueData from "./issueData";
import IssueChart from "./IssueChart";

const SelectMonth = () => {
  const [isDataExist, setIsDataExist] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Issue Count",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const select = document.getElementById("month-select");

    // Clear existing options
    select.innerHTML = "";

    // Get the current month and year
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    // Populate the select element with the previous and current months
    for (let i = 1; i <= currentMonth; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = new Date(`${currentYear}-${i}-01`).toLocaleDateString(
        "en-US",
        { month: "long" }
      );
      select.appendChild(option);
    }

    select.addEventListener("change", () => {
      // Get the selected month from the value of the select element
      const newSelectedMonth = Number(select.value);
      setSelectedMonth(newSelectedMonth);

      // Check if data exists for the selected month
      const hasDataForSelectedMonth = issueData.some((d) => {
        const dataMonth = new Date(d.date).getMonth() + 1;
        return dataMonth === newSelectedMonth;
      });

      setIsDataExist(hasDataForSelectedMonth);
    });
  }, []);

  const filteredData = issueData.filter((d) => {
    const dataMonth = new Date(d.date).getMonth() + 1;
    return dataMonth === selectedMonth;
  });

  useEffect(() => {
    if (selectedMonth !== null) {
      const filteredData = issueData.filter((d) => {
        const dataMonth = new Date(d.date).getMonth() + 1;
        return dataMonth === selectedMonth;
      });

      setUserData({
        labels: filteredData.map((data) => new Date(data.date).getDate()),
        datasets: [
          {
            label: "Issue Count",
            data: filteredData.map((data) => data.issue_count),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [selectedMonth]);

  return (
    <div className="flex flex-col items-center  w-[33.3%]">
      <label htmlFor="month-select" className="mt-4 dark:text-slate-200">
        Select Month:
      </label>
      <select
        name="test"
        id="month-select"
        className="appearance-none w-[70%] pt-[0.375rem] pr-[2.25rem] pb-[0.375rem] pl-[0.75rem] bg-[right_0.75rem_center] rounded-md bg-transparent border border-zinc-300 dark:border-white dark:text-slate-200"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "16px 12px",
        }}
      ></select>

      <div style={{ width: 700, display: isDataExist ? "block" : "none" }}>
        <IssueChart chartData={userData} />
      </div>
    </div>
  );
};

export default SelectMonth;
