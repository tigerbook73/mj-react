import useMJStore from "@/stores/mj-store";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export default function PlayerAreaTopLeft() {
  const open = useMJStore((state) => state.open);
  const setOpen = useMJStore((state) => state.setOpen);

  return (
    <Label className="flex items-center justify-center">
      <span>明牌</span>
      <Switch checked={open} onCheckedChange={() => setOpen(!open)} />
    </Label>
  );
}
