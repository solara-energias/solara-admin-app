'use client';

import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

function Updater() {
  const [hasUpdate, setHasUpdate] = useState<boolean>(true);

  useEffect(() => {
    import('@tauri-apps/api/updater').then((updater) => {
      updater.checkUpdate().then((update) => setHasUpdate(update.shouldUpdate));
    });
  }, []);

  const installUpdate = () => {
    import('@tauri-apps/api/updater').then((updater) => {
      updater.installUpdate().then(() => setHasUpdate(false));
    });
  };

  return (
    <AlertDialog open={hasUpdate}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Nova atualização!</AlertDialogTitle>
          <AlertDialogDescription>
            Uma atualização obrigatória foi encontrada.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={installUpdate}>
            Atualizar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Updater;
