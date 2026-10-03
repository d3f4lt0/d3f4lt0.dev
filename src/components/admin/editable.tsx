'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';

interface EditableProps {
  value: string;
  onSave: (value: string) => Promise<void> | void;
  type?: 'text' | 'textarea' | 'background';
  className?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div' | 'label';
  placeholder?: string;
  saving?: boolean;
  children?: ReactNode;
}

export function Editable({
  value,
  onSave,
  type = 'text',
  className = '',
  as = 'span',
  placeholder = 'Click to edit...',
  saving = false,
  children,
}: EditableProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [savingState, setSavingState] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const commit = async (next: string) => {
    if (next === value) {
      setEditing(false);
      return;
    }
    setSavingState(true);
    try {
      await onSave(next);
      setEditing(false);
    } catch (err) {
      console.error('Failed to save editable:', err);
      setDraft(value);
    } finally {
      setSavingState(false);
    }
  };

  const handleClick = () => {
    if (type === 'background') {
      colorInputRef.current?.click();
      return;
    }
    setEditing(true);
  };

  const handleBlur = () => {
    if (type === 'background') return;
    commit(draft);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && type !== 'textarea') {
      e.preventDefault();
      commit(draft);
    }
    if (e.key === 'Escape') {
      setDraft(value);
      setEditing(false);
    }
  };

  const Comp = as;

  if (type === 'background') {
    return (
      <div className={`relative inline-block ${className}`}>
        <div
          className="cursor-pointer rounded-sm border-2 border-dashed border-transparent transition-colors hover:border-primary/40"
          style={{ backgroundColor: value || undefined }}
          onClick={handleClick}
          title="Click to edit background"
        >
          {children}
        </div>
        <input
          ref={colorInputRef}
          type="color"
          value={value || '#000000'}
          onChange={(e) => onSave(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          disabled={saving || savingState}
        />
      </div>
    );
  }

  if (editing) {
    if (type === 'textarea') {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={saving || savingState}
          className={`w-full rounded-md border border-primary/60 bg-background px-2 py-1 text-sm ${className}`}
          rows={4}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={saving || savingState}
        className={`w-full rounded-md border border-primary/60 bg-background px-2 py-1 text-sm ${className}`}
      />
    );
  }

  return (
    <Comp
      className={`cursor-pointer rounded-sm border-2 border-dashed border-transparent transition-colors hover:border-primary/40 ${className}`}
      onClick={handleClick}
      title="Click to edit"
    >
      {value || <span className="text-muted-foreground/50">{placeholder}</span>}
    </Comp>
  );
}
