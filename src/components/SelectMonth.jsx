import { useEffect } from "react";

const SelectMonth = () => {
  useEffect(() => {
    const select = document.getElementById("month-select");

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
  }, []); // Empty dependency array ensures this runs only once after initial render
  return (
    <>
      <label htmlFor="month-select" className="mt-4">
        Select Month:
      </label>
      <select
        name="test"
        id="month-select"
        className="w-full pt-[0.375rem] pr-[2.25rem]"
      ></select>
    </>
  );
};

export default SelectMonth;
