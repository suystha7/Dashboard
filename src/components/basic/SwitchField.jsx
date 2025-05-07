import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function SwitchField({ id, label, checked, onChange }) {

  return (
    <div className="flex space-y-5 space-x-10">
      <Label htmlFor={id}>{label}</Label>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />

    </div>
  );
}
