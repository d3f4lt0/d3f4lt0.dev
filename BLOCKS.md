# Block Registry

The block registry lives in `src/lib/blocks.tsx`. It is the single source of truth for every block type the admin can render, edit, or add.

## How to add a new block type

1. In `src/lib/blocks.tsx`, add a new interface extending `BaseBlock`:
   ```ts
   export interface MyNewBlock extends BaseBlock {
     type: 'my-new';
     content: string;
   }
   ```
2. Add the new type to the `BlockType` union and to the `Block` union.
3. Add a new entry to `BLOCK_REGISTRY` with:
   - `type`: matches the new `BlockType`
   - `label`: human-readable name shown in the admin picker
   - `fields`: array of `BlockFieldDef` describing editable fields
   - `render`: public renderer for the block
   - `editableRender`: admin edit-mode renderer
   - `defaultBlock`: factory for a fresh block of this type
4. Export any new interfaces/types from `src/components/admin/block-renderer.tsx` if they need to be consumed elsewhere.

That is the only required change. The admin preview pages, `BlockRenderer`, and the "+ Add block" picker all read from `BLOCK_REGISTRY` automatically.

## Visual effects

All CSS-based effects already present in `globals.css` are registered in `EFFECT_COMPONENTS` and exposed through `EFFECT_OPTIONS`. To add a new effect:
1. Add the CSS class to `src/app/globals.css`
2. Add a new entry to `EFFECT_COMPONENTS` in `src/lib/blocks.tsx`
3. The effect automatically appears in the admin block picker.
