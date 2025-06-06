import { Game, Position, GameState } from "./mj.game";
import { TileCore } from "./mj.tile-core";

describe("Game Play", () => {
  let game: Game;

  beforeAll(() => {
    game = new Game();
  });

  it("init()", () => {
    game.init([Position.East, Position.West]);

    expect(game.players.length).toBe(4);
    expect(game.walls.length).toBe(4);
    expect(game.discards.length).toBe(4);
    expect(game.state).toBe(GameState.Init);
    expect(game.latestTile).toBe(TileCore.voidId);
    expect(game.current).toBeNull();
    expect(game.dealer).toBeNull();

    expect(game.players[Position.East]).toBeDefined();
    expect(game.players[Position.West]).toBeDefined();
  });

  it("start()", () => {
    game.start();
    expect(game.state).toBe(GameState.WaitingAction);
    expect(game.dealer).toBe(game.players[Position.East]);
    expect(game.current).toBe(game.dealer);
  });
});
