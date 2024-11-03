// llmNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import HandleGenerator from '../Constants/handleGenerator';
import BaseNode from '../Base/BaseNode';

export const LLMNode = ({ id, data }) => {
  const [leftHandles, setLeftHandles] = useState([]);
  const [rightHandles, setRightHandles] = useState([]);

  const leftHandleGenerator = new HandleGenerator("target", Position.Left);
  const rightHandleGenerator = new HandleGenerator("source", Position.Right);

  const addHandles = () => {
    setLeftHandles([
      leftHandleGenerator.createHandle("target", Position.Left, "System"),
      leftHandleGenerator.createHandle("target", Position.Left, "Prompt"),
    ]);

    setRightHandles([
      rightHandleGenerator.createHandle("source", Position.Right, "Response"),
    ]);
  };

  if (leftHandles.length === 0 && rightHandles.length === 0) {
    addHandles();
  }

  const boxDetails = {
    width: 250,
    height: 200,
    title: 'LLM Node',
  };

  return (
    <BaseNode boxDetails={boxDetails} leftHandles={leftHandles} rightHandles={rightHandles}>
      <div>
      <span style={{ display: "block", height:"150px", width: "250px", textAlign: "center", margin: "0 auto" }}>
        This is a LLM.
      </span>
        </div>
    </BaseNode>
  );
};

export default LLMNode;
