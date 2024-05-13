import { SummaryType, UserType } from "../types/user";
import * as fs from "fs";

interface IData {
  users: UserType[];
}

export function formattingNewJson(
  data: IData,
  newData: Record<string, SummaryType>
) {
  data.users.map((user, idx) => {
    let userDepartment = user.company.department;

    let summary = newData[userDepartment];
    if (!summary) {
      let userAgeString = user.age.toString();
      newData[userDepartment] = {
        male: user.gender === "male" ? 1 : 0,
        female: user.gender === "female" ? 1 : 0,
        ageRange: `${userAgeString}-${userAgeString}`,
        hair: {
          [user.hair.color]: 1,
        },
        addressUser: {
          [user.firstName + user.lastName]: user.address.postalCode,
        },
      };
    } else {
      if (user.gender === "male") {
        summary.male += 1;
      } else if (user.gender === "female") {
        summary.female += 1;
      }
      let parts = summary.ageRange.split("-");
      if (user.age < parseInt(parts[0])) {
        summary.ageRange = user.age.toString() + "-" + parts[1];
      } else if (user.age > parseInt(parts[0])) {
        summary.ageRange = parts[0] + "-" + user.age.toString();
      }

      if (!summary.hair[user.hair.color]) summary.hair[user.hair.color] = 0;
      summary.hair[user.hair.color] += 1;
      summary.addressUser[user.firstName + user.lastName] =
        user.address.postalCode;
      newData[userDepartment] = summary;
    }
  });
}

export function saveJSONFile(data: any) {
  const jsonData: string = JSON.stringify(data);
  fs.writeFile("./app/data/new-format.json", jsonData, "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
      return;
    }
    console.log("JSON file has been saved.");
  });
}
