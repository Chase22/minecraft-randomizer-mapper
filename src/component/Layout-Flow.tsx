import React from 'react';
import ReactFlow, {
  ArrowHeadType,
  Controls,
  Edge,
  isNode,
  Node,
  NodeExtent,
  Position,
  ReactFlowProvider,
} from 'react-flow-renderer';
import dagre from 'dagre';

import './layouting.css';
import {ItemConnection} from "../App";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeExtent: NodeExtent = [
  [0, 0],
  [1000, 1000],
];

interface LayoutFlowProps {
  connections: ItemConnection[]
}

const LayoutFlow: React.FC<LayoutFlowProps> = ({connections}) => {
  let sourceList = [...connections.map(value => value.source), ...connections.map(value => value.target)];
  let set = new Set(sourceList);
  const nodes: Node[] = Array.from(set).map(name => {
    console.log(name)
      return {
        id: name,
        type: 'default',
        data: {label: name},
        position: {x: 0, y: 0},
      }
    }
  )

  const edges: Edge[] = connections.map(connection => {
    return {
      id: `${connection.source}-${connection.target}`,
      source: connection.source,
      target: connection.target,
      type: 'smoothstep',
      arrowHeadType: ArrowHeadType.ArrowClosed

    }
  })

  const elements = [...nodes, ...edges]

  dagreGraph.setGraph({rankdir: 'LR'});

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
    <div className="layoutflow">
      <ReactFlowProvider>
        <ReactFlow
          className="flow"
          elements={layoutedElements}
          nodeExtent={nodeExtent}
          elementsSelectable={false}
          nodesDraggable={false}
          nodesConnectable={false}
        >
          <Controls showInteractive={false}/>
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default LayoutFlow;