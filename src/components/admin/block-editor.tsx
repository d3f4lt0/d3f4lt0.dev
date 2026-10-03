'use client';

import { useState, useEffect } from 'react';
import { Block, BLOCK_TYPES, createDefaultBlock, BlockType } from '@/lib/blocks';
import { BlockRenderer } from '@/components/admin/block-renderer';

interface BlockEditorProps {
  blocks: Block[];
  onSaveBlocks: (blocks: Block[]) => Promise<void> | void;
  saving?: boolean;
}

export function BlockEditor({ blocks: initialBlocks, onSaveBlocks, saving = false }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [pickerIndex, setPickerIndex] = useState<number | null>(null);

  useEffect(() => {
    setBlocks(initialBlocks);
  }, [initialBlocks]);

  const sync = (newBlocks: Block[]) => {
    const reordered = newBlocks.map((b, i) => ({ ...b, order: i }));
    setBlocks(reordered);
    onSaveBlocks(reordered);
  };

  const handleAdd = (index: number, type: BlockType) => {
    const newBlock = createDefaultBlock(type, index);
    const updated = [...blocks];
    updated.splice(index, 0, newBlock);
    sync(updated);
    setPickerIndex(null);
  };

  const handleRemove = (id: string) => {
    const updated = blocks.filter((b) => b.id !== id);
    sync(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    const updated = [...blocks];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    sync(updated);
  };

  return (
    <div className="space-y-1">
      <AddBlockButton onClick={() => setPickerIndex(0)} disabled={saving} />
      {pickerIndex === 0 && (
        <BlockTypePicker onSelect={(type) => handleAdd(0, type)} onCancel={() => setPickerIndex(null)} />
      )}

      {blocks.map((block, index) => (
        <div key={block.id}>
          <AddBlockButton onClick={() => setPickerIndex(index + 1)} disabled={saving} />
          {pickerIndex === index + 1 && (
            <BlockTypePicker onSelect={(type) => handleAdd(index + 1, type)} onCancel={() => setPickerIndex(null)} />
          )}

          <div className="relative group">
            <BlockRenderer
              block={block}
              editing
              onSave={(updated) => {
                const updatedBlocks = blocks.map((b) => (b.id === updated.id ? updated : b));
                sync(updatedBlocks);
              }}
              saving={saving}
            />

            <div className="absolute -right-2 top-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => handleMove(index, 'up')}
                disabled={index === 0 || saving}
                className="rounded bg-muted/50 p-1 text-xs hover:bg-muted disabled:opacity-50"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => handleMove(index, 'down')}
                disabled={index === blocks.length - 1 || saving}
                className="rounded bg-muted/50 p-1 text-xs hover:bg-muted disabled:opacity-50"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => handleRemove(block.id)}
                disabled={saving}
                className="rounded bg-destructive/10 p-1 text-xs text-destructive hover:bg-destructive/20 disabled:opacity-50"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AddBlockButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full py-2 text-xs font-medium text-muted-foreground/60 hover:text-primary hover:bg-primary/5 rounded transition-colors disabled:opacity-50"
    >
      + Add block
    </button>
  );
}

function BlockTypePicker({ onSelect, onCancel }: { onSelect: (type: BlockType) => void; onCancel: () => void }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-md border border-border bg-background p-2">
      {BLOCK_TYPES.map((def) => (
        <button
          key={def.type}
          type="button"
          onClick={() => onSelect(def.type)}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
        >
          {def.label}
        </button>
      ))}
      <button
        type="button"
        onClick={onCancel}
        className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
      >
        Cancel
      </button>
    </div>
  );
}
