import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { useQuery } from "@apollo/client";

jest.mock("@apollo/client");

const mockData = {
  loading: false,
  error: null,
  data: {
    characters: {
      results: [{ name: "Ricky", image: "ricky.jpg", id: "1" }],
    },
  },
};

describe("App component", () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockClear();
    (useQuery as jest.Mock).mockReturnValue(mockData);
  });

  it("renders 'Ricky and Morty' heading", () => {
    render(<App />);
    const headingElement = screen.getByText(/Ricky and Morty/i);
    expect(headingElement).toBeInTheDocument();
  });

  it("handles form submission", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Ex: Ricky/i);
    const buttonElement = screen.getByRole("button", { name: /Search/i });

    fireEvent.change(inputElement, { target: { value: "Morty" } });
    fireEvent.click(buttonElement);
  });
});
