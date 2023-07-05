import { clipboard } from '@tauri-apps/api';
import { CopyIcon } from 'lucide-react';
import { PropsWithChildren } from 'react';

interface CopyProps extends PropsWithChildren {
  text: string;
}

function Copy({ children, text }: CopyProps) {
  return (
    <div className="w-fit relative">
      {children}
      <button
        onClick={() => {
          clipboard.writeText(text);
        }}
        className="top-1/2 -right-7 text-black hover:bg-neutral-200 transition-all active:bg-neutral-300 absolute p-1.5 -translate-y-1/2 rounded-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
      >
        <CopyIcon className="w-3.5 h-3.5" strokeWidth={1} />
      </button>
    </div>
  );
}

export default Copy;
