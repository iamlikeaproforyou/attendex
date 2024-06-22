import { ReactNode, createContext, useState } from "react";
import { Setting } from "../components/Layout/Layout";

interface SettingsContextType {
    settings: Setting[];
    setSettings: (value: Setting[]) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
    settings: [],
    setSettings: () => { }
})

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState<Setting[]>([])

    const value: SettingsContextType = {
        settings,
        setSettings: (value) => setSettings(value)
    }

    return (
        <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
    )
}

