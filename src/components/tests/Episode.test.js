import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Episode from "./../Episode";

// // 'https://i.ibb.co/2FsfXqM/stranger-things.png'
// "http://static.tvmaze.com/uploads/image/module_landscape/67/168918.jpg"
const testEpisode = {
  id: 1,
  name: "",
  image: "https://i.ibb.co/2FsfXqM/stranger-things.png",
  season: 1,
  summary: "test summary",
  runtime: 1,
};

const testEpisodeWithoutImage = {
  id: 1,
  name: "",
  image: null,
  season: 1,
  summary: "test summary",
  runtime: 1,
};
test("renders without error", () => {
  render(<Episode episode={testEpisode} />);
});

test("renders the summary test passed as prop", () => {
  render(<Episode episode={testEpisode} />);
  const summary = screen.queryByText(/test summary/i);
  console.log(summary);
  expect(summary).toBeInTheDocument();
  expect(summary).toBeTruthy();
  expect(summary).toHaveTextContent("test summary");
});

test("renders default image when image is not defined", () => {
  render(<Episode episode={testEpisodeWithoutImage} />);
  const image = screen.queryByAltText(
    "https://i.ibb.co/2FsfXqM/stranger-things.png"
  );
  console.log(image);

  expect(image).toBeInTheDocument();
});

// * [ ] Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
// * [ ] Modify the test data to display a specific summary statement. Complete a test that shows that the summary value passed in to the Episode component displays as expected. **Use at least then 3 different types of expect statements to test the the existence of the summary value.**
// * [ ] The episode component displays a default value ('https://i.ibb.co/2FsfXqM/stranger-things.png') when a image url is not provided. Create a new piece of test data with the image property set to `null`. Test that the alt tag of the image displayed is set to './stranger_things.png'.
