import { Auth } from "rettiwt-auth";
import { Rettiwt } from "rettiwt-api";
import fs from "fs";
import creds from "./credential.js";

// Date conversion function
function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function generateDateRange(month) {
  console.log("Generating date range for month", month);
  new Auth()
    .getUserCredential({
      email: creds.EMAIL,
      userName: creds.USERNAME,
      password: creds.PASSWORD,
    })
    .then((credential) => {
      // Creating a new Rettiwt instance using the cookies
      const rettiwt = new Rettiwt(credential.cookies);

      rettiwt.tweet
        .search({
          fromUsers: ["askrapidkl"],
          words: ["kesulitan", "maaf"],
          startDate: new Date(`2023-${month}-01`),
          endDate: new Date(`2023-${month}-31`),
        })
        .then((data) => {
          const dateCounts = {}; // Initialize an object to store date counts

          data.list.forEach((tweet) => {
            const formattedDate = formatDate(tweet.createdAt);
            if (dateCounts[formattedDate]) {
              dateCounts[formattedDate]++;
            } else {
              dateCounts[formattedDate] = 1;
            }
          });

          console.log("Date Counts:", dateCounts);

          // Read the existing JSON data from the file
          fs.readFile("issueData.json", "utf8", (err, jsonData) => {
            if (err) {
              console.error("Error reading issueData.json:", err);
              return;
            }

            try {
              const existingData = JSON.parse(jsonData);

              // Initialize dateCounts with all days of the selected month
              const daysInMonth = new Date(2023, month, 0).getDate();
              for (let i = 1; i <= daysInMonth; i++) {
                const dayString = String(i).padStart(2, "0");
                const dateKey = `${month}-${dayString}`;
                dateCounts[dateKey] = 0; // Initialize issue count to 0 for each day
              }

              // Update the issue counts based on dateCounts
              for (const date in dateCounts) {
                const existingEntry = existingData.find(
                  (entry) => entry.date === date
                );
                if (existingEntry) {
                  existingEntry.issue_count = dateCounts[date];
                } else {
                  existingData.push({ date, issue_count: dateCounts[date] });
                }
              }

              // Write the updated data back to the file
              fs.writeFile(
                "issueData.json",
                JSON.stringify(existingData, null, 2),
                "utf8",
                (writeErr) => {
                  if (writeErr) {
                    console.error("Error writing to issueData.json:", writeErr);
                  } else {
                    console.log("issueData.json updated successfully.");
                  }
                }
              );
            } catch (parseErr) {
              console.error("Error parsing issueData.json:", parseErr);
            }
          });
        })
        .catch((err) => {
          console.log("No data found");
          console.log(err);
        });
    });
}

generateDateRange(8);
