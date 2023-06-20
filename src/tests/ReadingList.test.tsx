import { render, screen } from "@testing-library/react";
import ReadingList from "../components/ReadingList";

describe("ReadingList", () => {
  it("should render reading list title", () => {
    render(<ReadingList />);
    const titleElement = screen.getByText("Reading List");
    expect(titleElement).toBeInTheDocument();
  });
});
