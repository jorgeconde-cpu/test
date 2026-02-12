"use client";

import React, { useCallback, useMemo, useState, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type NodeMouseHandler,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MarkerType,
  ReactFlowProvider,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

import { useRelationshipMapStore } from "@/lib/store";
import type { ContactNode as ContactNodeType, ContactConnection, ConnectionType } from "@/lib/types";
import { ContactNodeRenderer } from "./contact-node";
import { RelationshipEdge } from "./custom-edges";
import { NodeContextMenu } from "./node-context-menu";
import { ContactDrawer } from "./contact-drawer";
import { MapLegend } from "./map-legend";
import { MapToolbar } from "./map-toolbar";

/** Register custom node types */
const nodeTypes = {
  contactNode: ContactNodeRenderer,
};

/** Register custom edge types */
const edgeTypes = {
  relationshipEdge: RelationshipEdge,
};

/** Convert our ContactNode to React Flow Node */
function toFlowNode(contact: ContactNodeType): Node {
  return {
    id: contact.id,
    type: "contactNode",
    position: { x: contact.positionX, y: contact.positionY },
    data: contact,
  };
}

/** Edge marker config per connection type */
const EDGE_MARKERS: Record<ConnectionType, { markerEnd: Edge["markerEnd"] }> = {
  reports_to: {
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b", width: 16, height: 16 },
  },
  influences: {
    markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6", width: 16, height: 16 },
  },
  collaborates: {
    markerEnd: undefined,
  },
  blocks: {
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444", width: 20, height: 20 },
  },
};

/** Convert our ContactConnection to React Flow Edge */
function toFlowEdge(connection: ContactConnection): Edge {
  const marker = EDGE_MARKERS[connection.connectionType];
  return {
    id: connection.id,
    source: connection.sourceContactId,
    target: connection.targetContactId,
    type: "relationshipEdge",
    data: {
      connectionType: connection.connectionType,
      weight: connection.weight,
      label: connection.label,
    },
    markerEnd: marker.markerEnd,
  };
}

function RelationshipMapInner() {
  const {
    currentMap,
    updateContactPosition,
    selectedContactId,
    setSelectedContact,
  } = useRelationshipMapStore();

  const [contextMenu, setContextMenu] = useState<{
    contactId: string;
    position: { x: number; y: number };
  } | null>(null);

  const [drawerContactId, setDrawerContactId] = useState<string | null>(null);

  // Convert data to React Flow format
  const nodes = useMemo(
    () => (currentMap?.contacts ?? []).map(toFlowNode),
    [currentMap?.contacts]
  );

  const edges = useMemo(
    () => (currentMap?.connections ?? []).map(toFlowEdge),
    [currentMap?.connections]
  );

  // Handle node position changes (drag-and-drop)
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      // Apply visual changes via React Flow's built-in mechanism
      // On dragStop, persist position to our store
      for (const change of changes) {
        if (change.type === "position" && change.position && !change.dragging) {
          updateContactPosition(
            change.id,
            change.position.x,
            change.position.y
          );
        }
      }
    },
    [updateContactPosition]
  );

  // Handle right-click on node
  const onNodeContextMenu: NodeMouseHandler = useCallback(
    (event, node) => {
      event.preventDefault();
      setContextMenu({
        contactId: node.id,
        position: { x: event.clientX, y: event.clientY },
      });
    },
    []
  );

  // Handle node click (select)
  const onNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      setSelectedContact(node.id);
    },
    [setSelectedContact]
  );

  // Handle double-click to open drawer
  const onNodeDoubleClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      setDrawerContactId(node.id);
    },
    []
  );

  // Handle click on canvas to deselect
  const onPaneClick = useCallback(() => {
    setSelectedContact(null);
    setContextMenu(null);
  }, [setSelectedContact]);

  // Add new contact placeholder
  const handleAddContact = useCallback(() => {
    // For now, open the drawer with a new contact flow
    // In a full implementation, this would create a blank node
    setDrawerContactId("new");
  }, []);

  if (!currentMap) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-50">
        <p className="text-slate-400">No relationship map loaded</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onNodeContextMenu={onNodeContextMenu}
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        onPaneClick={onPaneClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{
          type: "relationshipEdge",
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#e2e8f0" gap={20} size={1} />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={(node) => {
            const sentiment = node.data?.sentiment;
            if (sentiment === "positive") return "#10b981";
            if (sentiment === "negative") return "#f43f5e";
            return "#94a3b8";
          }}
          maskColor="rgba(241, 245, 249, 0.7)"
          style={{ width: 150, height: 100 }}
        />
      </ReactFlow>

      {/* Toolbar */}
      <MapToolbar
        mapName={currentMap.name}
        contactCount={currentMap.contacts.length}
        connectionCount={currentMap.connections.length}
        onAddContact={handleAddContact}
      />

      {/* Legend */}
      <MapLegend />

      {/* Context Menu */}
      {contextMenu && (
        <NodeContextMenu
          contactId={contextMenu.contactId}
          position={contextMenu.position}
          onClose={() => setContextMenu(null)}
          onOpenDrawer={(id) => setDrawerContactId(id)}
        />
      )}

      {/* Contact Detail Drawer */}
      {drawerContactId && drawerContactId !== "new" && (
        <ContactDrawer
          contactId={drawerContactId}
          onClose={() => setDrawerContactId(null)}
        />
      )}
    </div>
  );
}

/** Wrapped with ReactFlowProvider for useReactFlow hook access */
export function RelationshipMapCanvas() {
  return (
    <ReactFlowProvider>
      <RelationshipMapInner />
    </ReactFlowProvider>
  );
}
