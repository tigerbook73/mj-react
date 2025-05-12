import CenterArea from "@/components/CenterArea";
import DiscardAreaSide from "@/components/DiscardAreaSide";
import PlayerAreaSide from "@/components/PlayerAreaSide";
import PlayerAreaTopLeft from "@/components/PlayerAreaTopLeft";
import WallAreaSide from "@/components/WallAreaSide";
import { Direction } from "@/lib/direction";

export default function GamePage() {
  return (
    <div className="w-[min(100vmin,_calc(100vh-60px))] aspect-square bg-blue-200 flex flex-col">
      {/* p-top  */}
      <div className="flex-1 flex">
        {/* p-top-left */}
        <div className="flex-1 flex items-center justify-center">
          <PlayerAreaTopLeft />
        </div>

        {/* p-top-center */}
        <div className="w-82/100">
          <PlayerAreaSide direction={Direction.Top} />
        </div>

        {/* p-top-right */}
        <div className="flex-1"></div>
      </div>

      {/* p-center */}
      <div className="h-82/100 flex justify-center items-stretch">
        {/* p-center-left */}
        <div className="flex-1">
          <PlayerAreaSide direction={Direction.Left} />
        </div>

        {/* p-center-center */}
        <div className={"w-82/100 flex flex-col bg-yellow-900 "}>
          {/* w-top  */}
          <div className="flex-1 flex">
            {/* w-top-left */}
            <div className="flex-1 flex items-center justify-center"></div>

            {/* w-top-center */}
            <div className={"w-74/100"}>
              <WallAreaSide direction={Direction.Top} />
            </div>

            {/* w-top-right */}
            <div className="flex-1"></div>
          </div>

          {/* w-center */}
          <div className="h-74/100 flex justify-center items-stretch">
            {/* w-center-left */}
            <div className="flex-1">
              <WallAreaSide direction={Direction.Left} />
            </div>

            {/* w-center-center */}
            <div className={"w-74/100 bg-500-700 flex flex-col bg-indigo-300"}>
              {/* d-top  */}
              <div className="flex-1 flex">
                {/* d-top-left */}
                <div className="flex-1 flex items-center justify-center"></div>

                {/* d-top-center */}
                <div className={"w-66/100 "}>
                  <DiscardAreaSide direction={Direction.Top} />
                </div>

                {/* d-top-right */}
                <div className="flex-1"></div>
              </div>

              {/* d-center */}
              <div className="h-66/100 flex justify-center items-stretch">
                {/* d-center-left */}
                <div className="flex-1">
                  <DiscardAreaSide direction={Direction.Left} />
                </div>

                {/* d-center-center */}
                <div className={"w-66/100"}>
                  <CenterArea />
                </div>

                {/* d-center-right */}
                <div className="flex-1 flex items-center justify-center ">
                  <DiscardAreaSide direction={Direction.Right} />
                </div>
              </div>

              {/* d-bottom */}
              <div className="flex-1 flex ">
                {/* d-bottom-left */}
                <div className="flex-1 flex items-center justify-center"></div>
                {/* d-bottom-center */}
                <div className={"w-66/100"}>
                  <DiscardAreaSide direction={Direction.Bottom} />
                </div>
                {/* d-bottom-right */}
                <div className="flex-1 flex items-center justify-center"></div>
              </div>
            </div>

            {/* w-center-right */}
            <div className="flex-1 ">
              <WallAreaSide direction={Direction.Right} />
            </div>
          </div>

          {/* w-bottom */}
          <div className="flex-1 flex ">
            {/* w-bottom-left */}
            <div className="flex-1 flex items-center justify-center"></div>
            {/* w-bottom-center */}
            <div className="w-74/100 ">
              <WallAreaSide direction={Direction.Bottom} />
            </div>
            {/* w-bottom-right */}
            <div className="flex-1 flex items-center justify-center"></div>
          </div>
        </div>

        {/* p-center-right */}
        <div className="flex-1">
          <PlayerAreaSide direction={Direction.Right} />
        </div>
      </div>

      {/* p-bottom */}
      <div className="flex-1 flex ">
        {/* p-bottom-left */}
        <div className="flex-1 flex items-center justify-center"></div>
        {/* p-bottom-center */}
        <div className="w-82/100">
          <PlayerAreaSide direction={Direction.Bottom} />
        </div>
        {/* p-bottom-right */}
        <div className="flex-1 flex items-center justify-center"></div>
      </div>
    </div>
  );
}
