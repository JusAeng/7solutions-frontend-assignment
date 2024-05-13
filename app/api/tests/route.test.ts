import axios from "axios";
import { GET } from "../route";
import newFormat from "../new-format.json";

let responseUser = [] as any;

describe("Testing Fetch API", () => {
  it("Get valid data", async () => {
    let data;
    const res = await axios.get("https://dummyjson.com/users");
    data = await res.data;
    responseUser = data;
    expect(data.users.length).toBe(30);
  });
});

describe("Testing Route", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ users: responseUser.users }),
      // Add any other properties you need for the Response interface
    } as Response);

    global.Response.json = jest.fn().mockResolvedValue({} as Response);
  });
  it("New format has same total users", async () => {
    const response = await GET();
    expect(response).toBe(newFormat);
  });
});
