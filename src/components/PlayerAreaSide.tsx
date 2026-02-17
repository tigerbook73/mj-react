import { useState } from "react";
import GameTile, { type GameTileProp } from "./GameTile";
import { GameState, Position, TileCore, type TileId } from "@/common";
import { CommonUtil, Direction } from "@/lib/direction";
import { socketClient } from "@/client/socket-client";
import useMJStore from "@/stores/mj-store";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

enum State {
  None = 0,
  MyTurn = 1,
  WaitingPass = 2,
}

interface ShowState {
  show: boolean;
  disabled: boolean;
}

interface Props {
  direction: Direction;
}

function canDo(showState: ShowState) {
  return showState.show && !showState.disabled;
}

export default function PlayerAreaSide({ direction }: Props) {
  // store
  const currentGame = useMJStore((state) => state.currentGame);
  const myPosition = useMJStore((state) => state.myPosition);
  const open = useMJStore((state) => state.open);

  // state
  const [selectedTiles, setSelectedTiles] = useState<TileId[]>([]);

  // this player
  const thisPosition = CommonUtil.mapPosition(myPosition ?? Position.None, direction);
  const thisPlayer = currentGame?.players[thisPosition];

  // current player
  const currentPlayer = currentGame?.current;

  // render nothing if
  if (!currentGame || !thisPlayer || thisPosition === Position.None || myPosition === null || !currentPlayer) {
    return <></>;
  }

  const size = "md";

  const tileIds = [...thisPlayer.handTiles, TileCore.voidId, thisPlayer.picked];
  const handTiles: GameTileProp[] = tileIds.map(
    (id): GameTileProp => ({
      tileId: id,
      direction: direction,
      size,
      back: myPosition !== thisPlayer.position && !open,
      selected: selectedTiles.includes(id),
    }),
  );

  const openTiles = thisPlayer.openedSets.map((set) =>
    set.tiles.map(
      (tile): GameTileProp => ({
        tileId: tile,
        direction: direction,
        size,
        back: false,
        selected: selectedTiles.includes(tile),
      }),
    ),
  );

  // state is used to contol the action buttons
  const state = (() => {
    // only show bottom player (my player)
    if (direction !== Direction.Bottom) {
      return State.None;
    }

    if (currentGame.state === GameState.WaitingAction && currentGame.current!.position === myPosition) {
      return State.MyTurn;
    }
    if (currentGame.state === GameState.WaitingPass && currentGame.current!.position !== myPosition) {
      return State.WaitingPass;
    }
    return State.None;
  })();

  const setSelected = (tileId: TileId) => {
    if (tileId === TileCore.voidId) {
      return;
    }

    // if the tile is not in hand tiles, do nothing
    if (handTiles.every((tile) => tile.tileId !== tileId)) {
      return;
    }

    const index = selectedTiles.indexOf(tileId);
    if (index === -1) {
      setSelectedTiles(() => [tileId]);
    } else {
      setSelectedTiles(() => []);
    }
  };

  const addSelected = (tileId: TileId) => {
    if (tileId === TileCore.voidId) {
      return;
    }

    const index = selectedTiles.indexOf(tileId);
    if (index === -1) {
      selectedTiles.push(tileId);
      setSelectedTiles(() => [...selectedTiles]);
    } else {
      selectedTiles.splice(index, 1);
      setSelectedTiles(() => [...selectedTiles]);
    }
  };

  const clearSelected = () => {
    selectedTiles.length = 0;
    setSelectedTiles(() => []);
  };

  const handleClick = (tileId: TileId) => {
    if (tileId === TileCore.voidId) {
      return;
    }

    // in state my turn
    if (state === State.MyTurn) {
      // delay unselect to avoid double click
      setTimeout(() => {
        setSelected(tileId);
      }, 100);
      return;
    }

    // in state waitiing pass, chi / peng / hu / gang is not supported now
    if (state === State.WaitingPass && !showHu.show) {
      addSelected(tileId);
      return;
    }
  };

  const handleDblClick = (tileId: TileId) => {
    if (tileId === TileCore.voidId) {
      return;
    }

    // in state my turn
    if (state === State.MyTurn) {
      setSelected(tileId);
      handleDrop();
      return;
    }

    // in state waitiing pass, chi / peng / hu / gang is not supported now
    if (state === State.WaitingPass) {
      // ...
    }
  };

  //
  // drop tile feature
  //
  const showDrop: ShowState = {
    show: state === State.MyTurn,
    disabled: selectedTiles.length !== 1,
  };

  const handleDrop = () => {
    if (canDo(showDrop)) {
      try {
        socketClient.actionDrop(selectedTiles[0]);
        clearSelected();
      } catch (e) {
        toast.warning("Drop tile failed");
        console.error("Drop tile failed", e);
      }
    }
  };

  //
  // zimo feature
  //
  const showZimo: ShowState = (() => {
    if (state === State.MyTurn) {
      return {
        show: TileCore.canHu(thisPlayer.handTiles, thisPlayer.picked),
        disabled: false,
      };
    }
    return { show: false, disabled: false };
  })();

  const handleZimo = () => {
    if (canDo(showZimo)) {
      try {
        socketClient.actionZimo();
      } catch (e) {
        toast.warning("Zimo failed");
        console.error("Zimo failed", e);
      }
    }
  };

  //
  // pass feature
  //
  const showPass: ShowState = { show: state === State.WaitingPass, disabled: false };

  const handlePass = () => {
    if (showPass.show) {
      try {
        socketClient.actionPass();
      } catch (e) {
        toast.warning("Pass failed");
        console.error("Pass failed", e);
      }
    }
  };

  //
  // peng feature
  //
  const showPeng: ShowState = (() => {
    if (state !== State.WaitingPass) {
      return {
        show: false,
        disabled: false,
      };
    }

    return {
      show: TileCore.canPeng(thisPlayer.handTiles, currentGame.latestTile),
      disabled:
        selectedTiles.length !== 2 || !TileCore.isSame(selectedTiles[0], selectedTiles[1], currentGame.latestTile),
    };
  })();

  function handlePeng() {
    if (canDo(showPeng)) {
      try {
        socketClient.actionPeng([selectedTiles[0], selectedTiles[1]]);
      } catch (e) {
        toast.warning("Peng failed");
        console.error("Peng failed", e);
      }
    }
  }

  //
  // gang feature
  //
  const showGang: ShowState = (() => {
    if (state !== State.WaitingPass) {
      return {
        show: false,
        disabled: false,
      };
    }

    return {
      show: TileCore.canGang(thisPlayer.handTiles, currentGame.latestTile),
      disabled:
        selectedTiles.length !== 3 ||
        !TileCore.isSame(selectedTiles[0], selectedTiles[1], selectedTiles[2], currentGame.latestTile),
    };
  })();

  function handleGang() {
    if (canDo(showGang)) {
      try {
        socketClient.actionGang([selectedTiles[0], selectedTiles[1], selectedTiles[2]]);
      } catch (e) {
        toast.warning("Gang failed");
        console.error("Gang failed", e);
      }
    }
  }

  //
  // chi feature
  //
  const showChi: ShowState = (() => {
    if (state !== State.WaitingPass) {
      return {
        show: false,
        disabled: false,
      };
    }

    const currentPlayer = currentGame!.current!;
    let nextPosition = (currentPlayer.position - 1 + 4) % 4;
    while (!currentGame!.players[nextPosition]) {
      nextPosition = (nextPosition - 1 + 4) % 4;
    }
    // player is the next player
    if (thisPlayer.position !== nextPosition) {
      return {
        show: false,
        disabled: false,
      };
    }

    const latestTile = currentGame!.latestTile!;
    return {
      show: TileCore.canChi(thisPlayer.handTiles, latestTile),
      disabled: selectedTiles.length !== 2 || !TileCore.isConsecutive(selectedTiles[0], selectedTiles[1], latestTile),
    };
  })();

  function handleChi() {
    if (canDo(showChi)) {
      try {
        socketClient.actionChi([selectedTiles[0], selectedTiles[1]]);
      } catch (e) {
        toast.warning("Chi failed");
        console.error("Chi failed", e);
      }
    }
  }

  //
  // hu (dianpao) feature
  //
  const showHu: ShowState = (() => {
    if (state === State.WaitingPass) {
      return {
        show: TileCore.canHu(thisPlayer.handTiles, currentGame.latestTile),
        disabled: false,
      };
    }
    return { show: false, disabled: false };
  })();

  const handleHu = () => {
    if (canDo(showHu)) {
      try {
        socketClient.actionHu();
      } catch (e) {
        toast.warning("Hu failed");
        console.error("Hu failed", e);
      }
    }
  };

  // reused css classes
  const clsFlex = {
    "flex-row": direction === Direction.Bottom,
    "flex-row-reverse": direction === Direction.Top,
    "flex-col-reverse": direction === Direction.Right,
    "flex-col": direction === Direction.Left,
  };

  return (
    <div
      className={cn(
        "size-full p-1 flex justify-center items-center",
        clsFlex,
        thisPlayer.position === currentPlayer.position ? "bg-green-500" : "bg-blue-300",
      )}
    >
      <div className={cn("w-20/24 flex justify-between items-center gap-2", clsFlex)}>
        {/* open sets */}
        <div className={cn("flex justify-center items-center gap-1", clsFlex)}>
          {openTiles.map((set, index) => (
            <div key={index} className={cn("flex justify-center items-center gap-1", clsFlex)}>
              <div className={cn("flex items-center", clsFlex)}>
                {set.map((tile, index) => (
                  <GameTile key={index} {...tile} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* hand tiles */}
        <div className={cn("flex justify-center, items-center ", clsFlex)}>
          {handTiles.map((tile, index) => (
            <GameTile
              key={index}
              {...tile}
              onClick={() => handleClick(tile.tileId)}
              onDoubleClick={() => handleDblClick(tile.tileId)}
            />
          ))}
        </div>
      </div>

      {/* buttons */}
      <div className={cn("w-4/24 flex justify-end items-center gap-1", clsFlex)}>
        {showDrop.show && (
          <Button disabled={showDrop.disabled} size="icon" onClick={handleDrop}>
            出牌
          </Button>
        )}
        {showZimo.show && (
          <Button disabled={showZimo.disabled} size="icon" onClick={handleZimo}>
            自摸
          </Button>
        )}
        {showPass.show && (showPeng.show || showGang.show || showChi.show || showHu.show) && (
          <Button size="icon" onClick={handlePass}>
            过
          </Button>
        )}
        {showPeng.show && (
          <Button disabled={showPeng.disabled} size="icon" onClick={handlePeng}>
            碰
          </Button>
        )}
        {showGang.show && (
          <Button disabled={showGang.disabled} size="icon" onClick={handleGang}>
            杠
          </Button>
        )}
        {showChi.show && (
          <Button disabled={showChi.disabled} size="icon" onClick={handleChi}>
            吃
          </Button>
        )}
        {showHu.show && (
          <Button disabled={showHu.disabled} size="icon" onClick={handleHu}>
            胡
          </Button>
        )}
      </div>
    </div>
  );
}
