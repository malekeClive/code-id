import "@testing-library/jest-dom";

const mockPhoto = {
  albumId: 1,
  id: 1,
  title: "accusamus beatae ad facilis cum similique qui sunt",
  url: "https://via.placeholder.com/600/92c952",
  thumbnailUrl: "https://via.placeholder.com/150/92c952",
};

// This is the function we'll be testing
async function fetchPhotos() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/photos?albumId=1"
  );
  const json = await res.json();

  return json;
}

// This is the section where we mock `fetch`
const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([mockPhoto]),
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe("Fetch photo data by album id", () => {
  it("should be return an array", async () => {
    const json = await fetchPhotos();
    expect(Array.isArray(json)).toEqual(true);
  });

  it("should be render the first photo data", async () => {
    const json = await fetchPhotos();
    expect(json[0]).toEqual(mockPhoto);
  });
});
