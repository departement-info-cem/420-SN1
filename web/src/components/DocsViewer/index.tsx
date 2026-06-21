import React, { useState } from "react";
import styles from "./DocsViewer.module.css";

interface TabConfig {
  id: string;
  label: string;
  icon?: string;
  component: React.ReactNode;
}

interface DocsViewerProps {
  tabs: TabConfig[];
  defaultTabId?: string;
  // Contenu additionnel affiché à droite des onglets (ex: menu Plan de cours)
  extra?: React.ReactNode;
}

export default function DocsViewer({ tabs, defaultTabId, extra }: DocsViewerProps) {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultTabId || tabs[0]?.id || ""
  );

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className={styles.container}>
      <div className={styles.toggleContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.toggleButton} ${
              activeTabId === tab.id ? styles.active : ""
            }`}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>}
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
        {extra}
      </div>

      <div className={styles.viewContainer}>
        {activeTab && activeTab.component}
      </div>
    </div>
  );
}
