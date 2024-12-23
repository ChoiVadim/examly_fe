import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import { Toaster } from './toaster';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-inter bg-black text-white">
      {children}
      <Toaster />
    </div>
  );
}