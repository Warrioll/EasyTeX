import { ReactElement } from 'react';

type FileWithTextIconPropsType = {
  width?: string;
  height?: string;
  color?: string;
  text?: string | ReactElement;
};

export default function FileWithTextIcon({
  width,
  height,
  color,
  text,
}: FileWithTextIconPropsType) {
  return (
    <svg
      width={width}
      height={height}
      clip-rule="evenodd"
      fill-rule="evenodd"
      image-rendering="optimizeQuality"
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision"
      version="1.0"
      viewBox="0 0 427 577"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={`var(--mantine-color-${color}-6)`}
        d="m17 0h290l120 132v426c0 10-8 19-17 19h-393c-9 0-17-9-17-19v-539c0-11 8-19 17-19z"
      />
      <path
        fill={`var(--mantine-color-${color}-8)`}
        d="m427 132h-103c-9 0-17-9-17-19v-113l120 132z"
      />
      <text
        x="64.454155"
        y="351.7543"
        fill="#ffffff"
        font-family="Onyx"
        font-size="170.58px"
        stroke-width="6.3967"
      >
        <tspan
          x="64.454155"
          y="351.7543"
          fill="#ffffff"
          font-family="Calibri"
          font-size="170.58px"
          font-weight="bold"
          stroke-width="6.3967"
        >
          {text}
        </tspan>
      </text>
    </svg>
  );
}
