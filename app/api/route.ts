import * as fs from "fs";

type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
};

type SummaryType = {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
};

interface IResponse {
  users: UserType[];
}

export async function GET() {
  let data = {} as IResponse;
  let newData = {} as Record<string, SummaryType>;

  //get data from API
  try {
    const res = await fetch("https://dummyjson.com/users");
    data = await res.json();
  } catch (err) {
    console.log("error:", err);
  }

  // formatting
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
  // ave to file and return response
  saveJSONFile(newData);
  return Response.json(data);
}

function saveJSONFile(data: any) {
  const jsonData: string = JSON.stringify(data);
  fs.writeFile("./app/api/new-format.json", jsonData, "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
      return;
    }
    console.log("JSON file has been saved.");
  });
}
