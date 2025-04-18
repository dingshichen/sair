import React, { useState, useEffect } from 'react';
import { Node } from 'reactflow';
import { TableData } from '../mock/tableData';
import './styles/form.css';
import Modal from './Modal';
import Dialog from './Dialog';

interface TableNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNode: Node<{ tableData: TableData }> | null;
  onSave: (nodeId: string | null, updatedData: TableData) => void;
}

/**
 * 节点详情模态框
 */
const TableNodeModal: React.FC<TableNodeModalProps> = ({ isOpen, onClose, selectedNode, onSave }) => {
  const [newEntity] = useState<TableData>({
    tableName: '',
    fields: [
      { ID: '', name: '', type: 'VARCHAR', length: 50, required: false, isKey: false }
    ]
  });
  const [editedData, setEditedData] = useState<TableData | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // 当选中节点或初始数据改变时，初始化编辑数据
  useEffect(() => {
    if (selectedNode) {
      setEditedData(selectedNode.data.tableData);
    } else if (newEntity) {
      setEditedData(newEntity);
    }
  }, [selectedNode, newEntity]);

  if (!isOpen || (!selectedNode && !newEntity) || !editedData) return null;

  // 更新字段
  const updateField = (index: number, field: string, value: string | number | boolean | undefined) => {
    setEditedData(prev => {
      if (!prev) return prev;
      const newFields = [...prev.fields];
      newFields[index] = { ...newFields[index], [field]: value };
      return { ...prev, fields: newFields };
    });
  };

  // 处理保存
  const handleSave = () => {
    if (editedData) {
      onSave(selectedNode?.id || null, editedData);
      onClose();
    }
  };

  return (
    <>
      <Modal 
        isOpen={isOpen}
        actions={[
          <div className="form-actions-left">
            <button 
              onClick={onClose}
              className="form-button"
            >
              取消
            </button>
          </div>,
          <button 
            onClick={() => setShowConfirmDialog(true)}
            className="form-button"
          >
            确定
          </button>
        ]}
      >
        <div style={{ marginBottom: '30px', color: '#000' }}>
          <h2 style={{ margin: '0 0 20px 0' }}>
            <input
              type="text"
              value={editedData.tableName}
              onChange={(e) => setEditedData(prev => prev ? { ...prev, tableName: e.target.value } : prev)}
              style={{ 
                width: '100%', 
                padding: '8px', 
                fontSize: '1.5em',
                border: '1px solid #d9d9d9',
                borderRadius: '4px'
              }}
            />
          </h2>
          <div style={{ paddingBottom: '20px' }}>
            {editedData.fields.map((field, index) => (
              <div key={index} className="form-field-row">
                <button
                  onClick={() => {
                    const newFields = [...editedData.fields];
                    newFields.splice(index + 1, 0, { 
                      ID: '', 
                      name: '', 
                      type: 'VARCHAR',
                      length: undefined,
                      precision: undefined,
                      required: false, 
                      isKey: false 
                    });
                    setEditedData(prev => prev ? { ...prev, fields: newFields } : prev);
                  }}
                  className="form-add-button"
                >
                  +
                </button>
                <input
                  type="text"
                  value={field.name}
                  onChange={(e) => updateField(index, 'name', e.target.value)}
                  placeholder="字段名"
                  className="form-field-input"
                />
                <div className="form-field-type-group">
                  <select
                    value={field.type}
                    onChange={(e) => updateField(index, 'type', e.target.value)}
                    className="form-field-select"
                  >
                    <option value="INT">INT</option>
                    <option value="VARCHAR">VARCHAR</option>
                    <option value="TEXT">TEXT</option>
                    <option value="DATETIME">DATETIME</option>
                    <option value="DECIMAL">DECIMAL</option>
                    <option value="BOOLEAN">BOOLEAN</option>
                  </select>
                </div>
                <div>
                  <input
                      type="text"
                      value={field.length ?? ''}
                      onChange={(e) => updateField(index, 'length', e.target.value ? parseInt(e.target.value) : undefined)}
                      placeholder="长度"
                      className="form-field-input"
                      style={{ width: '30px' }}
                    />
                </div>
                <div>
                  <input
                    type="text"
                    value={field.precision ?? ''}
                    onChange={(e) => updateField(index, 'precision', e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="精度"
                    className="form-field-input"
                    style={{ width: '30px' }}
                  />
                </div>
                <label className="form-label">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => updateField(index, 'required', e.target.checked)}
                  />
                  必填
                </label>
                <label className="form-label">
                  <input
                    type="checkbox"
                    checked={field.isKey}
                    onChange={(e) => updateField(index, 'isKey', e.target.checked)}
                  />
                  主键
                </label>
                <button
                  onClick={() => {
                    const newFields = [...editedData.fields];
                    newFields.splice(index, 1);
                    setEditedData(prev => prev ? { ...prev, fields: newFields } : prev);
                  }}
                  className="form-delete-button"
                  disabled={editedData.fields.length <= 1}
                >
                  -
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <Dialog 
        isOpen={showConfirmDialog}
        actions={[
          <div className="form-actions-left">
            <button 
              onClick={() => setShowConfirmDialog(false)}
              className="form-button"
            >
              取消
            </button>
          </div>,
          <button 
            onClick={() => {
              setShowConfirmDialog(false);
              handleSave();
            }}
            className="form-button"
          >
            确定
          </button>
        ]}
      >
        <div style={{ padding: '20px', textAlign: 'center', color: '#000' }}>
          <h3 style={{ margin: '0 0 20px 0' }}>注意</h3>
          <p>是否确定要保存？</p>
        </div>
      </Dialog>
    </>
  );
};

export default TableNodeModal;
