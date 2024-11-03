// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import HandleGenerator from '../Constants/handleGenerator';
import BaseNode from '../Base/BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [rightHandlesArr, setRightHandlesArr] = useState([]);
  const [boxDetails, setBoxDetails] = useState({
    width: 270,
    height: 150,
    title: 'Text',
  });
  
  const textareaRef = useRef(null);
  const rightHandleGenerator = new HandleGenerator("source", Position.Right);

  const handleTextChange = (e) => { 
    const newText = e.target.value;
    setCurrText(newText);

    const pattern = /\{\{[^}]*\}\}/g; //"{{koko}}{{koka}}"
    const matches = newText.match(pattern) || []; // here
    const rightHandles = matches.map((match) => {
      match = match.replace(/[\{\}]/g, '');
      if (match === "" || match === " ") {
        return {};
      }
      return rightHandleGenerator.createHandle(undefined, undefined, match);
    });
    
    setRightHandlesArr(rightHandles);
    setBoxDetails({
      width: 270,
      height: 150 + 5 * rightHandles.length,
      title: 'Text',
    });
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    setBoxDetails({
      width:270,
      height: 150 + Math.abs(textareaRef.current.scrollHeight-50),
      title: 'Text',
    })
  }, [currText]);

  return (
    <BaseNode boxDetails={boxDetails} rightHandles={rightHandlesArr}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        <label style={{ padding: "10px", marginBottom: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <textarea
            ref={textareaRef}
            type="text"
            onChange={handleTextChange}
            style={{ marginTop: "5px", padding: "5px", textAlign: "center" }}
            className="bg-purple-700 text-white rounded-md"
          />
        </label>
      </div>
    </BaseNode>
  );
};
