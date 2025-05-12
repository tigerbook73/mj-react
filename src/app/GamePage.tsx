import PlayerAreaHand from "@/components/PlayerAreaHand";
import PlayerAreaTopLeft from "@/components/PlayerAreaTopLeft";
import WallArea from "@/components/WallArea";
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
        <div className="w-78/100">
          <PlayerAreaHand direction={Direction.Top} />
        </div>

        {/* p-top-right */}
        <div className="flex-1"></div>
      </div>

      {/* p-center */}
      <div className="h-78/100 flex justify-center items-stretch">
        {/* p-center-left */}
        <div className="flex-1">
          <PlayerAreaHand direction={Direction.Left} />
        </div>

        {/* p-center-center */}
        <div className={"w-78/100 flex flex-col bg-yellow-900 "}>
          {/* w-top  */}
          <div className="flex-1 flex">
            {/* w-top-left */}
            <div className="flex-1 flex items-center justify-center"></div>

            {/* w-top-center */}
            <div className={"w-72/100"}>
              <WallArea direction={Direction.Top} />
            </div>

            {/* w-top-right */}
            <div className="flex-1"></div>
          </div>

          {/* w-center */}
          <div className="h-72/100 flex justify-center items-stretch">
            {/* w-center-left */}
            <div className="flex-1">
              <WallArea direction={Direction.Left} />
            </div>

            {/* w-center-center */}
            <div className={"w-72/100 bg-500-700 flex flex-col bg-indigo-300"}>
              {/* d-top  */}
              <div className="flex-1 flex">
                {/* d-top-left */}
                <div className="flex-1 flex items-center justify-center"></div>

                {/* d-top-center */}
                <div className={"w-62/100 "} />

                {/* d-top-right */}
                <div className="flex-1"></div>
              </div>

              {/* d-center */}
              <div className="h-62/100 flex justify-center items-stretch">
                {/* d-center-left */}
                <div className="flex-1 " />

                {/* d-center-center */}
                <div className={"w-62/100 bg-green-900"}></div>

                {/* d-center-right */}
                <div className="flex-1 flex items-center justify-center "></div>
              </div>

              {/* d-bottom */}
              <div className="flex-1 flex ">
                {/* d-bottom-left */}
                <div className="flex-1 flex items-center justify-center"></div>
                {/* d-bottom-center */}
                <div className={"w-62/100"} />
                {/* d-bottom-right */}
                <div className="flex-1 flex items-center justify-center"></div>
              </div>
            </div>

            {/* w-center-right */}
            <div className="flex-1 ">
              <WallArea direction={Direction.Right} />
            </div>
          </div>

          {/* w-bottom */}
          <div className="flex-1 flex ">
            {/* w-bottom-left */}
            <div className="flex-1 flex items-center justify-center"></div>
            {/* w-bottom-center */}
            <div className="w-72/100 ">
              <WallArea direction={Direction.Bottom} />
            </div>
            {/* w-bottom-right */}
            <div className="flex-1 flex items-center justify-center"></div>
          </div>
        </div>

        {/* p-center-right */}
        <div className="flex-1">
          <PlayerAreaHand direction={Direction.Right} />
        </div>
      </div>

      {/* p-bottom */}
      <div className="flex-1 flex ">
        {/* p-bottom-left */}
        <div className="flex-1 flex items-center justify-center"></div>
        {/* p-bottom-center */}
        <div className="w-78/100">
          <PlayerAreaHand direction={Direction.Bottom} />
        </div>
        {/* p-bottom-right */}
        <div className="flex-1 flex items-center justify-center"></div>
      </div>
    </div>
  );
}
