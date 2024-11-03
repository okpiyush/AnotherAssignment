import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import HandleGenerator from '../Constants/handleGenerator';
import BaseNode from '../Base/BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const rightHandleGenerator = new HandleGenerator("source", Position.Right);
  const staticHandle = rightHandleGenerator.createHandle("source", Position.Right, "Input");

  const boxDetails = {
    width: 270,
    height: 200,
    title: 'Input',
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    staticHandle.name = newName;
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode boxDetails={boxDetails} rightHandles={[staticHandle]}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        <label style={{ padding: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            style={{ marginTop: "5px", padding: "5px", textAlign: "center" }}
            className="bg-purple-700 text-white rounded-md"
          />
        </label>
        
        <label style={{ padding: "20px", marginTop: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <select
            value={inputType}
            onChange={handleTypeChange}
            style={{ padding: "5px" }}
            className="bg-purple-700 text-white rounded-md"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
