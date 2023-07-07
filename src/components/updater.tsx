'use client';

import { useInterval } from '@mantine/hooks';
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
  const [hasUpdate, setHasUpdate] = useState<boolean>(false);
  const updaterInterval = useInterval(() => {
    import('@tauri-apps/api/updater').then((updater) => {
      updater.checkUpdate().then((update) => setHasUpdate(update.shouldUpdate));
    });
  }, 30000);

  useEffect(() => {
    updaterInterval.start();
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
