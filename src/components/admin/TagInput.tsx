// src/components/admin/TagInput.tsx
"use client";

import { useState, KeyboardEvent } from "react";

interface TagInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  label: string;
  placeholder?: string;
}

export default function TagInput({
  values,
  onChange,
  label,
  placeholder = "Escribe y presiona Enter",
}: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const tag = input.trim();
    if (tag && !values.includes(tag)) {
      onChange([...values, tag]);
    }
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && !input && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-text-dim text-xs font-semibold uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-2 flex flex-wrap gap-2 focus-within:border-accent transition-colors">
        {values.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs font-medium px-3 py-1.5 rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="hover:text-white transition-colors ml-0.5"
            >
              ✕
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={values.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent text-text-main text-sm outline-none py-1 px-1"
        />
      </div>
      <p className="text-text-dim/50 text-xs mt-1">
        Presiona Enter o coma para agregar
      </p>
    </div>
  );
}
