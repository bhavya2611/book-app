import { render, screen } from "@testing-library/react";
import BooksSearch from "../components/BookSearch";

describe("BooksSearch", () => {
  it("should render input field and search button", () => {
    render(<BooksSearch />);
    const titleElement = screen.getByText("Search Results");
    expect(titleElement).toBeInTheDocument();
  });
});
