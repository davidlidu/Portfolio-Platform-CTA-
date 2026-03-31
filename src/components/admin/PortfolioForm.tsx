// src/components/admin/PortfolioForm.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Portfolio, Project } from "@prisma/client";
import type { Social, ServicePillar } from "@/types";
import ImageUploader from "./ImageUploader";
import TagInput from "./TagInput";

// Iconos de redes sociales disponibles
const SOCIAL_OPTIONS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter/X" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "github", label: "GitHub" },
  { value: "tiktok", label: "TikTok" },
  { value: "web", label: "Web" },
];

type Tab = "basic" | "whatsapp" | "socials" | "intro" | "services" | "approach" | "contact";

const TABS: { id: Tab; label: string }[] = [
  { id: "basic", label: "Básico" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "socials", label: "Redes" },
  { id: "intro", label: "Intro" },
  { id: "services", label: "Servicios" },
  { id: "approach", label: "Enfoque" },
  { id: "contact", label: "Contacto" },
];

interface PortfolioFormProps {
  portfolio?: Portfolio & { projects: Project[] };
  isNew?: boolean;
}

export default function PortfolioForm({ portfolio, isNew = false }: PortfolioFormProps) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("basic");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Estado del formulario
  const [form, setForm] = useState({
    slug: portfolio?.slug || "",
    isPublished: portfolio?.isPublished || false,
    heroName: portfolio?.heroName || "",
    heroBadge: portfolio?.heroBadge || "Disponible para proyectos",
    heroRole: portfolio?.heroRole || "",
    heroPhotoUrl: portfolio?.heroPhotoUrl || null as string | null,
    socials: (portfolio?.socials as Social[]) || [] as Social[],
    introQuote: portfolio?.introQuote || "",
    introTags: portfolio?.introTags || [] as string[],
    introCta1Label: portfolio?.introCta1Label || "Agendar conversación",
    introCta2Label: portfolio?.introCta2Label || "Explorar proyectos",
    servicesLabel: portfolio?.servicesLabel || "// Servicios",
    servicesTitle: portfolio?.servicesTitle || "Cómo genero valor",
    servicesDescription: portfolio?.servicesDescription || "",
    servicePillars: (portfolio?.servicePillars as ServicePillar[]) || [] as ServicePillar[],
    approachLabel: portfolio?.approachLabel || "// Mi enfoque",
    approachTitle: portfolio?.approachTitle || "",
    approachDescription: portfolio?.approachDescription || "",
    approachSteps: portfolio?.approachSteps || [] as string[],
    contactLabel: portfolio?.contactLabel || "// Conectemos",
    contactTitle: portfolio?.contactTitle || "¿Tienes un proyecto en mente?",
    contactDescription: portfolio?.contactDescription || "",
    contactCta1Label: portfolio?.contactCta1Label || "Agendar conversación",
    contactCta2Label: portfolio?.contactCta2Label || "Guardar contacto",
    whatsappNumber: portfolio?.whatsappNumber || "",
    whatsappMessage: portfolio?.whatsappMessage || "",
    footerInitials: portfolio?.footerInitials || "",
    footerName: portfolio?.footerName || "",
  });

  // Auto-generar slug desde el nombre
  const generateSlug = useCallback((name: string) => {
    return name
      .toLowerCase()
      .replace(/\n/g, " ")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }, []);

  // Auto-generar iniciales
  const generateInitials = useCallback((name: string) => {
    const parts = name.replace(/\n/g, " ").trim().split(/\s+/);
    return parts
      .filter((p) => p.length > 0)
      .map((p) => p[0].toUpperCase())
      .slice(0, 2)
      .join("");
  }, []);

  // Actualizar slug e iniciales cuando cambia el nombre (solo en creación)
  useEffect(() => {
    if (isNew && form.heroName) {
      setForm((prev) => ({
        ...prev,
        slug: prev.slug || generateSlug(prev.heroName),
        footerInitials: generateInitials(prev.heroName),
        footerName: prev.heroName.replace(/\n/g, " "),
      }));
    }
  }, [form.heroName, isNew, generateSlug, generateInitials]);

  const updateForm = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Socials helpers
  const addSocial = () => {
    if (form.socials.length >= 6) return;
    updateForm("socials", [
      ...form.socials,
      { icon: "linkedin", label: "LinkedIn", url: "" },
    ]);
  };
  const updateSocial = (index: number, field: string, value: string) => {
    const updated = [...form.socials];
    updated[index] = { ...updated[index], [field]: value };
    // Auto-set label from icon
    if (field === "icon") {
      const opt = SOCIAL_OPTIONS.find((o) => o.value === value);
      updated[index].label = opt?.label || value;
    }
    updateForm("socials", updated);
  };
  const removeSocial = (index: number) => {
    updateForm("socials", form.socials.filter((_, i) => i !== index));
  };

  // Pillars helpers
  const addPillar = () => {
    if (form.servicePillars.length >= 3) return;
    updateForm("servicePillars", [
      ...form.servicePillars,
      { icon: "⚡", title: "", description: "", items: [] },
    ]);
  };
  const updatePillar = (index: number, field: string, value: any) => {
    const updated = [...form.servicePillars];
    updated[index] = { ...updated[index], [field]: value };
    updateForm("servicePillars", updated);
  };
  const removePillar = (index: number) => {
    updateForm("servicePillars", form.servicePillars.filter((_, i) => i !== index));
  };

  // Steps helpers
  const addStep = () => {
    if (form.approachSteps.length >= 6) return;
    updateForm("approachSteps", [...form.approachSteps, ""]);
  };
  const updateStep = (index: number, value: string) => {
    const updated = [...form.approachSteps];
    updated[index] = value;
    updateForm("approachSteps", updated);
  };
  const removeStep = (index: number) => {
    updateForm("approachSteps", form.approachSteps.filter((_, i) => i !== index));
  };
  const moveStep = (from: number, to: number) => {
    if (to < 0 || to >= form.approachSteps.length) return;
    const updated = [...form.approachSteps];
    const [item] = updated.splice(from, 1);
    updated.splice(to, 0, item);
    updateForm("approachSteps", updated);
  };

  // Guardar
  const handleSave = async () => {
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const url = isNew ? "/api/portfolios" : `/api/portfolios/${portfolio?.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al guardar");
        setSaving(false);
        return;
      }

      setSuccess("¡Guardado correctamente!");
      setTimeout(() => setSuccess(""), 3000);

      if (isNew && data.data?.id) {
        router.push(`/admin/portfolios/${data.data.id}`);
      } else {
        router.refresh();
      }
    } catch {
      setError("Error de conexión");
    }

    setSaving(false);
  };

  // Eliminar
  const handleDelete = async () => {
    if (!portfolio?.id) return;
    if (!confirm(`¿Eliminar el portafolio "${form.heroName.replace(/\n/g, " ")}"? Esta acción no se puede deshacer.`)) return;

    try {
      const res = await fetch(`/api/portfolios/${portfolio.id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin");
      }
    } catch {
      setError("Error al eliminar");
    }
  };

  const inputClass =
    "w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-text-main text-sm outline-none focus:border-accent transition-colors";
  const labelClass =
    "block text-text-dim text-xs font-semibold uppercase tracking-wider mb-2";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-syne font-extrabold text-2xl text-white">
            {isNew ? "Crear portafolio" : "Editar portafolio"}
          </h1>
          {!isNew && form.slug && (
            <a
              href={`${baseUrl}/${form.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-sm hover:underline mt-1 inline-block"
            >
              {baseUrl}/{form.slug} ↗
            </a>
          )}
        </div>
        <div className="flex items-center gap-3">
          {!isNew && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            >
              Eliminar
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto border-b border-card-border">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              tab === t.id
                ? "text-accent border-accent"
                : "text-text-dim border-transparent hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Form content */}
      <div className="bg-card border border-card-border rounded-2xl p-8 mb-6">
        {/* TAB: BÁSICO */}
        {tab === "basic" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className={labelClass}>Nombre completo (usa Enter para saltos)</label>
              <textarea
                rows={2}
                value={form.heroName}
                onChange={(e) => updateForm("heroName", e.target.value)}
                className={inputClass}
                placeholder="Juan Pablo&#10;Rojas"
              />
            </div>
            <div>
              <label className={labelClass}>
                Slug / URL{" "}
                {form.slug && (
                  <span className="text-accent font-normal normal-case">
                    — {baseUrl}/{form.slug}
                  </span>
                )}
              </label>
              <input
                value={form.slug}
                onChange={(e) =>
                  updateForm("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                }
                className={inputClass}
                placeholder="juan-pablo-rojas"
              />
            </div>
            <div>
              <label className={labelClass}>Badge de disponibilidad</label>
              <input
                value={form.heroBadge}
                onChange={(e) => updateForm("heroBadge", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Rol / Título (usa Enter para saltos)</label>
              <textarea
                rows={2}
                value={form.heroRole}
                onChange={(e) => updateForm("heroRole", e.target.value)}
                className={inputClass}
                placeholder="AI & Business&#10;Development Partner"
              />
            </div>
            <ImageUploader
              value={form.heroPhotoUrl}
              onChange={(url) => updateForm("heroPhotoUrl", url)}
              folder={form.slug || "temp"}
              label="Foto de perfil"
            />
            <div>
              <label className={labelClass}>Iniciales (footer)</label>
              <input
                value={form.footerInitials}
                onChange={(e) => updateForm("footerInitials", e.target.value)}
                className={`${inputClass} max-w-[100px]`}
                maxLength={3}
              />
            </div>
            <div>
              <label className={labelClass}>Nombre footer</label>
              <input
                value={form.footerName}
                onChange={(e) => updateForm("footerName", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => updateForm("isPublished", !form.isPublished)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  form.isPublished ? "bg-accent" : "bg-[#2A2A2A]"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    form.isPublished ? "translate-x-6" : ""
                  }`}
                />
              </button>
              <span className="text-sm text-text-main">
                {form.isPublished ? "Publicado" : "Borrador"}
              </span>
            </div>
          </div>
        )}

        {/* TAB: WHATSAPP */}
        {tab === "whatsapp" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className={labelClass}>Número de WhatsApp (con código de país, solo dígitos)</label>
              <input
                value={form.whatsappNumber}
                onChange={(e) =>
                  updateForm("whatsappNumber", e.target.value.replace(/\D/g, ""))
                }
                className={inputClass}
                placeholder="573001234567"
              />
              <p className="text-text-dim/50 text-xs mt-1">
                Ejemplo: 573001234567 (57 = Colombia)
              </p>
            </div>
            <div>
              <label className={labelClass}>Mensaje predefinido del CTA</label>
              <textarea
                rows={3}
                value={form.whatsappMessage}
                onChange={(e) => updateForm("whatsappMessage", e.target.value)}
                className={inputClass}
                placeholder="Hola, me interesa conocer más sobre tus servicios."
              />
              <p className="text-text-dim/50 text-xs mt-1">
                {(form.whatsappMessage || "").length} caracteres
              </p>
            </div>
            {form.whatsappNumber && (
              <div className="bg-[#1A1A1A] rounded-lg p-4 border border-[#2A2A2A]">
                <p className={labelClass}>Preview del link</p>
                <a
                  href={`https://wa.me/${form.whatsappNumber}?text=${encodeURIComponent(form.whatsappMessage || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-sm break-all hover:underline"
                >
                  wa.me/{form.whatsappNumber}?text=...
                </a>
              </div>
            )}
            <div>
              <label className={labelClass}>Label botón CTA Intro</label>
              <input
                value={form.introCta1Label}
                onChange={(e) => updateForm("introCta1Label", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Label botón CTA Intro (secundario)</label>
              <input
                value={form.introCta2Label}
                onChange={(e) => updateForm("introCta2Label", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Label botón CTA Contacto</label>
              <input
                value={form.contactCta1Label}
                onChange={(e) => updateForm("contactCta1Label", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Label botón CTA Contacto (secundario)</label>
              <input
                value={form.contactCta2Label}
                onChange={(e) => updateForm("contactCta2Label", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        )}

        {/* TAB: REDES SOCIALES */}
        {tab === "socials" && (
          <div className="space-y-4 max-w-2xl">
            {form.socials.map((social, i) => (
              <div
                key={i}
                className="bg-[#1A1A1A] rounded-lg p-4 border border-[#2A2A2A] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-text-dim text-xs font-semibold">Red {i + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeSocial(i)}
                    className="text-red-400/60 hover:text-red-400 text-xs transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Plataforma</label>
                    <select
                      value={social.icon}
                      onChange={(e) => updateSocial(i, "icon", e.target.value)}
                      className={inputClass}
                    >
                      {SOCIAL_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Label visible</label>
                    <input
                      value={social.label}
                      onChange={(e) => updateSocial(i, "label", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>URL</label>
                  <input
                    value={social.url}
                    onChange={(e) => updateSocial(i, "url", e.target.value)}
                    className={inputClass}
                    placeholder="https://..."
                  />
                </div>
              </div>
            ))}
            {form.socials.length < 6 && (
              <button
                type="button"
                onClick={addSocial}
                className="w-full py-3 border-2 border-dashed border-card-border rounded-lg text-text-dim text-sm hover:border-accent/50 hover:text-accent transition-colors"
              >
                + Agregar red social
              </button>
            )}
          </div>
        )}

        {/* TAB: INTRO */}
        {tab === "intro" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className={labelClass}>Frase principal</label>
              <textarea
                rows={3}
                value={form.introQuote}
                onChange={(e) => updateForm("introQuote", e.target.value)}
                className={inputClass}
                placeholder="Conecto tecnología, capital y crecimiento..."
              />
            </div>
            <TagInput
              values={form.introTags}
              onChange={(tags) => updateForm("introTags", tags)}
              label="Tags"
              placeholder="AI, Growth, Automation..."
            />
          </div>
        )}

        {/* TAB: SERVICIOS */}
        {tab === "services" && (
          <div className="space-y-6">
            <div className="max-w-2xl space-y-4">
              <div>
                <label className={labelClass}>Etiqueta de sección</label>
                <input
                  value={form.servicesLabel}
                  onChange={(e) => updateForm("servicesLabel", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Título de sección</label>
                <input
                  value={form.servicesTitle}
                  onChange={(e) => updateForm("servicesTitle", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Descripción general</label>
                <textarea
                  rows={3}
                  value={form.servicesDescription}
                  onChange={(e) => updateForm("servicesDescription", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="border-t border-card-border pt-6">
              <h3 className="text-white font-semibold text-sm mb-4">
                Pilares ({form.servicePillars.length}/3)
              </h3>
              <div className="space-y-4">
                {form.servicePillars.map((pillar, i) => (
                  <div
                    key={i}
                    className="bg-[#1A1A1A] rounded-lg p-5 border border-[#2A2A2A] space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-accent text-xs font-bold">PILAR {i + 1}</span>
                      <button
                        type="button"
                        onClick={() => removePillar(i)}
                        className="text-red-400/60 hover:text-red-400 text-xs transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] gap-3">
                      <div>
                        <label className={labelClass}>Icono</label>
                        <input
                          value={pillar.icon}
                          onChange={(e) => updatePillar(i, "icon", e.target.value)}
                          className={`${inputClass} text-center text-xl`}
                          maxLength={4}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Título</label>
                        <input
                          value={pillar.title}
                          onChange={(e) => updatePillar(i, "title", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Descripción</label>
                      <textarea
                        rows={3}
                        value={pillar.description}
                        onChange={(e) => updatePillar(i, "description", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <TagInput
                      values={pillar.items}
                      onChange={(items) => updatePillar(i, "items", items)}
                      label="Tags del pilar"
                    />
                  </div>
                ))}
                {form.servicePillars.length < 3 && (
                  <button
                    type="button"
                    onClick={addPillar}
                    className="w-full py-3 border-2 border-dashed border-card-border rounded-lg text-text-dim text-sm hover:border-accent/50 hover:text-accent transition-colors"
                  >
                    + Agregar pilar
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB: ENFOQUE */}
        {tab === "approach" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className={labelClass}>Etiqueta</label>
              <input
                value={form.approachLabel}
                onChange={(e) => updateForm("approachLabel", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Título (usa Enter para saltos)</label>
              <textarea
                rows={2}
                value={form.approachTitle}
                onChange={(e) => updateForm("approachTitle", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Descripción</label>
              <textarea
                rows={3}
                value={form.approachDescription}
                onChange={(e) => updateForm("approachDescription", e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="border-t border-card-border pt-6">
              <h3 className="text-white font-semibold text-sm mb-4">
                Pasos ({form.approachSteps.length}/6)
              </h3>
              <div className="space-y-3">
                {form.approachSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-accent/60 font-syne font-bold text-sm mt-3 w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <input
                      value={step}
                      onChange={(e) => updateStep(i, e.target.value)}
                      className={`${inputClass} flex-1`}
                    />
                    <div className="flex flex-col gap-0.5 mt-1.5">
                      <button
                        type="button"
                        onClick={() => moveStep(i, i - 1)}
                        disabled={i === 0}
                        className="text-text-dim hover:text-white text-xs disabled:opacity-20 px-1"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveStep(i, i + 1)}
                        disabled={i === form.approachSteps.length - 1}
                        className="text-text-dim hover:text-white text-xs disabled:opacity-20 px-1"
                      >
                        ↓
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeStep(i)}
                      className="text-red-400/40 hover:text-red-400 text-xs mt-3"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {form.approachSteps.length < 6 && (
                  <button
                    type="button"
                    onClick={addStep}
                    className="w-full py-3 border-2 border-dashed border-card-border rounded-lg text-text-dim text-sm hover:border-accent/50 hover:text-accent transition-colors"
                  >
                    + Agregar paso
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB: CONTACTO */}
        {tab === "contact" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className={labelClass}>Etiqueta</label>
              <input
                value={form.contactLabel}
                onChange={(e) => updateForm("contactLabel", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Título</label>
              <input
                value={form.contactTitle}
                onChange={(e) => updateForm("contactTitle", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Descripción</label>
              <textarea
                rows={3}
                value={form.contactDescription}
                onChange={(e) => updateForm("contactDescription", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        )}
      </div>

      {/* Sticky footer con acciones */}
      <div className="sticky bottom-0 bg-bg border-t border-card-border -mx-8 px-8 py-4 flex items-center justify-between">
        <div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && <p className="text-accent text-sm">{success}</p>}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin")}
            className="px-6 py-2.5 text-sm text-text-dim hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-accent hover:bg-accent/90 text-black font-bold px-8 py-2.5 rounded-lg transition-all text-sm disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>

      {/* Sección de proyectos (solo en edición) */}
      {!isNew && portfolio && (
        <div className="mt-8 bg-card border border-card-border rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-semibold text-lg">
              Proyectos ({portfolio.projects.length})
            </h2>
            <a
              href={`/admin/portfolios/${portfolio.id}/projects/new`}
              className="bg-accent/10 text-accent hover:bg-accent/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              + Agregar proyecto
            </a>
          </div>

          {portfolio.projects.length === 0 ? (
            <p className="text-text-dim text-sm text-center py-8">
              No hay proyectos aún
            </p>
          ) : (
            <div className="space-y-3">
              {portfolio.projects
                .sort((a, b) => a.order - b.order)
                .map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-4 bg-[#1A1A1A] rounded-lg p-4 border border-[#2A2A2A]"
                  >
                    {project.thumbnailUrl ? (
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-[#222] rounded-lg flex items-center justify-center text-text-dim text-xs">
                        Sin img
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {project.title}
                      </p>
                      <p className="text-text-dim text-xs mt-0.5">
                        Orden: {project.order} • {project.tags.length} tags • {project.images.length} imágenes
                      </p>
                    </div>
                    <a
                      href={`/admin/portfolios/${portfolio.id}/projects/${project.id}`}
                      className="px-3 py-1.5 text-xs text-text-dim hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      Editar
                    </a>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
