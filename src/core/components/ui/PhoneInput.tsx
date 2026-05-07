"use client";

import { Input, Label, TextField } from "@heroui/react";
import { parsePhoneNumber } from "libphonenumber-js/max";
import { ChevronDown, Search } from "lucide-react";
import { useLocale } from "next-intl";
import { useRef, useState } from "react";
import { defaultCountries, FlagImage, parseCountry } from "react-international-phone";

interface PhoneInputProps {
  label: string;
  value: string;           // E.164 e.g. "+201098021259"
  onChange: (value: string) => void;
  required?: boolean;
  searchPlaceholder?: string;
}

function parseE164(e164: string) {
  if (e164) {
    try {
      const parsed = parsePhoneNumber(e164);
      return {
        iso2:     parsed.country?.toLowerCase() ?? "eg",
        dialCode: String(parsed.countryCallingCode),
        local:    parsed.formatNational().replace(/[\s\-().]/g, ""),
      };
    } catch {}
  }
  return { iso2: "eg", dialCode: "20", local: "" };
}

export function PhoneInput({ label, value, onChange, required, searchPlaceholder = "Search..." }: PhoneInputProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  const lastEmitted = useRef<string>("");
  const initial = parseE164(value || "");
  const [iso2, setIso2]           = useState(initial.iso2);
  const [dialCode, setDialCode]   = useState(initial.dialCode);
  const [localNumber, setLocal]   = useState(initial.local);
  const [open, setOpen]           = useState(false);
  const [search, setSearch]       = useState("");

  // Sync inward when value changes externally (form reset)
  if (value !== undefined && value !== lastEmitted.current) {
    const s = parseE164(value);
    if (s.iso2 !== iso2 || s.local !== localNumber) {
      setIso2(s.iso2);
      setDialCode(s.dialCode);
      setLocal(s.local);
    }
    lastEmitted.current = value;
  }

  const emit = (dc: string, local: string) => {
    const digits = local.replace(/\D/g, "");
    const e164 = `+${dc}${digits}`;
    lastEmitted.current = e164;
    onChange(e164);
  };

  const countryNames = new Intl.DisplayNames([isAr ? "ar" : "en"], { type: "region" });
  const getName = (iso: string, fallback: string) => {
    try { return countryNames.of(iso.toUpperCase()) ?? fallback; } catch { return fallback; }
  };

  const filtered = defaultCountries
    .map(parseCountry)
    .filter((c) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return getName(c.iso2, c.name).toLowerCase().includes(q) || c.dialCode.includes(q);
    });

  const selectCountry = (c: ReturnType<typeof parseCountry>) => {
    setIso2(c.iso2);
    setDialCode(c.dialCode);
    setOpen(false);
    setSearch("");
    emit(c.dialCode, localNumber);
  };

  return (
    <TextField isRequired={required} className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <div className="flex gap-2">
        {/* Country selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex h-full items-center gap-1.5 rounded-lg border border-border bg-surface-secondary px-2.5 py-2 text-sm transition hover:bg-surface-tertiary"
            dir="ltr"
          >
            <FlagImage iso2={iso2} style={{ width: 20, height: 15, display: "block" }} />
            <span className="font-medium">+{dialCode}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted" />
          </button>

          {open && (
            <div className="absolute start-0 top-full z-50 mt-1 w-64 rounded-xl border border-border bg-overlay shadow-overlay">
              {/* Search */}
              <div className="border-b border-border p-2">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5">
                  <Search className="h-3.5 w-3.5 shrink-0 text-muted" />
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
                  />
                </div>
              </div>
              {/* List */}
              <ul className="max-h-52 overflow-y-auto py-1">
                {filtered.map((c) => (
                  <li key={c.iso2}>
                    <button
                      type="button"
                      onClick={() => selectCountry(c)}
                      className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition hover:bg-surface-secondary ${c.iso2 === iso2 ? "bg-accent/10 text-accent" : ""}`}
                    >
                      <FlagImage iso2={c.iso2} style={{ width: 20, height: 15, display: "block" }} />
                      <span className="flex-1 text-start">{getName(c.iso2, c.name)}</span>
                      <span className="text-xs text-muted">+{c.dialCode}</span>
                    </button>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="px-3 py-4 text-center text-sm text-muted">No results</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Local number */}
        <Input
          type="tel"
          inputMode="numeric"
          value={localNumber}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "");
            setLocal(digits);
            emit(dialCode, digits);
          }}
          variant="secondary"
          className="flex-1"
          dir="ltr"
        />
      </div>
    </TextField>
  );
}
