interface svgProps {
    width: number;
    height: number;
    viewBox: string;
    strokeWidth: number;
  }
  
  export default function ZoomIcon({
    width,
    height,
    viewBox,
    strokeWidth,
  }: svgProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-foreground"
        width={width}
        height={height}
        viewBox={viewBox}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M17.011 9.385v5.128l3.989 3.487v-12z" />
        <path d="M3.887 6h10.08c1.468 0 3.033 1.203 3.033 2.803v8.196a.991 .991 0 0 1 -.975 1h-10.373c-1.667 0 -2.652 -1.5 -2.652 -3l.01 -8a.882 .882 0 0 1 .208 -.71a.841 .841 0 0 1 .67 -.287z" />
      </svg>
    );
  }