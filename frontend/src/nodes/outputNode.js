// outputNode.js

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import HandleGenerator from '../Constants/handleGenerator';
import BaseNode from '../Base/BaseNode';

export const OutputNode = ({ id, data }) => {
  const leftHandleGenerator = new HandleGenerator("target", Position.Left);
  const [outputText, setOutputText] = useState(data?.text || '{{output}}');
  const [leftHandlesArr, setLeftHandlesArr] = useState([leftHandleGenerator.createHandle("target", "new", "output")]);
  const [boxDetails, setBoxDetails] = useState({
    width: 270,
    height: 140,
    title: 'Output',
  });

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [outputText]);

  return (
    <BaseNode boxDetails={boxDetails} leftHandles={leftHandlesArr}>
      <label style={{ display: 'block', textAlign: 'left' }}>
        Output:
        <div style={{ display:'flex', flexDirection:"row-reverse"}}>
          <textarea
            ref={textareaRef}
            readOnly
            style={{ display: 'block', width: '80%', marginRight: "10px",resize: 'none', overflow: 'hidden', alignSelf: 'flex-end'}}
            value={outputText}
            className="bg-purple-700 text-white"
          />
        </div>
      </label>
    </BaseNode>
  );
};
