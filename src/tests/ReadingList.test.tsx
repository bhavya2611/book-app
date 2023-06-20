import { render, screen } from "@testing-library/react";
import ReadingList from "../Components/ReadingList";

describe("ReadingList", () => {
  it("should render reading list title", () => {
    render(<ReadingList />);
    const titleElement = screen.getByText("Reading List");
    expect(titleElement).toBeInTheDocument();
  });
});
