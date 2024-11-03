// loopNode.js

import React, { useState } from 'react';
import { Position } from 'reactflow';
import HandleGenerator from '../Constants/handleGenerator';
import BaseNode from '../Base/BaseNode';

const ConditionNode = ({ id, data }) => {
  const [leftHandles, setLeftHandles] = useState([]);
  const [rightHandles, setRightHandles] = useState([]);

  const leftHandleGenerator = new HandleGenerator("target", Position.Left);
  const rightHandleGenerator = new HandleGenerator("source", Position.Right);

  const addHandles = () => {
    setLeftHandles([
      leftHandleGenerator.createHandle("target", Position.Left, "Data In"),
    ]);

    setRightHandles([
      rightHandleGenerator.createHandle("source", Position.Right, "Condition False"),
      rightHandleGenerator.createHandle("source", Position.Right, "Condition True"),
    ]);
  };

  // Run once to initialize default handles
  if (leftHandles.length === 0 && rightHandles.length === 0) {
    addHandles();
  }

  const boxDetails = {
    width: 270,
    height: 150,
    title: 'Condition',
  };

  return (
    <BaseNode boxDetails={boxDetails} leftHandles={leftHandles} rightHandles={rightHandles}>
      <label style={{ padding: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          type="text"
          placeholder='Condition Here'
          style={{ marginTop: "25px", padding: "5px", textAlign: "center" }}
          className="bg-purple-700 text-white rounded-md"  
        />
      </label>
    </BaseNode>
  );
};

export default ConditionNode;
