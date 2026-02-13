"use client";

import { useState, useRef } from "react";
import type { FaqRow } from "@/lib/database.types";

interface AdminFaqListProps {
  faqs: FaqRow[];
  onEdit: (faq: FaqRow) => void;
  onDelete: (id: string) => Promise<void>;
  onAdd: () => void;
  onReorder: (orderedIds: { id: string; display_order: number }[]) => Promise<void>;
}

export default function AdminFaqList({ faqs, onEdit, onDelete, onAdd, onReorder }: AdminFaqListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [reordering, setReordering] = useState(false);
  const dragCounter = useRef<Map<number, number>>(new Map());

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
    setConfirmId(null);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const count = (dragCounter.current.get(index) || 0) + 1;
    dragCounter.current.set(index, count);
    if (dragIndex !== null && index !== dragIndex) {
      setOverIndex(index);
    }
  };

  const handleDragLeave = (_e: React.DragEvent, index: number) => {
    const count = (dragCounter.current.get(index) || 0) - 1;
    dragCounter.current.set(index, count);
    if (count <= 0) {
      dragCounter.current.delete(index);
      if (overIndex === index) {
        setOverIndex(null);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    dragCounter.current.clear();
    setOverIndex(null);

    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      return;
    }

    setReordering(true);
    const reordered = [...faqs];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, moved);

    const orderedIds = reordered.map((faq, i) => ({
      id: faq.id,
      display_order: i,
    }));

    await onReorder(orderedIds);
    setDragIndex(null);
    setReordering(false);
  };

  const handleDragEnd = () => {
    dragCounter.current.clear();
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground font-heading">
          Gestionar Preguntas Frecuentes
        </h2>
        <button
          onClick={onAdd}
          className="rounded-xl bg-ukiyo-navy px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading"
        >
          + Añadir Pregunta
        </button>
      </div>

      {faqs.length === 0 ? (
        <div className="text-center py-12 text-text-secondary">
          <p className="text-4xl mb-3">❓</p>
          <p>No hay preguntas frecuentes. Añade la primera.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reordering && (
            <p className="text-xs text-text-secondary animate-pulse">Guardando orden...</p>
          )}
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragLeave={(e) => handleDragLeave(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`rounded-xl border p-4 shadow-cozy bg-wood-light/60 border-soft-wood/30 transition-all duration-200 ${
                dragIndex === index
                  ? "opacity-40 scale-[0.98]"
                  : overIndex === index
                  ? "border-ukiyo-navy shadow-lg ring-2 ring-ukiyo-navy/20"
                  : ""
              } ${dragIndex !== null ? "cursor-grabbing" : "cursor-grab"}`}
            >
              <div className="flex items-start gap-4">
                {/* Drag handle */}
                <span
                  className="flex-shrink-0 mt-1 text-text-secondary/50 hover:text-text-secondary select-none"
                  aria-label="Arrastrar para reordenar"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="5" cy="3" r="1.5" />
                    <circle cx="11" cy="3" r="1.5" />
                    <circle cx="5" cy="8" r="1.5" />
                    <circle cx="11" cy="8" r="1.5" />
                    <circle cx="5" cy="13" r="1.5" />
                    <circle cx="11" cy="13" r="1.5" />
                  </svg>
                </span>

                {/* Order badge */}
                <span className="text-xs text-text-secondary flex-shrink-0 w-8 text-center mt-1">
                  #{faq.display_order}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-foreground font-heading">
                    {faq.question_es}
                  </h3>
                  {faq.question_ja && (
                    <p className="text-xs text-text-secondary mt-0.5">{faq.question_ja}</p>
                  )}
                  <p className="text-xs text-text-body mt-2 line-clamp-2">
                    {faq.answer_es}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => onEdit(faq)}
                    className="rounded-lg bg-ukiyo-navy/10 px-3 py-1.5 text-xs font-semibold text-ukiyo-navy hover:bg-ukiyo-navy/20 transition-colors font-heading"
                  >
                    Editar
                  </button>
                  {confirmId === faq.id ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDelete(faq.id)}
                        disabled={deletingId === faq.id}
                        className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition-colors font-heading disabled:opacity-50"
                      >
                        {deletingId === faq.id ? "..." : "Eliminar"}
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="rounded-lg bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-wood-light transition-colors font-heading border border-border-color"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmId(faq.id)}
                      className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-500/20 transition-colors font-heading"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
