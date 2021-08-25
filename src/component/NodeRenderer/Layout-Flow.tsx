import React, {useEffect} from 'react';
import ReactFlow, {Controls, Elements, NodeExtent, useStore, useZoomPanHelper,} from 'react-flow-renderer';

import '../layouting.css';

export interface LayoutFlowProps {
  elements: Elements,
  setOnFocusIdHandler: (handler: (id: string) => void) => void
}

const nodeExtent: NodeExtent = [
  [0, 0],
  [10000, 10000],
];

const LayoutFlow: React.FC<LayoutFlowProps> = ({elements, setOnFocusIdHandler}) => {

  const store = useStore()
  const zoomPanHelper = useZoomPanHelper()

  useEffect(() => {
    function onFocusId(id: string) {
      const node = store.getState().nodes.find(value => value.id === id)
      if (node) {
        const x = node.__rf.position.x + node.__rf.width / 2;
        const y = node.__rf.position.y + node.__rf.height / 2;
        const zoom = 1.85;
        zoomPanHelper.setCenter(x, y, zoom)
      }
    }

    console.log("effect")
    setOnFocusIdHandler(() => onFocusId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store, zoomPanHelper])

  return (
    <>
      <div className="layoutflow">
        <ReactFlow
          className="flow"
          elements={elements}
          nodeExtent={nodeExtent}
          elementsSelectable={false}
          nodesDraggable={false}
          nodesConnectable={false}
          onLoad={instance => instance.fitView({padding: 0.25})}
        >
          <Controls showInteractive={false}/>
        </ReactFlow>
      </div>
    </>
  );
};

export default LayoutFlow;