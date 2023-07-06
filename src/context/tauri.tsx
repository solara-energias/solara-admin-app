'use client';

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface TauriContextType {
  clipboard?: typeof import('@tauri-apps/api/clipboard');
  http?: typeof import('@tauri-apps/api/http');
}

const TauriContext = createContext<TauriContextType>({});

export function TauriProvider({ children }: PropsWithChildren) {
  const [clipboard, setClipboard] = useState<TauriContextType['clipboard']>();
  const [http, setHttp] = useState<TauriContextType['http']>();

  useEffect(() => {
    import('@tauri-apps/api/clipboard').then(setClipboard);
    import('@tauri-apps/api/http').then(setHttp);
  }, []);

  return (
    <TauriContext.Provider value={{ clipboard, http }}>
      {children}
    </TauriContext.Provider>
  );
}

export function useTauri() {
  return useContext(TauriContext);
}
