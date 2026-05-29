import { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  MarkerType,
  type Node,
  type Edge,
  type NodeProps,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { NODES, EDGES } from '../../content/data/manhal/graph';
import type { MasteryStatus } from '../../content/data/manhal/types';
import { layeredLayout } from '../../lib/manhalLayout';
import { STATUS_META } from '../../lib/status';

type OutcomeData = {
  code: string;
  label: string;
  status: MasteryStatus;
  bloom: string;
};

const STATUS_HEX: Record<MasteryStatus, string> = {
  mastered: '#2F4A3C',
  proficient: '#6C7D3C',
  in_progress: '#B26540',
  available: '#9A7B4F',
  locked: '#D8DED3',
};

// Custom node: a compact outcome card coloured by mastery status.
function OutcomeNodeView({ data, selected }: NodeProps) {
  const d = data as OutcomeData;
  const meta = STATUS_META[d.status];
  return (
    <div
      className={`rounded-lg border px-3 py-2 w-[184px] shadow-sm transition ${meta.card} ${
        selected ? 'ring-2 ring-bronze ring-offset-1' : ''
      }`}
    >
      <Handle type="target" position={Position.Left} className="!h-1.5 !w-1.5 !bg-bronze/70 !border-0" />
      <div className="text-[9px] uppercase tracking-widest opacity-70">
        {d.code} · {d.bloom}
      </div>
      <div className="text-xs font-medium leading-snug mt-0.5">{d.label}</div>
      <Handle type="source" position={Position.Right} className="!h-1.5 !w-1.5 !bg-bronze/70 !border-0" />
    </div>
  );
}

const nodeTypes: NodeTypes = { outcome: OutcomeNodeView };

interface Props {
  statuses: Map<string, MasteryStatus>;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  height?: number;
}

export function KnowledgeGraph({ statuses, selectedId, onSelect, height = 540 }: Props) {
  const pos = useMemo(() => layeredLayout(NODES, EDGES), []);

  const nodes: Node[] = useMemo(
    () =>
      NODES.map((n) => {
        const p = pos.get(n.id);
        const data: OutcomeData = {
          code: n.id,
          label: n.title,
          status: statuses.get(n.id) ?? 'locked',
          bloom: n.bloom,
        };
        return {
          id: n.id,
          type: 'outcome',
          position: { x: p?.x ?? 0, y: p?.y ?? 0 },
          data,
          selected: n.id === selectedId,
        };
      }),
    [pos, statuses, selectedId],
  );

  const edges: Edge[] = useMemo(
    () =>
      EDGES.map((e, i) => {
        const related = e.type === 'related';
        const color = related ? '#9A7B4F' : '#6C7D3C';
        return {
          id: `e-${i}-${e.from}-${e.to}`,
          source: e.from,
          target: e.to,
          animated: e.type === 'prerequisite' && statuses.get(e.from) === 'mastered',
          style: related
            ? { stroke: color, strokeDasharray: '5 5', strokeWidth: 1 }
            : { stroke: color, strokeWidth: 1.5 },
          markerEnd: { type: MarkerType.ArrowClosed, color, width: 16, height: 16 },
        };
      }),
    [statuses],
  );

  return (
    <div className="rounded-xl border border-sand bg-white overflow-hidden" style={{ height }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, n) => onSelect(n.id)}
        onPaneClick={() => onSelect(null)}
        nodesDraggable={false}
        nodesConnectable={false}
        edgesFocusable={false}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={1.6}
        proOptions={{ hideAttribution: false }}
      >
        <Background color="#E4E9DF" gap={20} />
        <Controls showInteractive={false} />
        <MiniMap
          pannable
          zoomable
          nodeColor={(n) => STATUS_HEX[(n.data as OutcomeData).status] ?? '#D8DED3'}
          maskColor="rgba(47,74,60,0.06)"
        />
      </ReactFlow>
    </div>
  );
}
