import { Handle, Position } from "@xyflow/react";

interface NodeRendererProps {
  data: {
    label: string;
    icon: string;
  };
}

export default function NodeRenderer({ data }: NodeRendererProps) {
  return (
    <div
      className="
        p-3 border border-gray-800 rounded-lg
        bg-white min-w-[100px] text-center
        shadow-sm
      "
    >
      <div className="text-2xl">{data.icon}</div>
      <div className="text-sm font-medium">{data.label}</div>

      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
