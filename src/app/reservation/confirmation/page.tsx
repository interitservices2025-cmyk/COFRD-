import { Suspense } from 'react';
import ConfirmationContent from './ConfirmationContent';
import { Loader2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Confirmation de réservation — COFRD',
};

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto" />
          <p className="text-slate-600 font-medium">Chargement de votre réservation…</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
