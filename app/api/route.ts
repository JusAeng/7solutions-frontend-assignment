import * as fs from "fs";

export async function GET() {
  let data = {} as any;
  try {
    const res = await fetch("https://dummyjson.com/users");
    data = await res.json();
  } catch (err) {
    console.log("error:", err);
  }

  const jsonData: string = JSON.stringify(data);
  fs.writeFile("./app/api/users.json", jsonData, "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
      return;
    }
    console.log("JSON file has been saved.");
  });

  return Response.json(data);
}
