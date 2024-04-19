import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders 'Slider' text", () => {
    render(<Home />);

    const myElem = screen.getByText("Slider");

    expect(myElem).toBeInTheDocument();
  });
});
