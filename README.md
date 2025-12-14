# Documentation

## Frontend pour le commande entreprise CHU

Voici le frontend pour le commande entreprise CHU

## Commandes pour lancer le projet

- `npm install` pour installer les dépendances
- `npm run dev` pour lancer le projet en mode développement

## Déploiement

### Construction pour la production

Pour créer une version de production optimisée :

```bash
npm run build
```

Cela va générer les fichiers statiques dans le dossier `dist/`. Ces fichiers peuvent être hébergés sur n'importe quel serveur web statique (nginx, Apache, etc.).

### Déploiement sur Vercel

Le projet est configuré pour être déployé facilement sur **Vercel**. 
Un fichier `vercel.json` est présent à la racine pour la configuration.

Pour déployer, vous pouvez connecter votre dépôt GitHub à Vercel ou utiliser la CLI Vercel :

```bash
vercel
```

## UI

- Utilisation de la bibliothèque DaisyUI pour les composants UI
- Utilisation de Tailwind CSS pour le style

## Technologies utilisées

- React
- Vite
- Tailwind CSS
- TypeScript
- React Router DOM

## Arborescence du Frontend

```
ChuAppFront
└─ frontend
   ├─ .env.example
   ├─ .vercel
   │  ├─ project.json
   │  └─ README.txt
   ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ pnpm-lock.yaml
   ├─ public
   │  ├─ CHU.png
   │  ├─ docs
   │  │  ├─ consultationData.md
   │  │  ├─ consultationJson.md
   │  │  └─ consultationTemplate.md
   │  └─ teeth
   │     ├─ b1
   │     ├─ b2
   │     ├─ b3
   │     ├─ b4
   │     ├─ b5
   │     ├─ b6
   │     ├─ b7
   │     ├─ b8
   │     ├─ h1
   │     ├─ h2
   │     ├─ h3
   │     ├─ h4
   │     ├─ h5
   │     ├─ h6
   │     ├─ h7
   │     └─ h8
   ├─ README.md
   ├─ src
   │  ├─ App.tsx
   │  ├─ components
   │  │  ├─ Button.tsx
   │  │  ├─ Card.tsx
   │  │  ├─ CodeEditor.tsx
   │  │  ├─ ConfirmationModal.tsx
   │  │  ├─ EditPatientModal.tsx
   │  │  ├─ form
   │  │  │  ├─ Checkbox.tsx
   │  │  │  ├─ CheckboxGroup.tsx
   │  │  │  ├─ ContinuousRange.tsx
   │  │  │  ├─ DynamicForm.tsx
   │  │  │  ├─ Input.tsx
   │  │  │  ├─ Radio.tsx
   │  │  │  ├─ Range.tsx
   │  │  │  ├─ RevealCheckBox.tsx
   │  │  │  ├─ RevealRadio.tsx
   │  │  │  ├─ Select.tsx
   │  │  │  ├─ teeth
   │  │  │  │  ├─ B1.tsx
   │  │  │  │  ├─ B2.tsx
   │  │  │  │  ├─ B3.tsx
   │  │  │  │  ├─ B4.tsx
   │  │  │  │  ├─ B5.tsx
   │  │  │  │  ├─ B6.tsx
   │  │  │  │  ├─ B7.tsx
   │  │  │  │  ├─ B8.tsx
   │  │  │  │  ├─ H1.tsx
   │  │  │  │  ├─ H2.tsx
   │  │  │  │  ├─ H3.tsx
   │  │  │  │  ├─ H4.tsx
   │  │  │  │  ├─ H5.tsx
   │  │  │  │  ├─ H6.tsx
   │  │  │  │  ├─ H7.tsx
   │  │  │  │  └─ H8.tsx
   │  │  │  ├─ TeethSelector.tsx
   │  │  │  ├─ TeethSummary.tsx
   │  │  │  ├─ Tooth.tsx
   │  │  │  └─ ToothDropdown.tsx
   │  │  ├─ IconButton.tsx
   │  │  ├─ Modal.tsx
   │  │  ├─ Navbar.tsx
   │  │  ├─ PageHeader.tsx
   │  │  ├─ PatientCard.tsx
   │  │  ├─ ProtectedRoute.tsx
   │  │  ├─ Table.tsx
   │  │  ├─ Tabs.tsx
   │  │  ├─ ThemeController.tsx
   │  │  └─ Toast.tsx
   │  ├─ context
   │  │  ├─ AuthContext.tsx
   │  │  └─ ToastContext.tsx
   │  ├─ endpoints
   │  │  ├─ adminEndpoints.ts
   │  │  ├─ authEndpoints.ts
   │  │  ├─ chuEndpoints.ts
   │  │  ├─ patientEndpoints.ts
   │  │  ├─ statsEndpoints.ts
   │  │  └─ templateEndpoints.ts
   │  ├─ hooks
   │  │  ├─ patientHooks.ts
   │  │  ├─ statsHooks.ts
   │  │  ├─ templateHooks.ts
   │  │  ├─ useAdmin.ts
   │  │  ├─ useAuthQueries.ts
   │  │  └─ useChus.ts
   │  ├─ index.css
   │  ├─ json.d.ts
   │  ├─ main.tsx
   │  ├─ page
   │  │  ├─ AdminChus.tsx
   │  │  ├─ AdminDashboard.tsx
   │  │  ├─ AdminUsers.tsx
   │  │  ├─ DossierPatient.tsx
   │  │  ├─ forms
   │  │  │  ├─ GenericForm.tsx
   │  │  │  └─ NewPatient.tsx
   │  │  ├─ home.tsx
   │  │  ├─ Login.tsx
   │  │  ├─ NotFound.tsx
   │  │  ├─ Register.tsx
   │  │  ├─ SearchPatient.tsx
   │  │  └─ TemplateManager.tsx
   │  ├─ types
   │  │  ├─ api.ts
   │  │  ├─ formTypes.ts
   │  │  ├─ index.ts
   │  │  └─ teethTypes.ts
   │  └─ utils
   │     ├─ api.ts
   │     ├─ date.ts
   │     └─ textLogic
   │        └─ createTxt.ts
   ├─ tailwind.config.js
   ├─ tsconfig.app.json
   ├─ tsconfig.json
   ├─ tsconfig.node.json
   ├─ vercel.json
   └─ vite.config.ts

```
