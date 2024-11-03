// submit.js
import axios from 'axios';
import { useStore } from './store';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => state.getNodesAndEdges());

    const handleSubmit = (e) => {
        e.preventDefault();
        useStore.setState({ hasTriggeredSubmit: true });

        axios.post('http://localhost:8000/pipelines/parse', { nodes, edges })
            .then((response) => {
                const { nodesLen, edgesLen, is_dag } = response.data;
                console.log(response.data);
                useStore.setState({ nodeLen: nodesLen, edgeLen: edgesLen, isDag: is_dag });
            })
            .catch((error) => {
                console.error("Error submitting data:", error);
            });
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button className='rounded-md w-1/6 bg-purple-900 text-white font-bold' type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
};
