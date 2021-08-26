import React from "react"
import {EdgeProps, getBezierPath, getMarkerEnd, getSmoothStepPath, Position} from "react-flow-renderer";

const CustomEdge: React.FC<EdgeProps> = (
  {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    arrowHeadType,
    markerEndId,
  }
) => {
  let edgePath;
  console.log(`${sourceX} > ${targetX} : ${sourceX > targetX}`)
  if (targetX < sourceX) {
    const firstCorner = {x: sourceX + 10, y: targetY + 20}
    const secondCorner = {x: targetX - 10, y: targetY + 20}

    edgePath = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX: firstCorner.x,
      targetY: firstCorner.y,
      targetPosition: Position.Top
    })
    edgePath += getSmoothStepPath({
      sourceX: firstCorner.x,
      sourceY: firstCorner.y,
      sourcePosition,
      targetX: secondCorner.x,
      targetY: secondCorner.y,
      targetPosition
    })
    edgePath += getBezierPath({
      sourceX: secondCorner.x,
      sourceY: secondCorner.y,
      sourcePosition: Position.Top,
      targetX,
      targetY,
      targetPosition
    })
  } else {
    edgePath = getSmoothStepPath({sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition})
  }
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd}/>
    </>
  );
}

export default CustomEdge