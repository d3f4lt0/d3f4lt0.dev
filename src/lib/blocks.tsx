'use client';

import { Editable } from '@/components/admin/editable';
import { Card, CardContent } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';

export type BlockType = 'title' | 'text' | 'effect' | 'interests' | 'learning' | 'stack' | 'working-style' | 'contacts';

export interface BaseBlock {
  id: string;
  type: BlockType;
  order: number;
}

export interface TitleBlock extends BaseBlock {
  type: 'title';
  text: string;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: string;
}

export interface EffectBlock extends BaseBlock {
  type: 'effect';
  effect: 'nerv-grid' | 'nerv-scanline' | 'nerv-light-beam' | 'nerv-particles' | 'nerv-corner' | 'grain-overlay' | 'angel-wings' | 'starfield';
}

export interface InterestsBlock extends BaseBlock {
  type: 'interests';
  content: string;
}

export interface LearningBlock extends BaseBlock {
  type: 'learning';
  content: string;
}

export interface StackBlock extends BaseBlock {
  type: 'stack';
  content: string;
}

export interface WorkingStyleBlock extends BaseBlock {
  type: 'working-style';
  content: string;
}

export interface ContactsBlock extends BaseBlock {
  type: 'contacts';
  content: string;
}

export type Block = TitleBlock | TextBlock | EffectBlock | InterestsBlock | LearningBlock | StackBlock | WorkingStyleBlock | ContactsBlock;

export interface BlockFieldDef {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'json-array' | 'json-object' | 'select';
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

export interface BlockTypeDefinition {
  type: BlockType;
  label: string;
  fields: BlockFieldDef[];
  render: (block: Block) => React.ReactNode;
  editableRender: (block: Block, onSave: (block: Block) => void, saving: boolean) => React.ReactNode;
  defaultBlock: (order: number) => Block;
}

const EFFECT_COMPONENTS: Record<string, { className: string; description: string; component: React.ComponentType<any> }> = {
  'nerv-grid': {
    className: 'nerv-grid',
    description: 'Background grid',
    component: () => <div className="nerv-grid" aria-hidden="true" />,
  },
  'nerv-scanline': {
    className: 'nerv-scanline',
    description: 'Scanline overlay',
    component: () => <div className="nerv-scanline" aria-hidden="true" />,
  },
  'nerv-light-beam': {
    className: 'nerv-light-beam',
    description: 'Light beam',
    component: () => <div className="nerv-light-beam" aria-hidden="true" />,
  },
  'nerv-particles': {
    className: 'nerv-particles',
    description: 'Floating particles',
    component: () => (
      <div className="nerv-particles" aria-hidden="true">
        <span className="nerv-particle" style={{ top: '60%', left: '20%', animationDelay: '0s', animationDuration: '22s' }} />
        <span className="nerv-particle" style={{ top: '80%', left: '70%', animationDelay: '-8s', animationDuration: '26s' }} />
        <span className="nerv-particle" style={{ top: '50%', left: '45%', animationDelay: '-15s', animationDuration: '30s' }} />
        <span className="nerv-particle" style={{ top: '70%', left: '85%', animationDelay: '-4s', animationDuration: '24s' }} />
      </div>
    ),
  },
  'nerv-corner': {
    className: 'nerv-corner',
    description: 'Corner brackets',
    component: () => (
      <>
        <div className="nerv-corner nerv-corner--tl" aria-hidden="true" />
        <div className="nerv-corner nerv-corner--tr" aria-hidden="true" />
        <div className="nerv-corner nerv-corner--bl" aria-hidden="true" />
        <div className="nerv-corner nerv-corner--br" aria-hidden="true" />
      </>
    ),
  },
  'grain-overlay': {
    className: 'grain-overlay',
    description: 'Grain/noise overlay',
    component: () => <div className="grain-overlay" aria-hidden="true" />,
  },
  'angel-wings': {
    className: 'angel-wings',
    description: 'Angel wings SVG',
    component: () => (
      <div className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 h-[520px] w-[320px] opacity-[0.08] dark:opacity-[0.14]" aria-hidden="true">
        <svg viewBox="0 0 320 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-[hsl(var(--nerv-cyan))]">
          <path d="M160 500 L100 420 L40 340 L20 280 L50 240 L90 280 L130 320 L160 360" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M160 500 L120 440 L80 360 L50 280 L70 240 L100 280 L140 340 L160 380" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M160 500 L200 440 L240 360 L270 280 L250 240 L220 280 L180 340 L160 380" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M160 500 L220 420 L280 340 L300 280 L270 240 L230 280 L190 320 L160 360" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="160" y1="500" x2="160" y2="60" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        </svg>
      </div>
    ),
  },
  'starfield': {
    className: 'starfield-bg',
    description: 'Starfield background',
    component: () => (
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/starfield-bg.jpg)' }} aria-hidden="true" />
    ),
  },
};

