"use client";

import type { ReactNode } from "react";

export type ViewName =
  | "Overview"
  | "Heat Explorer"
  | "Driver Analysis"
  | "Actionability Engine"
  | "Scenario Lab"
  | "Reports";

interface NavRailProps {
  currentView: ViewName;
  onSelectView: (view: ViewName) => void;
}

const navItems: { view: ViewName; icon: string; label: string; desc: string }[] = [
  {
    view: "Overview",
    icon: "overview",
    label: "Overview",
    desc: "National Observation Grid",
  },
  {
    view: "Heat Explorer",
    icon: "explorer",
    label: "Heat Explorer",
    desc: "High-Res Spatial Telemetry",
  },
  {
    view: "Driver Analysis",
    icon: "drivers",
    label: "Driver Analysis",
    desc: "Physical SHAP Attribution",
  },
  {
    view: "Actionability Engine",
    icon: "actionability",
    label: "Actionability Engine",
    desc: "Heat + Asset Fusion",
  },
  {
    view: "Scenario Lab",
    icon: "scenario",
    label: "Scenario Lab",
    desc: "Post-Intervention Simulator",
  },
  {
    view: "Reports",
    icon: "reports",
    label: "Reports",
    desc: "Municipal Action Brief",
  },
];

const NavIcon = ({ name }: { name: string }) => {
  const paths: Record<string, ReactNode> = {
    overview: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    explorer: (
      <>
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </>
    ),
    drivers: (
      <>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </>
    ),
    actionability: (
      <>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </>
    ),
    scenario: (
      <>
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </>
    ),
    reports: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="w-4 h-4 fill-none stroke-current stroke-[1.75]"
    >
      {paths[name] || paths.overview}
    </svg>
  );
};

export default function NavRail({ currentView, onSelectView }: NavRailProps) {
  return (
    <aside className="nav-rail" aria-label="Workstation Navigation">
      {/* Brand Header */}
      <div className="brand-section">
        <div className="brand-insignia-box bg-white/95 rounded-xs p-0.5 shadow-2xs border border-white/20">
          <img
            src="/isro.png"
            alt="ISRO Logo"
            className="brand-logo-img object-contain"
            width={34}
            height={34}
          />
        </div>
        <div className="brand-title-group">
          <h1>HeatWise AI</h1>
          <p>ISRO EO CLIMATE INTELLIGENCE</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links" aria-label="Main Workstation Views">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => onSelectView(item.view)}
              className={`nav-link ${isActive ? "active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <NavIcon name={item.icon} />
              <div className="flex flex-col text-left">
                <span className="nav-link-title">{item.label}</span>
                <span className="nav-link-desc hidden xl:inline text-[9.5px] opacity-70">
                  {item.desc}
                </span>
              </div>
              {isActive && <div className="nav-active-pill ml-auto" />}
            </button>
          );
        })}
      </nav>

      {/* Persistent Operational Footer */}
      <div className="rail-footer">
        <div className="rail-status-tag">
          <span className="status-dot-pulse" />
          <span>DATA ENGINE: ACTIVE</span>
        </div>
        <div className="rail-footer-meta">
          15 Stations · 500K Obs · 2026 Cohort
        </div>
      </div>
    </aside>
  );
}
