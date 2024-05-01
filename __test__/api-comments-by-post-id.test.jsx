import "@testing-library/jest-dom";

const mockComment = {
  userId: 1,
  id: 1,
  title: "quidem molestiae enim",
};

// This is the function we'll be testing
async function fetchComments() {
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
      json: () => Promise.resolve([mockComment]),
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe("Fetch comment data by post id", () => {
  it("should be return an array", async () => {
    const json = await fetchComments();
    expect(Array.isArray(json)).toEqual(true);
  });

  it("should be render the first comment data", async () => {
    const json = await fetchComments();
    expect(json[0]).toEqual(mockComment);
  });
});
