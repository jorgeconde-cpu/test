"use client";

import React from "react";
import { UserPlus, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { useReactFlow } from "reactflow";

interface MapToolbarProps {
  mapName: string;
  contactCount: number;
  connectionCount: number;
  onAddContact: () => void;
}

export function MapToolbar({
  mapName,
  contactCount,
  connectionCount,
  onAddContact,
}: MapToolbarProps) {
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  return (
    <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
      {/* Map Title & Stats */}
      <div className="bg-white/95 backdrop-blur-sm rounded-lg border border-slate-200 shadow-sm px-4 py-2">
        <h2 className="text-sm font-semibold text-slate-900">{mapName}</h2>
        <p className="text-xs text-slate-500">
          {contactCount} contacts &middot; {connectionCount} connections
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-lg border border-slate-200 shadow-sm p-1">
        <button
          onClick={onAddContact}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors"
          title="Add Contact"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Add
        </button>

        <div className="w-px h-5 bg-slate-200 mx-1" />

        <button
          onClick={() => zoomIn()}
          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => zoomOut()}
          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => fitView({ padding: 0.2, duration: 300 })}
          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition-colors"
          title="Fit View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
