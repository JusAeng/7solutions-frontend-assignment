import { SummaryType, UserType } from "../types/user";
import { formattingNewJson, saveJSONFile } from "./route.service";

interface IData {
  users: UserType[];
}

export async function GET() {
  let data = {} as IData;
  let newData = {} as Record<string, SummaryType>;

  //get data from API
  try {
    const res = await fetch("https://dummyjson.com/users");
    data = await res.json();
  } catch (err) {
    console.log("error:", err);
  }

  // formatting
  formattingNewJson(data, newData);

  // ave to file and return response
  saveJSONFile(newData);
  return Response.json(newData);
}
