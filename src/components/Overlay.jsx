import React, { useEffect, useRef, useState } from "react";
import "./table.css";

const Overlay = ({ isOpen, content, onClose }) => {
  const overlayRef = useRef(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    setIsOverlayOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOverlayOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOverlayOpen, onClose]);

  if (!isOverlayOpen) return null;

  return (
    <div className="overlay" ref={overlayRef}>
      <div className="overlayFilters">{content}</div>
    </div>
  );
};

export default Overlay;
