"use strict";

/* Small shared helper functions. */

/* ==========================================================
   HELPERS
========================================================== */

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function send(object) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(object));
  }
}

function levelNumber(value) {
  if (typeof value === "number") return value;

  if (value && value.length !== undefined) {
    return Number(value[0] || 0);
  }

  return Number(value) || 0;
}

function formatTime(date = new Date()) {
  return date.toLocaleTimeString();
}

function formatUptime(seconds) {
  if (!Number.isFinite(seconds)) return "--:--:--";

  const total = Math.floor(seconds);

  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(secs).padStart(2, "0")
  ].join(":");
}

function diagnosticLabel(level) {
  if (level === 0) return "OK";
  if (level === 1) return "WARN";
  if (level === 2) return "ERROR";
  if (level === 3) return "STALE";

  return "UNKNOWN";
}

function healthFromDiagnostic(level) {
  if (level === 0) return "healthy";
  if (level === 1) return "degraded";
  if (level === 2) return "failed";

  return "unknown";
}

function healthLabel(health) {
  if (health === "healthy") return "HEALTHY";
  if (health === "degraded") return "DEGRADED";
  if (health === "failed") return "FAILED";

  return "UNKNOWN";
}

function healthRank(health) {
  if (health === "failed") return 3;
  if (health === "degraded") return 2;
  if (health === "unknown") return 1;

  return 0;
}

function batteryEstimate(voltage) {
  if (!Number.isFinite(voltage)) return null;

  const pct =
    ((voltage - BATT_ERR) / (BATT_FULL - BATT_ERR)) * 100;

  return Math.max(0, Math.min(100, pct));
}

