// src/components/Layout.tsx
import { useCallback } from "react";

import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import NodeRenderer from "./Canvas/NodeRenderer";
import ComponentCatalog from "./Sidebar/ComponentCatalog";
import components from "../data/components.json";

export default function Layout() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const nodeTypes = { database: NodeRenderer };

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      const component = components.find((c) => c.id === type);

      if (!component) return;

      const position = { x: event.clientX - 250, y: event.clientY - 50 };
      const newNode: Node = {
        id: `${type}_${+new Date()}`,
        type,
        position,
        data: { label: component.name, icon: component.icon },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div className="flex h-screen">
      <ComponentCatalog />
      <div className="flex-grow">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
        <Controls />
            </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}
