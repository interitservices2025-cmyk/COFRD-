'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  HeartHandshake,
  Scale,
  Briefcase,
  Users
} from 'lucide-react';

const SUBJECTS = [
  { value: 'general', label: 'Renseignement général' },
  { value: 'benevolat', label: 'Bénévolat au COFRD' },
  { value: 'adhesion', label: 'Adhésion membre ou affiliation' },
  { value: 'emploi', label: 'Centre d\'Emploi (CEFD)' },
  { value: 'etablissement', label: 'Services d\'Établissement & Immigration' },
  { value: 'justice', label: 'Programme de Soutien Juridique' },
  { value: 'culture', label: 'Programmation culturelle & événements' },
  { value: 'autre', label: 'Autre demande' },
];

function ContactFormInner() {
  const searchParams = useSearchParams();
  const querySubject = searchParams.get('sujet');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: querySubject && SUBJECTS.some(s => s.value === querySubject) ? querySubject : 'general',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setStatus('loading');
    // Simulation réseau avec confirmation immédiate
    await new Promise(r => setTimeout(r, 1000));
    setStatus('success');
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-10">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Envoyez-nous un message</h2>
      <p className="text-slate-600 text-xs sm:text-sm mb-6">
        Remplissez ce formulaire et notre équipe vous répondra dans un délai de 24 à 48 heures ouvrables.
      </p>

      {querySubject && (
        <div className="mb-6 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            Formulaire pré-configuré pour : <strong>{SUBJECTS.find(s => s.value === querySubject)?.label}</strong>
          </span>
        </div>
      )}

      {status === 'success' ? (
        <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Message transmis avec succès !</h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Merci <strong>{form.name}</strong>. Votre demande a bien été envoyée à l'équipe du COFRD. Nous communiquerons avec vous très prochainement à l'adresse <strong>{form.email}</strong>.
          </p>
          <button
            onClick={() => {
              setForm({ name: '', email: '', phone: '', subject: 'general', message: '' });
              setStatus('idle');
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:underline pt-4"
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1.5">
                Nom complet <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Ex : Monique Boudreau"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">
                Courriel <span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Ex : m.boudreau@example.ca"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1.5">
                Téléphone (facultatif)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Ex : (905) 555-0123"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-bold text-slate-700 mb-1.5">
                Objet de votre demande <span className="text-rose-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1.5">
              Votre message <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Expliquez-nous comment nous pouvons vous aider..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition disabled:opacity-50"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Transmettre mon message</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Contactez le COFRD
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Notre équipe est disponible du lundi au vendredi pour répondre à toutes vos questions, vous orienter vers nos programmes ou accueillir vos projets.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Formulaire (7 cols) */}
          <div className="lg:col-span-7">
            <Suspense fallback={
              <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
                <p>Chargement du formulaire...</p>
              </div>
            }>
              <ContactFormInner />
            </Suspense>
          </div>

          {/* Coordonnées & Accès (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Siège social */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
              <h2 className="text-xl font-bold text-slate-900">Coordonnées Officielles</h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Siège social</div>
                    <div className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                      57 rue Simcoe S, Suite 2D<br />
                      Oshawa, ON, L1H 4G4
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Accueil général & Direction</div>
                    <a href="tel:9054347676" className="text-blue-700 text-xs font-semibold hover:underline block mt-0.5">
                      (905) 434-7676
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Courriel officiel</div>
                    <a href="mailto:dg@cofrd.org" className="text-blue-700 text-xs hover:underline block mt-0.5">
                      dg@cofrd.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Heures d'ouverture</div>
                    <div className="text-slate-600 text-xs mt-0.5">
                      Lundi au Vendredi : 8h30 – 16h30<br />
                      Fermé les fins de semaine et jours fériés
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ligne directe Soutien Juridique */}
            <div className="bg-amber-50 rounded-3xl border border-amber-200 p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <Scale className="w-4 h-4 text-amber-600" />
                <span>Pôle Soutien Juridique (Ligne Directe)</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Pour toute demande relative aux droits civils, logement, travail ou médiation :
              </p>
              <div className="space-y-1.5 text-xs text-amber-950 font-medium pt-1">
                <div>Coordonnatrice : <strong>Mme Adele Mbelle Nkelle</strong></div>
                <div>Téléphone direct : <a href="tel:9054347374" className="font-bold text-blue-800 hover:underline">(905) 434-7374</a></div>
                <div>Courriel confidentiel : <a href="mailto:justice@cofrd.org" className="font-bold text-blue-800 hover:underline">justice@cofrd.org</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