export const EFFECT_OPTIONS = Object.entries(EFFECT_COMPONENTS).map(([key, value]) => ({
  value: key,
  label: value.description,
}));

function parseJson<T>(input: string): T | undefined {
  try {
    return JSON.parse(input) as T;
  } catch {
    return undefined;
  }
}

function renderInterests(block: Block): React.ReactNode {
  const b = block as InterestsBlock;
  const items = parseJson<Array<Record<string, string>>>(b.content) || [];
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <Card key={item.title} className="card-hover-lift border-border/60 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-base font-medium text-foreground/80">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-6">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function renderLearning(block: Block): React.ReactNode {
  const b = block as LearningBlock;
  const items = parseJson<Array<Record<string, string>>>(b.content) || [];
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <Card key={item.title} className="card-hover-lift border-border/60 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-medium text-foreground/80">{item.title}</h3>
              <Tag>learning</Tag>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-6">{item.context}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function renderStack(block: Block): React.ReactNode {
  const b = block as StackBlock;
  const stack = parseJson<Record<string, string[]>>(b.content);
  return (
    <div className="space-y-6">
      {Object.entries(stack || {}).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-xs font-medium text-muted-foreground/50 uppercase tracking-wider mb-3">{category}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function renderWorkingStyle(block: Block): React.ReactNode {
  const b = block as WorkingStyleBlock;
  const items = parseJson<string[]>(b.content) || [];
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" aria-hidden="true" />
          <span className="text-sm text-muted-foreground">{item}</span>
        </div>
      ))}
    </div>
  );
}

