import React, { useRef } from 'react';
import { useEditorMode } from '../../context/EditorModeContext';
import { Edit2 } from 'lucide-react';

interface Props {
  textKey: string;
  value: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const EditableText: React.FC<Props> = ({
  textKey,
  value,
  className = '',
  as: Component = 'span',
}) => {
  const { isEditorMode, registerChange, pendingChanges } = useEditorMode();
  const elementRef = useRef<HTMLElement>(null);

  // If change is pending, show pending value
  const displayValue = pendingChanges[textKey] !== undefined ? pendingChanges[textKey] : value;

  if (!isEditorMode) {
    return <Component className={className}>{displayValue}</Component>;
  }

  const handleBlur = () => {
    if (elementRef.current) {
      const newText = elementRef.current.innerText.trim();
      if (newText !== value) {
        registerChange(textKey, newText);
      }
    }
  };

  return (
    <div className="relative group inline-block w-full">
      {/* Floating Key Badge */}
      <span className="absolute -top-3.5 left-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity bg-navy text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-md shadow-md flex items-center gap-1 pointer-events-none">
        <Edit2 className="w-2.5 h-2.5 text-gold" />
        {textKey}
      </span>

      <Component
        ref={elementRef as any}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        className={`${className} outline-none border-2 border-dashed border-red-400 hover:border-red-600 bg-red-50/20 hover:bg-red-50/40 rounded-xl p-1 transition-all cursor-text focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-500/20`}
      >
        {displayValue}
      </Component>
    </div>
  );
};

export default EditableText;
