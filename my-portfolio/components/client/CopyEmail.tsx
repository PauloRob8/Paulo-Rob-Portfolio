"use client";

import { useEffect, useRef, useState } from "react";
import s from "./CopyEmail.module.css";

/** "Copy email" button + toast. Clipboard API first, select-and-copy fallback. */
export function CopyEmail({ email, label, toast }: { email: string; label: string; toast: string }) {
  const [msg, setMsg] = useState("");
  const [on, setOn] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const done = () => {
    setMsg(toast);
    setOn(true);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOn(false), 1800);
  };

  const fallback = () => {
    const t = document.createElement("textarea");
    t.value = email;
    t.setAttribute("readonly", "");
    t.style.position = "fixed";
    t.style.opacity = "0";
    document.body.appendChild(t);
    t.select();
    try {
      document.execCommand("copy");
    } catch {}
    t.remove();
    done();
  };

  const copy = () => {
    try {
      navigator.clipboard.writeText(email).then(done, fallback);
    } catch {
      fallback();
    }
  };

  return (
    <>
      <button type="button" className="mag out" onClick={copy}>
        <span data-t="">{label}</span>
      </button>
      <div className={`${s.toast} ${on ? s.on : ""}`} role="status" aria-live="polite">
        {msg}
      </div>
    </>
  );
}
