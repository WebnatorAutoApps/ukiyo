"use client";

import { useState } from "react";
import { translateToJapanese } from "@/lib/translate";
import type { FaqRow } from "@/lib/database.types";

interface AdminFaqFormProps {
  faq?: FaqRow | null;
  onSave: (data: {
    question_es: string;
    question_ja: string;
    answer_es: string;
    answer_ja: string;
    display_order: number;
  }) => Promise<void>;
  onCancel: () => void;
}

export default function AdminFaqForm({ faq, onSave, onCancel }: AdminFaqFormProps) {
  const [questionEs, setQuestionEs] = useState(faq?.question_es ?? "");
  const [questionJa, setQuestionJa] = useState(faq?.question_ja ?? "");
  const [answerEs, setAnswerEs] = useState(faq?.answer_es ?? "");
  const [answerJa, setAnswerJa] = useState(faq?.answer_ja ?? "");
  const [displayOrder, setDisplayOrder] = useState(faq?.display_order ?? 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [translatingQ, setTranslatingQ] = useState(false);
  const [translatingA, setTranslatingA] = useState(false);

  const handleTranslateQuestion = async () => {
    if (!questionEs.trim()) return;
    setTranslatingQ(true);
    const result = await translateToJapanese(questionEs);
    setTranslatingQ(false);
    if (result) {
      setQuestionJa(result);
    } else {
      setError("No se pudo traducir la pregunta. Inténtalo de nuevo o traduce manualmente.");
    }
  };

  const handleTranslateAnswer = async () => {
    if (!answerEs.trim()) return;
    setTranslatingA(true);
    const result = await translateToJapanese(answerEs);
    setTranslatingA(false);
    if (result) {
      setAnswerJa(result);
    } else {
      setError("No se pudo traducir la respuesta. Inténtalo de nuevo o traduce manualmente.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!questionEs.trim()) {
      setError("La pregunta (ES) es obligatoria");
      return;
    }
    if (!answerEs.trim()) {
      setError("La respuesta (ES) es obligatoria");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        question_es: questionEs.trim(),
        question_ja: questionJa.trim(),
        answer_es: answerEs.trim(),
        answer_ja: answerJa.trim(),
        display_order: displayOrder,
      });
    } catch {
      setError("Error al guardar la pregunta");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-foreground font-heading">
        {faq ? "Editar Pregunta" : "Añadir Pregunta"}
      </h2>

      {/* Question fields */}
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="questionEs" className="text-sm font-semibold text-foreground font-heading">
            Pregunta (Español)
          </label>
          <input
            id="questionEs"
            type="text"
            value={questionEs}
            onChange={(e) => setQuestionEs(e.target.value)}
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="questionJa" className="text-sm font-semibold text-foreground font-heading">
              Pregunta (Japonés)
            </label>
            <button
              type="button"
              onClick={handleTranslateQuestion}
              disabled={translatingQ || !questionEs.trim()}
              className="text-xs font-semibold text-ukiyo-navy hover:text-primary-hover disabled:opacity-40 disabled:cursor-not-allowed font-heading transition-colors"
            >
              {translatingQ ? "Traduciendo..." : "Auto-traducir"}
            </button>
          </div>
          <input
            id="questionJa"
            type="text"
            value={questionJa}
            onChange={(e) => setQuestionJa(e.target.value)}
            placeholder={questionEs || undefined}
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
          />
        </div>
      </div>

      {/* Answer fields */}
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="answerEs" className="text-sm font-semibold text-foreground font-heading">
            Respuesta (Español)
          </label>
          <textarea
            id="answerEs"
            value={answerEs}
            onChange={(e) => setAnswerEs(e.target.value)}
            rows={4}
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow resize-y"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="answerJa" className="text-sm font-semibold text-foreground font-heading">
              Respuesta (Japonés)
            </label>
            <button
              type="button"
              onClick={handleTranslateAnswer}
              disabled={translatingA || !answerEs.trim()}
              className="text-xs font-semibold text-ukiyo-navy hover:text-primary-hover disabled:opacity-40 disabled:cursor-not-allowed font-heading transition-colors"
            >
              {translatingA ? "Traduciendo..." : "Auto-traducir"}
            </button>
          </div>
          <textarea
            id="answerJa"
            value={answerJa}
            onChange={(e) => setAnswerJa(e.target.value)}
            rows={4}
            placeholder={answerEs || undefined}
            className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow resize-y"
          />
        </div>
      </div>

      {/* Display Order */}
      <div className="flex flex-col gap-1.5 max-w-[200px]">
        <label htmlFor="displayOrder" className="text-sm font-semibold text-foreground font-heading">
          Orden
        </label>
        <input
          id="displayOrder"
          type="number"
          value={displayOrder}
          onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
          className="rounded-xl border border-border-color bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-sakura-pink transition-shadow"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500" role="alert">{error}</p>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-ukiyo-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-xl border border-border-color bg-background px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-wood-light transition-colors font-heading"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
