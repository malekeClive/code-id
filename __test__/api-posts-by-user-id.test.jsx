import "@testing-library/jest-dom";

const mockPost = {
  postId: 1,
  id: 1,
  name: "id labore ex et quam laborum",
  email: "Eliseo@gardner.biz",
  body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
};

// This is the function we'll be testing
async function fetchPost() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/comments?postId=1"
  );
  const json = await res.json();

  return json;
}

// This is the section where we mock `fetch`
const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([mockPost]),
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe("Fetch post data by user id", () => {
  it("should be return an array", async () => {
    const json = await fetchPost();
    expect(Array.isArray(json)).toEqual(true);
  });

  it("should be render the first post data", async () => {
    const json = await fetchPost();
    expect(json[0]).toEqual(mockPost);
  });
});
