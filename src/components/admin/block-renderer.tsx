'use client';

import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { PageTitle } from '@/components/site/page-title';
import { Tag } from '@/components/ui/tag';
import { TimelineItem } from '@/components/ui/timeline-item';
import { Editable } from '@/components/admin/editable';
import Link from 'next/link';

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

const EFFECT_COMPONENTS: Record<string, { className: string; description: string }> = {
  'nerv-grid': { className: 'nerv-grid', description: 'Background grid' },
  'nerv-scanline': { className: 'nerv-scanline', description: 'Scanline overlay' },
  'nerv-light-beam': { className: 'nerv-light-beam', description: 'Light beam' },
  'nerv-particles': { className: 'nerv-particles', description: 'Floating particles' },
  'nerv-corner': { className: 'nerv-corner', description: 'Corner brackets' },
  'grain-overlay': { className: 'grain-overlay', description: 'Grain/noise overlay' },
  'angel-wings': { className: 'angel-wings', description: 'Angel wings SVG' },
  'starfield': { className: 'starfield-bg', description: 'Starfield background' },
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
      return <div className={effect.className} aria-hidden="true" />;
    }
    case 'interests': {
      const items = parsePipeDelimited(block.content);
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
    case 'learning': {
      const items = parsePipeDelimited(block.content);
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
    case 'stack': {
      const stack = parseJson<Record<string, string[]>>(block.content);
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
    case 'working-style': {
      const items = parseJson<string[]>(block.content) || [];
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
    case 'contacts': {
      const contacts = parseJson<Array<{ label: string; href: string; external: boolean }>>(block.content) || [];
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

function parsePipeDelimited(input: string): Array<Record<string, string>> {
  try {
    return JSON.parse(input) as Array<Record<string, string>>;
  } catch {
    return [];
  }
}

function parseJson<T>(input: string): T | undefined {
  try {
    return JSON.parse(input) as T;
  } catch {
    return undefined;
  }
}
