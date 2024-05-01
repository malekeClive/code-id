import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Users from "../src/app/(root)/components/users";

// This is the section where we mock `fetch`
const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe("Root page", () => {
  it("renders a list of users", async () => {
    const ui = await Users();
    render(ui);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
