import React from "react";
import {
  minWidthToDisplay,
  minWidthToDisplayText,
  textHeight
} from "./constants";

const ChartNode = ({
  color,
  height,
  isDimmed = false,
  label,
  onClick,
  width,
  x,
  y
}: Props) => (
  <g style={ChartAnimatedNode} transform={`translate(${x},${y})`}>
    <title>{label}</title>
    <rect
      width={width}
      height={height}
      fill={color}
      onClick={onClick}
      style={ChartRect(isDimmed)}
    />
    {width >= minWidthToDisplayText && (
      <foreignObject
        width={width}
        height={height}
        style={{
          ...ChartAnimatedNode,
          opacity: isDimmed ? 0.75 : 1,
          display: width < minWidthToDisplay ? "none" : "block",
          paddingLeft: x < 0 ? -x : 0,
          pointerEvents: "none"
        }}
        y={height < textHeight ? -textHeight : 0}
      >
        <div style={ChartLabel}>{label}</div>
      </foreignObject>
    )}
  </g>
);

const ChartAnimatedNode = {
  transition: "all ease-in-out 250ms"
};

const ChartRect = (isDimmed: boolean) => ({
  cursor: "pointer",
  opacity: isDimmed ? 0.5 : 1,
  stroke: "#fff",
  ...ChartAnimatedNode
});

const ChartLabel = {
  pointerEvents: "none",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  fontSize: "12px",
  fontFamily: "sans-serif",
  marginLeft: "4px",
  marginRight: "4px",
  lineHeight: "1.5",
  padding: "0 0 0",
  fontWeight: "400",
  color: "black",
  textAlign: "left",
  ...ChartAnimatedNode
};

export default ChartNode;
