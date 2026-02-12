"use client";

import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from "reactflow";
import type { ConnectionType } from "@/lib/types";

interface CustomEdgeData {
  connectionType: ConnectionType;
  weight: number;
  label?: string;
}

/** Edge style config per connection type */
const EDGE_STYLES: Record<
  ConnectionType,
  { stroke: string; strokeDasharray?: string; animated: boolean }
> = {
  reports_to: {
    stroke: "#64748b", // slate-500
    animated: false,
  },
  influences: {
    stroke: "#3b82f6", // blue-500
    strokeDasharray: "8 4",
    animated: true,
  },
  collaborates: {
    stroke: "#8b5cf6", // violet-500
    strokeDasharray: "4 4",
    animated: false,
  },
  blocks: {
    stroke: "#ef4444", // rose-500
    strokeDasharray: "12 4",
    animated: true,
  },
};

const EDGE_LABEL_COLORS: Record<ConnectionType, string> = {
  reports_to: "bg-slate-100 text-slate-700 border-slate-300",
  influences: "bg-blue-50 text-blue-700 border-blue-200",
  collaborates: "bg-violet-50 text-violet-700 border-violet-200",
  blocks: "bg-rose-50 text-rose-700 border-rose-200",
};

export function RelationshipEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  selected,
}: EdgeProps<CustomEdgeData>) {
  const connectionType = data?.connectionType ?? "reports_to";
  const style = EDGE_STYLES[connectionType];
  const strokeWidth = Math.max(1.5, (data?.weight ?? 5) / 4);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: style.stroke,
          strokeWidth: selected ? strokeWidth + 1 : strokeWidth,
          strokeDasharray: style.strokeDasharray,
          filter: selected ? "drop-shadow(0 0 3px rgba(59,130,246,0.5))" : undefined,
        }}
      />

      {/* Animated dot for influence/block edges */}
      {style.animated && (
        <circle r="3" fill={style.stroke}>
          <animateMotion dur="3s" repeatCount="indefinite" path={edgePath} />
        </circle>
      )}

      {/* Edge label */}
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            className={`
              absolute text-[10px] font-medium px-2 py-0.5 rounded-full border
              pointer-events-all cursor-pointer
              ${EDGE_LABEL_COLORS[connectionType]}
            `}
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            }}
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
