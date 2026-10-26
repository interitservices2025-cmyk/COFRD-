# Plateforme COFRD — cofrd.org

Site institutionnel, programmation culturelle, billetterie et administration du
**Conseil des Organismes Francophones de la Région de Durham**.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS 4
- Stockage local JSON (`data/cofrd_db.json`) — voir « Feuille de route »
- Stripe Checkout (API REST) · Resend (courriels) — tous deux optionnels en développement

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis renseigner ADMIN_PASSWORD et SESSION_SECRET
npm run dev
```

Site : http://localhost:3000 · Administration : http://localhost:3000/admin

## Variables d'environnement

Voir [.env.example](.env.example).

| Variable | Rôle |
| --- | --- |
| `ADMIN_PASSWORD` | Mot de passe de l'espace `/admin` |
| `SESSION_SECRET` | Signature des sessions (≥ 16 caractères) |
| `NEXT_PUBLIC_SITE_URL` | URL publique (retours Stripe) |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | Paiement des billets payants |
| `RESEND_API_KEY` / `EMAIL_FROM` | Envoi des courriels de confirmation |

Sans clé Stripe, les billets payants restent « en attente ».
Sans clé Resend, les courriels sont simulés dans la console serveur.

## Flux de billetterie

1. **Événement gratuit** : réservation confirmée immédiatement + courriel.
2. **Événement payant** : réservation `pending` (places retenues) → redirection Stripe Checkout →
   webhook `POST /api/stripe/webhook` (`checkout.session.completed`) → statut `confirmed` + courriel.
   Une session expirée (`checkout.session.expired`) libère les places.

Test local du webhook : `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

## Sécurité

- `/admin` protégé par `src/proxy.ts` (session signée HMAC, cookie httpOnly).
- Écriture sur `/api/events`, liste/annulation sur `/api/reservations` : admin uniquement.
- Le public ne voit que les événements `published`.
- Signature des webhooks Stripe vérifiée ; prix recalculé côté serveur.

## Scripts

`npm run dev` · `npm run build` · `npm run start` · `npm run lint`

## Feuille de route (selon l'audit)

- [ ] Migration JSON → SQLite/LibSQL (transactions ACID, déploiement multi-instance)
- [ ] QR code sur le billet et validation à l'entrée
- [ ] Liste d'attente (statut `waitlist` déjà prévu dans les types)
- [ ] Gestion des actualités dans l'admin (CRUD) et édition d'événements
- [ ] Audit d'accessibilité WCAG 2.2 AA complet, bilingue FR/EN
- [ ] Limitation de débit sur `POST /api/reservations`
