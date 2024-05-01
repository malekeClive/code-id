import "@testing-library/jest-dom";

const mockUser = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};

// This is the function we'll be testing
async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const json = await res.json();

  return json;
}

// This is the section where we mock `fetch`
const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([mockUser]),
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe("Fetch users API", () => {
  it("should be return an array", async () => {
    const json = await fetchUsers();
    expect(Array.isArray(json)).toEqual(true);
  });

  it("should be render the first user", async () => {
    const json = await fetchUsers();
    expect(json[0]).toEqual(mockUser);
  });
});
