import components from "../../data/components.json";

export default function ComponentCatalog() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="p-3 border-r border-gray-300">
      <h3 className="text-lg font-semibold mb-2">Components</h3>
      {components.map((comp) => (
        <div
          key={comp.id}
          onDragStart={(event) => onDragStart(event, comp.id)}
          draggable
          className="
            flex items-center
            p-2 mb-2
            border border-gray-400 rounded-md
            cursor-grab bg-gray-50
            hover:bg-gray-100 transition
          "
        >
          <span className="mr-2">{comp.icon}</span>
          <span>{comp.name}</span>
        </div>
      ))}
    </aside>
  );
}
