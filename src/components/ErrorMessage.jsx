// components/ErrorMessage.js - Reusable error component
import React from 'react';

export const ErrorMessage = ({ error, onRetry, onDismiss }) => {
  if (!error) return null;

  return (
    <div style={{
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px 0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <div style={{ color: '#dc2626', fontSize: '18px' }}>⚠️</div>
        <div style={{ flex: 1 }}>
          <h4 style={{ 
            color: '#dc2626', 
            margin: '0 0 8px 0',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Error
          </h4>
          <p style={{ 
            color: '#7f1d1d', 
            margin: 0,
            fontSize: '14px'
          }}>
            {error}
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            marginTop: '12px' 
          }}>
            {onRetry && (
              <button
                onClick={onRetry}
                style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                style={{
                  backgroundColor: 'transparent',
                  color: '#dc2626',
                  border: '1px solid #dc2626',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

