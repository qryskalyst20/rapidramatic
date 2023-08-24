import { useEffect, useState } from "react";
import issueData from "./issueData";
import IssueChart from "./IssueChart";
import { useMediaQuery } from "react-responsive";

const barOption = [
  {
    id: 0,
    type: "Line",
  },
  {
    id: 1,
    type: "Bar",
  },
  {
    id: 2,
    type: "Pie",
  },
];

const SelectMonth = ({ theme }) => {
  const [isDataExist, setIsDataExist] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [barType, setBarType] = useState("line");
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
            borderColor: theme === "dark" ? "rgb(226 232 240)" : "black",
            borderWidth: 1.5,
          },
        ],
      });
    }
  }, [theme, selectedMonth]);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="flex flex-col items-center  w-[33.3%]">
      <label htmlFor="month-select" className="mt-4 dark:text-slate-200">
        Select Month:
      </label>
      <div className="w-screen flex justify-center gap-2">
        <select
          name="test"
          id="month-select"
          className="focus:outline-none bg-slate-100 dark:bg-zinc-900 appearance-none pt-[0.375rem] pr-[2.25rem] pb-[0.375rem] pl-[0.75rem] bg-[right_0.75rem_center] rounded-md bg-transparent border border-zinc-300 dark:border-white dark:text-white"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "16px 12px",
            width: isMobile ? "50%" : "20%",
          }}
        ></select>
        <select
          name="test"
          id="bar-select"
          className="focus:outline-none appearance-none pt-[0.375rem] pr-[2.25rem] pb-[0.375rem] pl-[0.75rem] bg-[right_0.75rem_center] rounded-md bg-transparent border border-zinc-300 dark:border-white dark:text-slate-200"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "16px 12px",
          }}
          onChange={(e) => setBarType(e.target.value.toLowerCase())}
        >
          {barOption.map((option) => {
            return (
              <option
                key={option.id}
                value={option.type}
                className="bg-slate-100 dark:bg-zinc-900 dark:text-white"
              >
                {option.type}
              </option>
            );
          })}
        </select>
      </div>

      <div
        style={{
          width: isMobile ? 300 : 700,
          display: isDataExist ? "block" : "none",
        }}
        className="border border-zinc-300 dark:border-white p-5 mt-5 rounded-md"
      >
        <IssueChart chartData={userData} type={barType} theme={theme} />
      </div>
    </div>
  );
};

export default SelectMonth;
