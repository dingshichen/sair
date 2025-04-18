import React from 'react';
import './styles/form.css';

interface ModalProps {
  isOpen: boolean;

  // 模态框内容
  children: React.ReactNode;

  // 模态框底部按钮
  actions: React.ReactNode[];
}

// 模态框组件
const Modal: React.FC<ModalProps> = ({ isOpen, children, actions }) => {
    if (!isOpen) return null;
  
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '800px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          position: 'relative',
        }}>
          {children}
          <div className="form-actions" style={{ paddingTop: '20px', borderTop: '1px solid #eee' }}>
            {actions}
          </div>
        </div>
      </div>
    );
  };

  export default Modal;