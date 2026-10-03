'use client';

import { renderBlock, renderEditableBlock, createDefaultBlock, BLOCK_TYPES, getBlockRegistry, EFFECT_OPTIONS, type Block, type BlockType, type BlockTypeDefinition, type BlockFieldDef } from '@/lib/blocks';

export { renderBlock, renderEditableBlock, createDefaultBlock, BLOCK_TYPES, getBlockRegistry, EFFECT_OPTIONS, type Block, type BlockType, type BlockTypeDefinition, type BlockFieldDef };

export function BlockRenderer({ block, editing, onSave, saving }: { block: Block; editing?: boolean; onSave?: (block: Block) => void; saving?: boolean }) {
  if (editing && onSave) {
    return renderEditableBlock(block, onSave, saving || false);
  }
  return renderBlock(block);
}
