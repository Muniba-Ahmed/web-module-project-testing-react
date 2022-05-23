import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import Display from "./../Display";

import mockFetchShow from "./../../api/fetchShow";
jest.mock("./../../api/fetchShow");

const testShow = {
  name: "test show",
  summary: "test summary",
  seasons: [
    {
      id: 0,
      name: "Season 1",
      episodes: [],
    },
    {
      id: 1,
      name: "Season 2",
      episodes: [],
    },
  ],
};

test("renders without errors with no props", async () => {
  render(<Display />);
});

test("renders Show component when the button is clicked ", async () => {
  mockFetchShow.mockResolvedValueOnce(testShow);

  render(<Display />);
  const button = screen.getByRole("button");
  userEvent.click(button);

  const show = await screen.findByTestId("show-container");
  expect(show).toBeInTheDocument();
});

test("renders show season options matching your data when the button is clicked", async () => {
  mockFetchShow.mockResolvedValueOnce(testShow);

  render(<Display />);
  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    const seasonOptions = screen.queryAllByTestId("season-option");
    expect(seasonOptions).toHaveLength(2);
  });
});

test("displayFunc is called when the fetch button is pressed", async () => {
  mockFetchShow.mockResolvedValueOnce(testShow);

  const displayFunc = jest.fn();

  render(<Display displayFunc={displayFunc} />);
  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    expect(displayFunc).toHaveBeenCalled();
  });
});
// * [x] Test that the Display component renders without any passed in props.
// * [x] Rebuild or copy the show test data element as used in the previous set of tests.
// * [x] Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
// * [ ] Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
// * [ ] Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
