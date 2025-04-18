import React from 'react';
import './styles/form.css';

interface DialogProps {
  isOpen: boolean;
  children: React.ReactNode;
  actions: React.ReactNode[];
}

// 对话框组件
const Dialog: React.FC<DialogProps> = ({ isOpen, children, actions }) => {
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
        maxWidth: '400px',
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

export default Dialog; 