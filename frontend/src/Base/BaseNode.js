import React from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({ boxDetails, leftHandles = [], rightHandles = [], children }) => {
  return (
    <div className={`border border-purple-600 shadow-purple-500 shadow-md relative rounded-xl bg-slate-50 `} style={{ width: boxDetails.width, padding: boxDetails.padding, height: boxDetails.height }}>
      
      {leftHandles.map((handle, index) => {
        return (
          <div key={handle.id} className="absolute left-0 flex items-center" style={{ top: `${(100 / (leftHandles.length + 1)) * (index + 1)}%` }}>
            <Handle
              type={handle.type}
              position={Position.Left}
              id={`${handle.id}`}
            />
            <span className="text-xs  text-purple-900">{handle.name}</span>
          </div>
        );
      })}

      <div className="text-center mb-2 rounded-t-xl bg-purple-700 text-purple-50">
        <span>{boxDetails.title}</span>
      </div>

      <div>
        {children}
      </div>

      {rightHandles.map((handle, index) => {
        return (
          <div key={handle.id} className="absolute right-0 flex items-center" style={{ top: `${(100 / (rightHandles.length + 1)) * (index + 1)}%` }}>
            <span className="text-xs mr-1 text-purple-900">{handle.name}</span>
            <Handle
              type={handle.type}
              position={Position.Right}
              id={`${handle.id}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BaseNode;
