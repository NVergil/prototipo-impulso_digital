import React from 'react';

const BottomNav = ({ items, selected, onSelect }) => (
  <nav
    style={{
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      height: 64,
      background: '#f5f0fa',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      boxShadow: '0 -2px 12px rgba(0,0,0,0.08)',
      zIndex: 100,
    }}
  >
    {items.map(item => (
      <button
        key={item.key}
        onClick={() => onSelect(item.key)}
        style={{
          background: 'none',
          border: 'none',
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: selected === item.key ? '#722ed1' : '#222',
          fontSize: 12,
        }}
      >
        <img 
          src={item.icon} 
          alt="" 
          style={{ 
            width: 32, 
            height: 32, 
            marginBottom: 4, 
            transition: 'filter 0.2s',
          }} 
        />
        {selected === item.key && (
          <div 
            style={{
              width: 24,
              height: 4,
              borderRadius: 2,
              background: '#722ed1',
              marginTop: 2,
              boxShadow: '0 2px 8px rgba(114,46,209,0.15)',
              transition: 'background 0.2s',
            }}
          />
        )}
      </button>
    ))}
  </nav>
);

export default BottomNav;
