// toolbar.js
import { useStore } from './store';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const data = useStore(state => state.getBackendData());
    return (
        <div style={{ padding: '10px', display: "flex" }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='loop' label='Condition' />
                <DraggableNode type='prompt' label='Prompt' />
            </div>
            {
                data.hasTriggeredSubmit ? (
                    <div className="mt-5 flex justify-around items-center w-1/2">
                        <label className="flex flex-col items-center p-4 bg-purple-700 text-white rounded-md shadow-md">
                            Nodes: <span className="font-bold">{data.nodesLen}</span>
                        </label>
                        <label className="flex flex-col items-center p-4 bg-purple-700 text-white rounded-md shadow-md">
                            Edges: <span className="font-bold">{data.edgesLen}</span>
                        </label>
                        <label className="flex flex-col items-center p-4 bg-purple-700 text-white rounded-md shadow-md">
                            Directed Acyclic Graph: <span className="font-bold">{data.isDag ? "Yes" : "No"}</span>
                        </label>
                    </div>
                ) : null
            }

        </div>
    );
};
