import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react"; // (or /dom, /vue, ...)
import GameTile, { type GameTileProp } from "./GameTile";
import { Direction } from "@/lib/direction";

const gameTileProps: GameTileProp = {
  tileId: 0,
  direction: Direction.Bottom,
  size: "md",
  back: false,
  selected: false,
};

describe("GameTile Component", () => {
  it("should render a standard tile", () => {
    render(<GameTile {...gameTileProps} />);
    const tile = screen.getByRole("img");
    expect(tile).toBeInTheDocument();
  });

  it("should render the back side of a tile", () => {
    render(<GameTile {...gameTileProps} back={true} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("should render a tile on directions(top, down, left, right)", () => {
    const { rerender } = render(<GameTile {...gameTileProps} direction={Direction.Top} />);
    expect(screen.getByRole("img")).toBeInTheDocument();

    rerender(<GameTile {...gameTileProps} direction={Direction.Bottom} />);
    expect(screen.getByRole("img")).toBeInTheDocument();

    rerender(<GameTile {...gameTileProps} direction={Direction.Left} />);
    expect(screen.getByRole("img")).toBeInTheDocument();

    rerender(<GameTile {...gameTileProps} direction={Direction.Right} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should render a tile with different size (xs, sm, md, lg, xl, 1-9)", () => {
    const rerender = render(<GameTile {...gameTileProps} size="xs" />);
    expect(screen.getByRole("img")).toBeInTheDocument();

    ["sm", "md", "lg", "xl", 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((size) => {
      rerender.rerender(<GameTile {...gameTileProps} size={size as any} />);
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });
});
