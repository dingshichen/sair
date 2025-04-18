import { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  Position,
  ConnectionMode,
  SelectionMode,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import { initialNodes, initialEdges, TableData } from './mock/tableData';
import TableNode from './components/TableNode';
import TableNodeModal from './components/TableNodeModal';

// 节点类型映射
const nodeTypes = {
  tableNode: TableNode,
};

function Flow() {
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDetailForm, setShowDetailForm] = useState(false);

  // 处理连接
  const onConnect = useCallback(
    (params: Connection | Edge) => {
      // 确保连接是从字段到字段的
      if (params.sourceHandle && params.targetHandle) {
        setEdges((eds) => addEdge({
          ...params,
          type: 'smoothstep',
          animated: true,
        }, eds));
      }
    },
    [setEdges]
  );

  // 处理节点选择
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
    // 更新节点的选中状态
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        selected: n.id === node.id,
      }))
    );
  }, [setNodes]);

  // 处理节点双击
  const onNodeDoubleClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
    setShowDetailForm(true);
  }, []);

  // 处理画布点击（取消选择）
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    // 清除所有节点的选中状态
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        selected: false,
      }))
    );
  }, [setNodes]);

  // 处理节点移动
  const onNodeDragStop = useCallback(() => {
    // 重新计算所有连接线的位置
    setEdges((eds) => {
      return eds.map(edge => {
        const sourceNode = nodes.find(node => node.id === edge.source);
        const targetNode = nodes.find(node => node.id === edge.target);

        if (sourceNode && targetNode) {
          // 根据节点位置决定连接点位置
          const sourcePosition = sourceNode.position.x < targetNode.position.x ? Position.Right : Position.Left;
          const targetPosition = sourceNode.position.x < targetNode.position.x ? Position.Left : Position.Right;
          // 更新连接点
          const sourceFieldId = edge.sourceHandle?.split('-')[1];
          const targetFieldId = edge.targetHandle?.split('-')[1];
          
          return {
            ...edge,
            sourceHandle: `field-${sourceFieldId}-${sourcePosition}`,
            targetHandle: `field-${targetFieldId}-${targetPosition}`,
          };
        }
        return edge;
      });
    });
  }, [nodes, setEdges]);

  // 处理节点数据保存
  const handleSaveNode = (nodeId: string | null, updatedData: TableData) => {
    if (nodeId) {
      // 更新现有节点
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: { tableData: updatedData },
            };
          }
          return node;
        })
      );
    } else {
      // 创建新节点
      const newNodeId = (nodes.length + 1).toString();
      const container = document.querySelector('.react-flow');
      const centerX = (container?.clientWidth || window.innerWidth) / 2;
      const centerY = (container?.clientHeight || window.innerHeight) / 2;
      const { x, y } = reactFlowInstance.project({
        x: centerX,
        y: centerY,
      });
      const newNode = {
        id: newNodeId,
        type: 'tableNode',
        data: { tableData: updatedData },
        position: { x, y },
      };
      setNodes((nds) => [...nds, newNode]);
      setSelectedNode(newNodeId);
    }
    setShowCreateForm(false);
  };

  return (
    <div className="react-flow" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        onPaneClick={onPaneClick}
        onNodeDragStop={onNodeDragStop}
        nodesFocusable={false}
        nodesConnectable={false}
        selectNodesOnDrag={false}
        connectionMode={ConnectionMode.Loose}
        panOnScroll
        selectionOnDrag
        panOnDrag={[1]}
        selectionMode={SelectionMode.Partial}
        fitView
      >
        <Controls />
        <MiniMap 
          nodeColor={() => '#ccc'}
          nodeStrokeWidth={3}
          nodeBorderRadius={2}
          maskColor="rgb(0, 0, 0, 0.1)"
          style={{ background: '#fff' }}
          zoomable
          pannable
        />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Panel position="top-left">
          <div style={{ background: 'white', padding: '10px', borderRadius: '5px', color: 'black', display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => {
                setShowCreateForm(true);
              }}
            >
              添加实体
            </button>
            <button 
              onClick={() => {
                // TODO: 添加关系处理逻辑
              }}
            >
              添加关系
            </button>
          </div>
        </Panel>
      </ReactFlow>

      <TableNodeModal 
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        selectedNode={null}
        onSave={(nodeId, data) => {
          handleSaveNode(nodeId, data);
        }}
      />

      <TableNodeModal 
        isOpen={showDetailForm}
        onClose={() => setShowDetailForm(false)}
        selectedNode={nodes.find(node => node.id === selectedNode) || null}
        onSave={handleSaveNode}
      />
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

export default App;
