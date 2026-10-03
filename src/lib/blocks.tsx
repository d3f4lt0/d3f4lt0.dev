'use client';

import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { PageTitle } from '@/components/site/page-title';
import { Tag } from '@/components/ui/tag';
import { TimelineItem } from '@/components/ui/timeline-item';
import { Editable } from '@/components/admin/editable';
import Link from 'next/link';

export type BlockType = 'title' | 'text' | 'effect';

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

export type Block = TitleBlock | TextBlock | EffectBlock;

const EFFECT_COMPONENTS: Record<string, { component: React.ComponentType<any>; className: string; description: string }> = {
  'nerv-grid': {
    component: () => <div className="nerv-grid" aria-hidden="true" />,
    className: 'nerv-grid',
    description: 'Background grid',
  },
  'nerv-scanline': {
    component: () => <div className="nerv-scanline" aria-hidden="true" />,
    className: 'nerv-scanline',
    description: 'Scanline overlay',
  },
  'nerv-light-beam': {
    component: () => <div className="nerv-light-beam" aria-hidden="true" />,
    className: 'nerv-light-beam',
    description: 'Light beam',
  },
  'nerv-particles': {
    component: () => (
      <div className="nerv-particles" aria-hidden="true">
        <span className="nerv-particle" style={{ top: '60%', left: '20%', animationDelay: '0s', animationDuration: '22s' }} />
        <span className="nerv-particle" style={{ top: '80%', left: '70%', animationDelay: '-8s', animationDuration: '26s' }} />
        <span className="nerv-particle" style={{ top: '50%', left: '45%', animationDelay: '-15s', animationDuration: '30s' }} />
        <span className="nerv-particle" style={{ top: '70%', left: '85%', animationDelay: '-4s', animationDuration: '24s' }} />
      </div>
    ),
    className: 'nerv-particles',
    description: 'Floating particles',
  },
  'nerv-corner': {
    component: () => (
      <>
        <div className="nerv-corner nerv-corner--tl" aria-hidden="true" />
        <div className="nerv-corner nerv-corner--tr" aria-hidden="true" />
        <div className="nerv-corner nerv-corner--bl" aria-hidden="true" />
        <div className="nerv-corner nerv-corner--br" aria-hidden="true" />
      </>
    ),
    className: 'nerv-corner',
    description: 'Corner brackets',
  },
  'grain-overlay': {
    component: () => <div className="grain-overlay" aria-hidden="true" />,
    className: 'grain-overlay',
    description: 'Grain/noise overlay',
  },
  'angel-wings': {
    component: () => <div className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 h-[520px] w-[320px] opacity-[0.08] dark:opacity-[0.14]" aria-hidden="true">
      <svg viewBox="0 0 320 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-[hsl(var(--nerv-cyan))]">
        <path d="M160 500 L100 420 L40 340 L20 280 L50 240 L90 280 L130 320 L160 360" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M160 500 L120 440 L80 360 L50 280 L70 240 L100 280 L140 340 L160 380" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M160 500 L200 440 L240 360 L270 280 L250 240 L220 280 L180 340 L160 380" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M160 500 L220 420 L280 340 L300 280 L270 240 L230 280 L190 320 L160 360" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="160" y1="500" x2="160" y2="60" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      </svg>
    </div>,
    className: 'angel-wings',
    description: 'Angel wings SVG',
  },
  'starfield': {
    component: () => (
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/starfield-bg.jpg)' }} aria-hidden="true" />
    ),
    className: 'starfield-bg',
    description: 'Starfield background',
  },
};

export const EFFECT_OPTIONS = Object.entries(EFFECT_COMPONENTS).map(([key, value]) => ({
  value: key,
  label: value.description,
}));

export function BlockRenderer({ block, editing = false, onSave, saving = false }: { block: Block; editing?: boolean; onSave?: (block: Block) => void; saving?: boolean }) {
  if (editing && onSave) {
    return <EditableBlockRenderer block={block} onSave={onSave} saving={saving} />;
  }

  switch (block.type) {
    case 'title':
      return <h2 className="text-xl font-medium tracking-tight text-foreground/90">{block.text}</h2>;
    case 'text':
      return <p className="text-base leading-7 text-muted-foreground">{block.content}</p>;
    case 'effect': {
      const effect = EFFECT_COMPONENTS[block.effect];
      if (!effect) return null;
      const EffectComponent = effect.component;
      return <div className={effect.className}><EffectComponent /></div>;
    }
    default:
      return null;
  }
}

function EditableBlockRenderer({ block, onSave, saving }: { block: Block; onSave: (block: Block) => void; saving: boolean }) {
  switch (block.type) {
    case 'title':
      return <Editable value={block.text} onSave={(val) => onSave({ ...block, text: val })} className="text-xl font-medium tracking-tight text-foreground/90" as="h2" saving={saving} />;
    case 'text':
      return <Editable value={block.content} onSave={(val) => onSave({ ...block, content: val })} className="text-base leading-7 text-muted-foreground" as="p" saving={saving} />;
    case 'effect':
      return <span className="text-sm text-muted-foreground/60">Effect: {block.effect}</span>;
    default:
      return null;
  }
}
