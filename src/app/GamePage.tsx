import { Position } from "@/common/core/mj.game";
import PlayerAreaTopLeft from "@/components/PlayerAreaTopLeft";
import { CommonUtil, Direction } from "@/lib/direction";
import { cn } from "@/lib/utils";
import useMJStore from "@/stores/mj-store";

export default function GamePage() {
  const currentPosition = useMJStore((state) => state.currentPosition);
  const currentGame = useMJStore((state) => state.currentGame);

  const currentDirection = CommonUtil.mapDirection(
    currentPosition ?? Position.None,
    currentGame?.current?.position ?? Position.None
  );

  return currentGame ? (
    <div className="w-full max-w-[100vmin] max-h-[calc(100vh-64px)] aspect-1/1 bg-blue-200 flex flex-col">
      {/* p-top  */}
      <div className="flex-1 flex">
        {/* p-top-left */}
        <div className="flex-1 flex items-center justify-center">
          <PlayerAreaTopLeft />
        </div>

        {/* p-top-center */}
        <div className={cn("w-76/100 bg-blue-500", currentDirection === Direction.Top && "bg-blue-300")}></div>

        {/* p-top-right */}
        <div className="flex-1"></div>
      </div>

      {/* p-center */}
      <div className="h-76/100 flex justify-center items-stretch">
        {/* p-center-left */}
        <div className={cn("flex-1 bg-blue-500", currentDirection === Direction.Top && "bg-blue-300")} />

        {/* p-center-center */}
        <div className={"w-76/100 flex flex-col bg-yellow-900 "}>
          {/* w-top  */}
          <div className="flex-1 flex">
            {/* w-top-left */}
            <div className="flex-1 flex items-center justify-center"></div>

            {/* w-top-center */}
            <div className={"w-68/100 bg-amber-200 "} />

            {/* w-top-right */}
            <div className="flex-1"></div>
          </div>

          {/* w-center */}
          <div className="h-68/100 flex justify-center items-stretch">
            {/* w-center-left */}
            <div className="flex-1 bg-amber-200" />

            {/* w-center-center */}
            <div className={"w-68/100 bg-500-700 flex flex-col bg-indigo-300"}>
              {/* d-top  */}
              <div className="flex-1 flex">
                {/* d-top-left */}
                <div className="flex-1 flex items-center justify-center"></div>

                {/* d-top-center */}
                <div className={"w-56/100 "} />

                {/* d-top-right */}
                <div className="flex-1"></div>
              </div>

              {/* d-center */}
              <div className="h-56/100 flex justify-center items-stretch">
                {/* d-center-left */}
                <div className="flex-1 " />

                {/* d-center-center */}
                <div className={"w-56/100 bg-green-900 "}></div>

                {/* d-center-right */}
                <div className="flex-1 flex items-center justify-center "></div>
              </div>

              {/* d-bottom */}
              <div className="flex-1 flex ">
                {/* d-bottom-left */}
                <div className="flex-1 flex items-center justify-center"></div>
                {/* d-bottom-center */}
                <div className={"w-56/100"} />
                {/* d-bottom-right */}
                <div className="flex-1 flex items-center justify-center"></div>
              </div>
            </div>

            {/* w-center-right */}
            <div className="flex-1 flex items-center justify-center bg-amber-200"></div>
          </div>

          {/* w-bottom */}
          <div className="flex-1 flex ">
            {/* w-bottom-left */}
            <div className="flex-1 flex items-center justify-center"></div>
            {/* w-bottom-center */}
            <div className="w-68/100 bg-amber-200" />
            {/* w-bottom-right */}
            <div className="flex-1 flex items-center justify-center"></div>
          </div>
        </div>

        {/* p-center-right */}
        <div
          className={cn(
            "flex-1 flex items-center justify-center bg-blue-500",
            currentDirection === Direction.Top && "bg-blue-300"
          )}
        ></div>
      </div>

      {/* p-bottom-*/}
      <div className="flex-1 flex ">
        {/* p-bottom-left */}
        <div className="flex-1 flex items-center justify-center"></div>
        {/* p-bottom-center */}
        <div className={cn("w-76/100 bg-blue-500", currentDirection === Direction.Top && "bg-blue-300")} />
        {/* p-bottom-right */}
        <div className="flex-1 flex items-center justify-center"></div>
      </div>
    </div>
  ) : (
    <div> </div>
  );
}
