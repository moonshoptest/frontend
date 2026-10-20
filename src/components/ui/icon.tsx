import {
  ArrowLeft,
  Check,
  Glasses,
  Grid2X2,
  House,
  Layers,
  type LucideIcon,
  Menu,
  Moon,
  Search,
  Shirt,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

const icons = {
  moon: Moon,
  search: Search,
  bag: ShoppingBag,
  check: Check,
  home: House,
  grid: Grid2X2,
  menu: Menu,
  close: X,
  "arrow-left": ArrowLeft,
  sparkles: Sparkles,
  sunglasses: Glasses,
  shirt: Shirt,
  layers: Layers,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

export function Icon({ name, size = 20, className, strokeWidth = 1.7 }: IconProps) {
  const IconComponent = icons[name];

  return (
    <IconComponent
      aria-hidden="true"
      focusable="false"
      size={size}
      className={className}
      strokeWidth={strokeWidth}
    />
  );
}
