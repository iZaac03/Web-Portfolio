import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [outlinePos, setOutlinePos] = useState({ x: -100, y: -100 });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setOutlinePos({ x: e.clientX, y: e.clientY });
      }, 40);
    };

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, select, .clickable, .jam-key, .lesson-pill, .sql-chip, .r-key, .d-pad, .trivia-opt, .typer-cat-chip')) {
        setIsHover(true);
      } else {
        setIsHover(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        className={`cursor-dot ${isHover ? 'hover' : ''}`}
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
      <div 
        className={`cursor-outline ${isHover ? 'hover' : ''}`}
        style={{ left: `${outlinePos.x}px`, top: `${outlinePos.y}px` }}
      />
    </>
  );
}
