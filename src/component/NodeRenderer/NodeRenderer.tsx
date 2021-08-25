import {ArrowHeadType, Edge, isNode, Node, Position, ReactFlowProvider} from "react-flow-renderer";
import LayoutFlow from "./Layout-Flow";
import {ItemConnection} from "../../util/ItemConnection";
import dagre from "dagre";
import React from "react";

interface NodeRendererProps {
  connections: ItemConnection[]
  sources: string[]
  targets: string[]
  setOnFocusIdHandler: (handler: (id: string) => void) => void
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const NodeRenderer: React.FC<NodeRendererProps> = ({connections, setOnFocusIdHandler, sources, targets}) => {

  const nodes: Node[] = Array.from(new Set([...sources, ...targets])).map(name => {
      let type = 'default';
      if (sources.includes(name) && !targets.includes(name)) {
        type = 'input'
      } else if (!sources.includes(name) && targets.includes(name)) {
        type = 'output'
      }

      return {
        id: name,
        type,
        data: {label: name},
        position: {x: 0, y: 0},
      }
    }
  )

  const edges: Edge[] = connections.map(connection => {
    if (!connection.target) {
      return null
    }
    return {
      id: `${connection.source}-${connection.target}`,
      source: connection.source,
      target: connection.target,
      type: 'smoothstep',
      arrowHeadType: ArrowHeadType.ArrowClosed

    }
  }).filter(value => value !== null) as Edge[]

  dagreGraph.setGraph({rankdir: 'LR'});

  const elements = [...nodes, ...edges]

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, {width: 150, height: 50});
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });
  dagre.layout(dagreGraph);

  const layoutedElements = elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = Position.Left;
      el.sourcePosition = Position.Right;
      // we need to pass a slighltiy different position in order to notify react flow about the change
      // @TODO how can we change the position handling so that we dont need this hack?
      el.position = {x: nodeWithPosition.x + Math.random() / 1000, y: nodeWithPosition.y};
    }

    return el;
  });

  return (
    <ReactFlowProvider>
      <LayoutFlow elements={layoutedElements} setOnFocusIdHandler={setOnFocusIdHandler} />
    </ReactFlowProvider>
  )
}

export default NodeRenderer