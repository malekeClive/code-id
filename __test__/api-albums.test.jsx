import "@testing-library/jest-dom";

const mockAlbum = {
  userId: 1,
  id: 1,
  title: "quidem molestiae enim",
};

// This is the function we'll be testing
async function fetchAlbums() {
  const res = await fetch("https://jsonplaceholder.typicode.com/albums");
  const json = await res.json();

  return json;
}

// This is the section where we mock `fetch`
const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([mockAlbum]),
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe("Fetch albums API", () => {
  it("should be return an array", async () => {
    const json = await fetchAlbums();
    expect(Array.isArray(json)).toEqual(true);
  });

  it("should be render the first album", async () => {
    const json = await fetchAlbums();
    expect(json[0]).toEqual(mockAlbum);
  });
});
