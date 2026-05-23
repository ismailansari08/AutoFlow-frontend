export interface NodePosition {
  x: number;
  y: number;
}

export type CanvasNodeType = 'trigger' | 'ai' | 'delay' | 'condition' | 'action' | 'crm';

export interface CanvasNode {
  id: string;
  type: CanvasNodeType;
  title: string;
  description: string;
  position: NodePosition;
  config: Record<string, unknown>;
}

export interface CanvasEdge {
  id: string;
  from: string;
  to: string;
}

export function getBezierPath(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.abs(x2 - x1) * 0.5;
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

export function configStringArray(config: Record<string, unknown> | undefined, key: string): string[] {
  const val = config?.[key];
  return Array.isArray(val) ? val.filter((x): x is string => typeof x === 'string') : [];
}

export function configString(config: Record<string, unknown> | undefined, key: string, fallback = ''): string {
  const val = config?.[key];
  return typeof val === 'string' ? val : fallback;
}

export function configNumber(config: Record<string, unknown> | undefined, key: string, fallback: number): number {
  const val = config?.[key];
  return typeof val === 'number' ? val : fallback;
}

export function getPortCoordinates(
  nodes: CanvasNode[],
  nodeId: string,
  portType: 'in' | 'out',
) {
  const node = nodes.find((n) => n.id === nodeId);
  if (!node) return { x: 0, y: 0 };
  if (portType === 'out') {
    return { x: node.position.x + 280, y: node.position.y + 60 };
  }
  return { x: node.position.x, y: node.position.y + 60 };
}
