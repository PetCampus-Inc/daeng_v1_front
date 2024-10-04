import type { IconProps } from "./types";

export default function ExpandIcon({ w = 24, h = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} fill="none" viewBox="0 0 24 24">
      <g id="Group 1000003832">
        <rect
          id="Rectangle 34625077"
          width={24}
          height={24}
          fill="#000"
          fillOpacity={0.2}
          rx={4.216}
        />
        <path
          id="Vector 1576"
          stroke="#fff"
          strokeWidth={1.8}
          d="M12.328 5.188h5.081c.776 0 1.406.63 1.406 1.406v5.081"
        />
        <path
          id="Vector 1577"
          stroke="#fff"
          strokeWidth={1.8}
          d="M11.672 18.811H6.59a1.406 1.406 0 0 1-1.406-1.405v-5.081"
        />
      </g>
    </svg>
  );
}
