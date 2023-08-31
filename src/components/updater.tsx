'use client';

import { useInterval } from '@mantine/hooks';
import { PropsWithChildren, useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

function Updater({ children }: PropsWithChildren) {
  const [hasUpdate, setHasUpdate] = useState<boolean>(false);

  const checkForUpdates = async () => {
    const updater = await import('@tauri-apps/api/updater');
    const { shouldUpdate } = await updater.checkUpdate();
    setHasUpdate(shouldUpdate);
  };

  const updaterInterval = useInterval(checkForUpdates, 30000);

  useEffect(() => {
    checkForUpdates();
    updaterInterval.start();

    return updaterInterval.stop;
  }, []);

  const installUpdate = async () => {
    const updater = await import('@tauri-apps/api/updater');
    await updater.installUpdate();
    setHasUpdate(false);
  };

  return (
    <>
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
      {children}
    </>
  );
}

export default Updater;
