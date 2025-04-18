import { Handle, Position } from 'reactflow';
import { TableData } from '../mock/tableData';

import './styles/tableNode.css';

// 自定义表节点组件
const TableNode = ({ data, selected }: { data: { tableData: TableData }; selected?: boolean }) => {
    const { tableData } = data;
    
    return (
      <div className="table-node">
        <div className={`table-header${selected ? '-selected' : ''}`}>{tableData.tableName}</div>
        <div className="table-fields">
          {tableData.fields.map((field, index) => (
            <div key={index} className="table-field">
              <span className="field-indicator">
                {field.isKey ? (
                  <span className="key-indicator">🔑</span>
                ) : field.required ? (
                  <span className="required-indicator">*</span>
                ) : (
                  <span className="optional-indicator">○</span>
                )}
              </span>
              <span className="field-name">{field.name}</span>
              <span className="field-type">{field.type}</span>
              <Handle
                type="source"
                position={Position.Right}
                id={`field-${field.ID}-${Position.Right}`}
                className="field-handle"
              />
              <Handle
                type="source"
                position={Position.Left}
                id={`field-${field.ID}-${Position.Left}`}
                className="field-handle"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default TableNode;