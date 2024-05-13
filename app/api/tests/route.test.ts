import users from "../../data/users.json";
import summary from "../../data/new-format.json";
import { SummaryType, UserType } from "@/app/types/user";
import { formattingNewJson } from "../route.service";

interface IData {
  users: UserType[];
}

describe("Formatting Json", () => {
  it("check new format", () => {
    let data = users as IData;
    let newData = {} as Record<string, SummaryType>;
    formattingNewJson(data, newData);

    expect(newData).toStrictEqual(summary);
  });
});
