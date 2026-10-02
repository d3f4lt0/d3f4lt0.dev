'use client';

import { useState, useEffect } from 'react';

interface NowSection {
  title: string;
  content: string;
}

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [title, setTitle] = useState('Now');
  const [updated, setUpdated] = useState('');
  const [sections, setSections] = useState<NowSection[]>([]);

  useEffect(() => {
    const origin = window.location.origin.replace(/(https?:\/\/).+@/, '$1');
    fetch(`${origin}/api/admin/now`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then((data) => {
        setTitle(data.title || 'Now');
        setUpdated(data.updated || '');
        setSections(data.sections || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const updateSection = (index: number, field: 'title' | 'content', value: string) => {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const addSection = () => {
    setSections((prev) => [...prev, { title: '', content: '' }]);
  };

  const removeSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const origin = window.location.origin.replace(/(https?:\/\/).+@/, '$1');
      const res = await fetch(`${origin}/api/admin/now`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          updated,
          sections,
          message: `Update now page: ${new Date().toISOString().split('T')[0]}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Save failed');
      }

      setSuccess('Saved. Vercel will auto-deploy shortly.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="nerv-readout">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">Admin</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Edit the /now page. Changes commit automatically.
            </p>
          </div>
          <a
            href="/admin/cms"
            className="link-underline text-sm font-medium text-primary"
          >
            Decap CMS
          </a>
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-4 text-sm text-primary">
            {success}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Page Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Last Updated</label>
            <input
              type="date"
              value={updated}
              onChange={(e) => setUpdated(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Sections</label>
              <button
                type="button"
                onClick={addSection}
                className="text-sm font-medium text-primary hover:underline"
              >
                + Add section
              </button>
            </div>

            <div className="mt-4 space-y-6">
              {sections.map((section, index) => (
                <div key={index} className="rounded-md border border-border p-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Section {index + 1}</label>
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                    placeholder="Section title"
                    className="mt-2 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  />
                  <textarea
                    value={section.content}
                    onChange={(e) => updateSection(index, 'content', e.target.value)}
                    placeholder="Section content"
                    rows={4}
                    className="mt-2 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
            <a
              href="/now"
              target="_blank"
              className="link-underline text-sm font-medium text-primary"
            >
              View /now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