function renderContacts(block: Block): React.ReactNode {
  const b = block as ContactsBlock;
  const contacts = parseJson<Array<{ label: string; href: string; external: boolean }>>(b.content) || [];
  return (
    <div className="grid gap-3">
      {contacts.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined}
          className="group block"
        >
          <Card className="card-hover-lift border-border/60 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                <span className="text-sm font-medium text-foreground/80">{item.label}</span>
                <span className="text-xs text-muted-foreground/70 break-all sm:break-normal">{item.href}</span>
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}

function editableRenderInterests(block: Block, onSave: (block: Block) => void, saving: boolean): React.ReactNode {
  const b = block as InterestsBlock;
  return (
    <div className="space-y-2">
      <Editable
        value={b.content}
        onSave={(val) => onSave({ ...b, content: val })}
        className="text-base leading-7 text-muted-foreground"
        type="textarea"
        as="div"
        saving={saving}
        placeholder="JSON array of interests..."
      />
      <p className="text-xs text-muted-foreground/60">Format: array of {"{ title, description }"} objects</p>
    </div>
  );
}

function editableRenderLearning(block: Block, onSave: (block: Block) => void, saving: boolean): React.ReactNode {
  const b = block as LearningBlock;
  return (
    <div className="space-y-2">
      <Editable
        value={b.content}
        onSave={(val) => onSave({ ...b, content: val })}
        className="text-base leading-7 text-muted-foreground"
        type="textarea"
        as="div"
        saving={saving}
        placeholder="JSON array of learning items..."
      />
      <p className="text-xs text-muted-foreground/60">Format: array of {"{ title, context }"} objects</p>
    </div>
  );
}

function editableRenderStack(block: Block, onSave: (block: Block) => void, saving: boolean): React.ReactNode {
  const b = block as StackBlock;
  return (
    <div className="space-y-2">
      <Editable
        value={b.content}
        onSave={(val) => onSave({ ...b, content: val })}
        className="text-base leading-7 text-muted-foreground"
        type="textarea"
        as="div"
        saving={saving}
        placeholder="JSON object of stack categories..."
      />
      <p className="text-xs text-muted-foreground/60">Format: object with category keys and string arrays</p>
    </div>
  );
}

function editableRenderWorkingStyle(block: Block, onSave: (block: Block) => void, saving: boolean): React.ReactNode {
  const b = block as WorkingStyleBlock;
  return (
    <div className="space-y-2">
      <Editable
        value={b.content}
        onSave={(val) => onSave({ ...b, content: val })}
        className="text-base leading-7 text-muted-foreground"
        type="textarea"
        as="div"
        saving={saving}
        placeholder="JSON array of principles..."
      />
      <p className="text-xs text-muted-foreground/60">Format: array of strings</p>
    </div>
  );
}

function editableRenderContacts(block: Block, onSave: (block: Block) => void, saving: boolean): React.ReactNode {
  const b = block as ContactsBlock;
  return (
    <div className="space-y-2">
      <Editable
        value={b.content}
        onSave={(val) => onSave({ ...b, content: val })}
        className="text-base leading-7 text-muted-foreground"
        type="textarea"
        as="div"
        saving={saving}
        placeholder="JSON array of contacts..."
      />
      <p className="text-xs text-muted-foreground/60">Format: array of {"{ label, href, external }"} objects</p>
    </div>
  );
}

const BLOCK_REGISTRY: Record<BlockType, BlockTypeDefinition> = {
  title: {
    type: 'title',
    label: 'Title',
    fields: [
      { name: 'text', label: 'Text', type: 'text' },
    ],
    render: (block) => {
      const b = block as TitleBlock;
      return <h2 className="text-xl font-medium tracking-tight text-foreground/90">{b.text}</h2>;
    },
    editableRender: (block, onSave, saving) => {
      const b = block as TitleBlock;
      return <Editable value={b.text} onSave={(val) => onSave({ ...b, text: val })} className="text-xl font-medium tracking-tight text-foreground/90" as="h2" saving={saving} />;
    },
    defaultBlock: (order) => ({ id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, type: 'title' as const, text: '', order }),
  },
  text: {
    type: 'text',
    label: 'Text',
    fields: [
      { name: 'content', label: 'Content', type: 'textarea' },
    ],
    render: (block) => {
      const b = block as TextBlock;
      return <p className="text-base leading-7 text-muted-foreground">{b.content}</p>;
    },
    editableRender: (block, onSave, saving) => {
      const b = block as TextBlock;
      return <Editable value={b.content} onSave={(val) => onSave({ ...b, content: val })} className="text-base leading-7 text-muted-foreground" as="p" saving={saving} />;
    },
    defaultBlock: (order) => ({ id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, type: 'text' as const, content: '', order }),
  },
  effect: {
    type: 'effect',
    label: 'Effect',
    fields: [
      { name: 'effect', label: 'Effect', type: 'select', options: EFFECT_OPTIONS },
    ],
    render: (block) => {
      const b = block as EffectBlock;
      const effect = EFFECT_COMPONENTS[b.effect];
      if (!effect) return null;
      return <div className={effect.className} aria-hidden="true"><effect.component /></div>;
    },
    editableRender: (block, onSave, saving) => {
      const b = block as EffectBlock;
      return (
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Effect:</label>
          <select
            value={b.effect}
            onChange={(e) => onSave({ ...b, effect: e.target.value as EffectBlock['effect'] })}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            disabled={saving}
          >
            {EFFECT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );
    },
    defaultBlock: (order) => ({ id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, type: 'effect' as const, effect: 'nerv-grid', order }),
  },
  interests: {
    type: 'interests',
    label: 'Interests',
    fields: [
      { name: 'content', label: 'Content', type: 'textarea', placeholder: 'JSON array of interests' },
    ],
    render: renderInterests,
    editableRender: editableRenderInterests,
    defaultBlock: (order) => ({ id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, type: 'interests' as const, content: '[]', order }),
  },
  learning: {
    type: 'learning',
    label: 'Learning',
    fields: [
      { name: 'content', label: 'Content', type: 'textarea', placeholder: 'JSON array of learning items' },
    ],
    render: renderLearning,
    editableRender: editableRenderLearning,
    defaultBlock: (order) => ({ id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, type: 'learning' as const, content: '[]', order }),
  },
  stack: {
    type: 'stack',
    label: 'Stack',
    fields: [
      { name: 'content', label: 'Content', type: 'textarea', placeholder: 'JSON object of stack categories' },
    ],
    render: renderStack,
    editableRender: editableRenderStack,
    defaultBlock: (order) => ({ id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, type: 'stack' as const, content: '{}', order }),
  },
  'working-style': {
    type: 'working-style',
    label: 'Working Style',
    fields: [
      { name: 'content', label: 'Content', type: 'textarea', placeholder: 'JSON array of principles' },
    ],
    render: renderWorkingStyle,
    editableRender: editableRenderWorkingStyle,
    defaultBlock: (order) => ({ id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, type: 'working-style' as const, content: '[]', order }),
  },
  contacts: {
    type: 'contacts',
    label: 'Contacts',
    fields: [
      { name: 'content', label: 'Content', type: 'textarea', placeholder: 'JSON array of contacts' },
    ],
    render: renderContacts,
    editableRender: editableRenderContacts,
    defaultBlock: (order) => ({ id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, type: 'contacts' as const, content: '[]', order }),
  },
};

export const BLOCK_TYPES = Object.values(BLOCK_REGISTRY);

export function getBlockRegistry(type: BlockType): BlockTypeDefinition | undefined {
  return BLOCK_REGISTRY[type];
}

export function renderBlock(block: Block): React.ReactNode {
  const def = BLOCK_REGISTRY[block.type];
  if (!def) return null;
  return def.render(block);
}

export function renderEditableBlock(block: Block, onSave: (block: Block) => void, saving: boolean): React.ReactNode {
  const def = BLOCK_REGISTRY[block.type];
  if (!def) return null;
  return def.editableRender(block, onSave, saving);
}

export function createDefaultBlock(type: BlockType, order: number): Block {
  const def = BLOCK_REGISTRY[type];
  if (!def) {
    return { id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, type, order } as Block;
  }
  return def.defaultBlock(order);
}
