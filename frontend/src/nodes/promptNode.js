import { useEffect, useRef, useState } from 'react';
import { Position } from 'reactflow';
import HandleGenerator from '../Constants/handleGenerator';
import BaseNode from '../Base/BaseNode';

export const PromptNode = ({ id, data }) => {
  const [currName, setCurrName] = useState("Your prompt goes here");
  const [rightHandles] = useState([]);
  const textareaRef = useRef(null);

  const rightHandleGenerator = new HandleGenerator("source", Position.Right);
  const staticHandle = rightHandleGenerator.createHandle("source", Position.Right, "Prompt");

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    staticHandle.name = newName;
  };

  const [boxDetails, setBoxDetails] = useState({
    width: 270,
    height: 200,
    title: 'Prompt',
  });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    setBoxDetails((prev) => ({
      ...prev,
      height: 150 + Math.abs(textareaRef.current.scrollHeight - 50),
    }));
  }, [currName]);

  return (
    <BaseNode boxDetails={boxDetails} rightHandles={[staticHandle]}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        <label style={{ padding: "10px", marginBottom: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <textarea
            ref={textareaRef}
            type="text"
            value={currName}
            onChange={handleNameChange}
            style={{ marginTop: "5px", padding: "5px", textAlign: "center" }}
            className="bg-purple-700 text-white rounded-md"
          />
        </label>
      </div>
    </BaseNode>
  );
};
