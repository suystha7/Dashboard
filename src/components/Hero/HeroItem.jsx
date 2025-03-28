import { Button } from "@/components/ui/button";

export default function HeroItem({ hero, onEdit }) {
  return (
    <div className="border p-4 rounded-lg flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{hero.heading}</h3>
        <p className="text-sm text-muted-foreground">{hero.content}</p>
      </div>
      <Button onClick={() => onEdit(hero)}>Edit</Button>
    </div>
  );
}
