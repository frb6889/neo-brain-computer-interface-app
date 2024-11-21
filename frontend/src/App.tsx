import AppRoutes from "./routes";
import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";

import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import "./localization/i18n";
import { syncThemeWithLocal } from "./helpers/theme_helpers";
import { updateAppLanguage } from "./helpers/language_helpers";
import { Crosshair1Icon, GearIcon, TargetIcon, GlobeIcon, MinusIcon, Cross2Icon } from "@radix-ui/react-icons";


export default function App() {

const { i18n } = useTranslation();
  return (
    <div className="bg-transparent">
      <AppRoutes />
    </div>
  );
}
const root = createRoot(document.getElementById("app")!);
root.render(<App />);
