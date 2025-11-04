# Documentation JSON Consultation

## Aperçu

Cette documentation explique comment créer des formulaires de consultation médicale dynamiques en utilisant la syntaxe JSON utilisée dans le projet. Les formulaires sont définis en utilisant une structure JSON standardisée qui permet aux développeurs de construire des formulaires complexes à plusieurs sections sans écrire de code UI.

## Structure de Base

Chaque fichier JSON de formulaire de consultation suit cette structure racine :

```json
{
  "metadata": {
    "name": "NomFormulaire",
    "description": "Brève description du formulaire"
  },
  "sections": [
    // Tableau des sections du formulaire
  ]
}
```

### Objet Metadata

L'objet `metadata` contient des informations sur le formulaire :

| Propriété     | Type   | Requis | Description                                    |
| ------------- | ------ | ------ | ---------------------------------------------- |
| `name`        | string | Oui    | L'identifiant unique du formulaire             |
| `description` | string | Oui    | Un titre descriptif du formulaire              |
| `version`     | string | Non    | Numéro de version du formulaire (ex: "1.0.0")  |
| `createdAt`   | string | Non    | Date ISO de création du formulaire             |
| `updatedAt`   | string | Non    | Date ISO de dernière mise à jour du formulaire |

**Exemple :**

```json
{
  "metadata": {
    "name": "PremConsult",
    "description": "Première consultation",
    "version": "1.0.0",
    "createdAt": "2024-01-15"
  }
}
```

---

## Sections

Les sections organisent les champs du formulaire en groupes logiques. Chaque section a un titre et contient un tableau de champs.

### Structure d'un Objet Section

```json
{
  "title": "Titre de la Section",
  "fields": [
    // Tableau des champs du formulaire
  ]
}
```

| Propriété | Type   | Requis | Description                          |
| --------- | ------ | ------ | ------------------------------------ |
| `title`   | string | Oui    | Titre d'affichage de la section      |
| `fields`  | array  | Oui    | Tableau d'objets champ de formulaire |

**Exemple :**

```json
{
  "title": "Informations Personnelles",
  "fields": [
    {
      "type": "Input",
      "label": "Nom",
      "name": "name",
      "pdfName": "Nom",
      "placeholder": "Nom",
      "required": true
    }
  ]
}
```

---

## Types de Champs

Il y a 6 types de champs différents disponibles. Chaque type de champ a des propriétés spécifiques.

### Propriétés Communes pour Tous les Champs

Tous les types de champs partagent ces propriétés :

| Propriété  | Type    | Requis | Description                                                           |
| ---------- | ------- | ------ | --------------------------------------------------------------------- |
| `type`     | string  | Oui    | Le type de champ (Input, Radio, Range, RevealRadio, Select, Checkbox) |
| `label`    | string  | Oui    | Libellé d'affichage pour le champ                                     |
| `name`     | string  | Oui    | Identifiant unique du champ (utilisé dans les données du formulaire)  |
| `pdfName`  | string  | Oui    | Nom du libellé lors de l'export en PDF                                |
| `required` | boolean | Non    | Si le champ est obligatoire (défaut: false)                           |

---

## Détails des Types de Champs

### 1. Champ Input

Un champ input pour du texte, des nombres, des emails, des dates, etc.

#### Propriétés

| Propriété     | Type    | Requis | Description                                                                                             |
| ------------- | ------- | ------ | ------------------------------------------------------------------------------------------------------- |
| `type`        | string  | Oui    | Doit être `"Input"`                                                                                     |
| `label`       | string  | Oui    | Libellé d'affichage                                                                                     |
| `name`        | string  | Oui    | Identifiant unique du champ                                                                             |
| `pdfName`     | string  | Oui    | Libellé pour export PDF                                                                                 |
| `placeholder` | string  | Non    | Texte d'indication affiché dans l'input vide                                                            |
| `inputType`   | string  | Non    | Type d'input HTML : `"text"`, `"email"`, `"password"`, `"number"`, `"date"`, `"tel"` (défaut: `"text"`) |
| `required`    | boolean | Non    | Si le champ doit être rempli                                                                            |

#### Exemples

**Input Texte :**

```json
{
  "type": "Input",
  "label": "Nom",
  "name": "name",
  "pdfName": "Nom",
  "placeholder": "Entrez votre nom",
  "inputType": "text",
  "required": true
}
```

**Input Date :**

```json
{
  "type": "Input",
  "label": "Date de naissance",
  "name": "dob",
  "pdfName": "Date de naissance",
  "inputType": "date",
  "required": true
}
```

**Input Nombre :**

```json
{
  "type": "Input",
  "label": "Poids (kg)",
  "name": "poids",
  "pdfName": "Poids",
  "placeholder": "Poids en kg",
  "inputType": "number",
  "required": true
}
```

---

### 2. Champ Radio

Affiche un ensemble d'options mutuellement exclusives. Une seule option peut être sélectionnée à la fois.

#### Propriétés

| Propriété  | Type    | Requis | Description                      |
| ---------- | ------- | ------ | -------------------------------- |
| `type`     | string  | Oui    | Doit être `"Radio"`              |
| `label`    | string  | Oui    | Libellé d'affichage              |
| `name`     | string  | Oui    | Identifiant unique du champ      |
| `pdfName`  | string  | Oui    | Libellé pour export PDF          |
| `options`  | array   | Oui    | Tableau d'objets option          |
| `required` | boolean | Non    | Si une sélection est obligatoire |

#### Objet Option

| Propriété | Type                  | Requis | Description                                           |
| --------- | --------------------- | ------ | ----------------------------------------------------- |
| `value`   | string/number/boolean | Oui    | La valeur stockée quand cette option est sélectionnée |
| `label`   | string                | Oui    | Texte d'affichage de l'option                         |
| `default` | boolean               | Non    | Si cette option est sélectionnée par défaut           |

#### Exemple

```json
{
  "type": "Radio",
  "label": "Sexe",
  "name": "sexe",
  "pdfName": "Sexe",
  "options": [
    {
      "value": "homme",
      "label": "Homme",
      "default": true
    },
    {
      "value": "femme",
      "label": "Femme"
    }
  ],
  "required": true
}
```

**Avec Valeurs Booléennes :**

```json
{
  "type": "Radio",
  "label": "Toxine botulique utilisée ?",
  "name": "toxine_botulique",
  "pdfName": "Toxine botulique",
  "options": [
    {
      "value": false,
      "label": "Non",
      "default": true
    },
    {
      "value": true,
      "label": "Oui"
    }
  ],
  "required": false
}
```

---

### 3. Champ Checkbox

Affiche un ensemble d'options où plusieurs options peuvent être sélectionnées.

#### Propriétés

| Propriété  | Type    | Requis | Description                               |
| ---------- | ------- | ------ | ----------------------------------------- |
| `type`     | string  | Oui    | Doit être `"Checkbox"`                    |
| `label`    | string  | Oui    | Libellé d'affichage                       |
| `name`     | string  | Oui    | Identifiant unique du champ               |
| `pdfName`  | string  | Oui    | Libellé pour export PDF                   |
| `required` | boolean | Non    | Si au moins une sélection est obligatoire |

#### Exemple

```json
{
  "type": "Checkbox",
  "label": "ATCD chir orthognathique",
  "name": "atcd_chir_ortho",
  "pdfName": "ATCD chir orthognathique"
}
```

---

### 4. Champ Range

Un champ basé sur un curseur où les utilisateurs sélectionnent parmi des étapes prédéfinies.

#### Propriétés

| Propriété  | Type    | Requis | Description                                     |
| ---------- | ------- | ------ | ----------------------------------------------- |
| `type`     | string  | Oui    | Doit être `"Range"`                             |
| `label`    | string  | Oui    | Libellé d'affichage                             |
| `name`     | string  | Oui    | Identifiant unique du champ                     |
| `pdfName`  | string  | Oui    | Libellé pour export PDF                         |
| `steps`    | array   | Oui    | Tableau de libellés de chaîne pour chaque étape |
| `required` | boolean | Non    | Si une sélection est obligatoire                |

#### Exemple

```json
{
  "type": "Range",
  "label": "Douleur",
  "name": "douleurRange",
  "pdfName": "Niveau de douleur",
  "steps": ["pas de douleur", "douleur légère", "douleur", "douleur extreme"],
  "required": true
}
```

---

### 5. Champ RevealRadio (Champs Conditionnels)

Un champ radio spécial qui révèle des champs supplémentaires en fonction de l'option sélectionnée. Parfait pour la logique conditionnelle.

#### Propriétés

| Propriété       | Type    | Requis | Description                                                |
| --------------- | ------- | ------ | ---------------------------------------------------------- |
| `type`          | string  | Oui    | Doit être `"RevealRadio"`                                  |
| `label`         | string  | Oui    | Libellé d'affichage de la question                         |
| `name`          | string  | Oui    | Identifiant unique du champ                                |
| `pdfName`       | string  | Oui    | Libellé pour export PDF                                    |
| `categoryLabel` | string  | Oui    | Nom de catégorie                                           |
| `options`       | array   | Oui    | Tableau d'objets option (avec champs imbriqués optionnels) |
| `required`      | boolean | Non    | Si une sélection est obligatoire                           |

#### Objet Option (pour RevealRadio)

| Propriété | Type    | Requis | Description                                                                |
| --------- | ------- | ------ | -------------------------------------------------------------------------- |
| `value`   | string  | Oui    | La valeur quand cette option est sélectionnée                              |
| `label`   | string  | Oui    | Texte d'affichage de l'option                                              |
| `default` | boolean | Non    | Si cette option est sélectionnée par défaut                                |
| `fields`  | array   | Non    | Tableau de champs imbriqués à afficher quand cette option est sélectionnée |

#### Exemple 1 : Oui/Non Simple avec Champs Imbriqués

```json
{
  "type": "RevealRadio",
  "name": "antecedentsRadio",
  "pdfName": "Antécédents Médicaux",
  "categoryLabel": "Antécédents Médicaux",
  "label": "A t'il des antécédents médicaux ?",
  "options": [
    {
      "value": "yes",
      "label": "Oui",
      "fields": [
        {
          "type": "Input",
          "label": "Antécédents",
          "name": "antecedents",
          "pdfName": "Antécédents",
          "placeholder": "ces Antécédents",
          "required": false
        },
        {
          "type": "Input",
          "label": "Traitements",
          "name": "traitements",
          "pdfName": "Traitements",
          "placeholder": "ces Traitements",
          "required": false
        }
      ]
    },
    {
      "value": "no",
      "label": "Non",
      "default": true
    }
  ],
  "required": true
}
```

#### Exemple 2 : Plusieurs Options avec Différents Champs Imbriqués

```json
{
  "type": "RevealRadio",
  "label": "Activité",
  "name": "activite",
  "pdfName": "Activité",
  "options": [
    {
      "value": "active",
      "label": "Vie active",
      "fields": [
        {
          "type": "Input",
          "label": "Profession",
          "name": "profession",
          "pdfName": "Profession",
          "placeholder": "Profession",
          "required": false
        }
      ]
    },
    {
      "value": "etudiant",
      "label": "Etudiant",
      "fields": [
        {
          "type": "Input",
          "label": "Etudes",
          "name": "etudes",
          "pdfName": "Etudes",
          "placeholder": "Etudes",
          "required": false
        }
      ]
    },
    {
      "value": "sans_emploi",
      "label": "Sans emploi"
    },
    {
      "value": "retraite",
      "label": "Retraité"
    }
  ],
  "required": true
}
```

#### Exemple 3 : RevealRadio Imbriqué (Reveal dans Reveal)

```json
{
  "type": "RevealRadio",
  "name": "bruxisme_Radio",
  "pdfName": "Bruxisme",
  "categoryLabel": "Bruxisme",
  "label": "Bruxisme ?",
  "options": [
    {
      "value": "yes",
      "label": "Oui",
      "fields": [
        {
          "type": "Checkbox",
          "label": "Diurne",
          "name": "bruxisme_diurne",
          "pdfName": "Bruxisme Diurne"
        },
        {
          "type": "Checkbox",
          "label": "Nocturne",
          "name": "bruxisme_nocturne",
          "pdfName": "Bruxisme Nocturne"
        },
        {
          "type": "RevealRadio",
          "label": "Utilise une gouttière ?",
          "name": "bruxisme_gouttiere_reveal",
          "pdfName": "Gouttière",
          "options": [
            {
              "value": "yes",
              "label": "Oui",
              "fields": [
                {
                  "type": "Input",
                  "label": "Type de gouttière",
                  "name": "gouttiere_type",
                  "pdfName": "Type de gouttière"
                }
              ]
            },
            {
              "value": "no",
              "label": "Non",
              "default": true
            }
          ]
        }
      ]
    },
    {
      "value": "no",
      "label": "Non",
      "default": true
    }
  ],
  "required": true
}
```

---

### 6. Champ Select

Un menu déroulant pour sélectionner une option unique dans une liste.

#### Propriétés

| Propriété     | Type    | Requis | Description                               |
| ------------- | ------- | ------ | ----------------------------------------- |
| `type`        | string  | Oui    | Doit être `"Select"`                      |
| `label`       | string  | Oui    | Libellé d'affichage                       |
| `name`        | string  | Oui    | Identifiant unique du champ               |
| `pdfName`     | string  | Oui    | Libellé pour export PDF                   |
| `options`     | array   | Oui    | Tableau d'objets option                   |
| `placeholder` | string  | Non    | Texte d'indication dans le menu déroulant |
| `required`    | boolean | Non    | Si une sélection est obligatoire          |

#### Exemple

```json
{
  "type": "Select",
  "label": "Forme du visage",
  "name": "forme_visage",
  "pdfName": "Forme du visage",
  "placeholder": "Sélectionner une forme",
  "options": [
    {
      "value": "ovoide",
      "label": "Ovoide"
    },
    {
      "value": "carre",
      "label": "Carré"
    },
    {
      "value": "allonge",
      "label": "Allongé"
    },
    {
      "value": "rond",
      "label": "Rond"
    }
  ],
  "required": true
}
```

---

## Exemple de Formulaire Complet

Voici un exemple de formulaire simple mais complet combinant plusieurs types de champs :

```json
{
  "metadata": {
    "name": "SimpleConsult",
    "description": "Consultation Simplifiée"
  },
  "sections": [
    {
      "title": "Informations Personnelles",
      "fields": [
        {
          "type": "Input",
          "label": "Nom",
          "name": "nom",
          "pdfName": "Nom",
          "placeholder": "Votre nom",
          "inputType": "text",
          "required": true
        },
        {
          "type": "Input",
          "label": "Prénom",
          "name": "prenom",
          "pdfName": "Prénom",
          "placeholder": "Votre prénom",
          "inputType": "text",
          "required": true
        },
        {
          "type": "Input",
          "label": "Date de naissance",
          "name": "dob",
          "pdfName": "Date de naissance",
          "inputType": "date",
          "required": true
        },
        {
          "type": "Radio",
          "label": "Sexe",
          "name": "sexe",
          "pdfName": "Sexe",
          "options": [
            {
              "value": "m",
              "label": "Masculin",
              "default": true
            },
            {
              "value": "f",
              "label": "Féminin"
            }
          ],
          "required": true
        }
      ]
    },
    {
      "title": "Santé",
      "fields": [
        {
          "type": "RevealRadio",
          "name": "antecedents",
          "pdfName": "Antécédents",
          "categoryLabel": "Antécédents Médicaux",
          "label": "Avez-vous des antécédents médicaux ?",
          "options": [
            {
              "value": "yes",
              "label": "Oui",
              "fields": [
                {
                  "type": "Input",
                  "label": "Détails des antécédents",
                  "name": "antecedents_details",
                  "pdfName": "Antécédents Détails",
                  "placeholder": "Décrivez vos antécédents",
                  "required": true
                }
              ]
            },
            {
              "value": "no",
              "label": "Non",
              "default": true
            }
          ],
          "required": true
        },
        {
          "type": "Range",
          "label": "Niveau de douleur",
          "name": "pain_level",
          "pdfName": "Niveau de douleur",
          "steps": ["Aucune", "Légère", "Modérée", "Sévère", "Insupportable"],
          "required": true
        }
      ]
    }
  ]
}
```

---

## Bonnes Pratiques

### 1. Conventions de Nomination

- Utilisez **camelCase** pour la propriété `name` (ex: `dateOfBirth`, `bloodPressure`)
- Utilisez **snake_case** pour les noms de champs complexes (ex: `medical_antecedents`, `family_history`)
- Utilisez du **texte lisible en français** pour les propriétés `label` et `pdfName`
- Gardez `pdfName` clair et professionnel pour la génération de documents

### 2. Champs Obligatoires

- Marquez les champs comme `required: true` uniquement quand le champ doit être complété
- Pour les champs conditionnels dans RevealRadio, définissez `required` approprié seulement pour les champs exposés

### 3. Valeurs par Défaut

- Utilisez `default: true` sur une option dans les champs Radio ou RevealRadio
- Une seule option devrait avoir `default: true` par champ

### 4. Organisation des Champs

- Groupez les champs connexes dans des sections logiques
- Utilisez des titres de section significatifs
- Limitez les sections à 5-10 champs pour une meilleure lisibilité

### 5. Types d'Input

Choisissez le `inputType` approprié pour les champs Input :

- `text` - Input texte général (défaut)
- `email` - Validation email
- `password` - Input texte masqué
- `number` - Input numérique avec contrôles de rotation
- `date` - Sélecteur de date
- `tel` - Input numéro de téléphone

### 6. Motif RevealRadio

Utilisez RevealRadio quand :

- Vous avez besoin d'un affichage conditionnel de champs
- Le formulaire a des questions "Oui/Non" avec des détails de suivi
- Différentes options nécessitent des informations différentes

À éviter :

- Trop de niveaux d'imbrication (limiter à 2-3 niveaux)
- RevealRadio imbriqué complexe dans RevealRadio (peut confondre les utilisateurs)

### 7. Texte d'Indication (Placeholder)

- Fournissez un texte d'indication utile pour les champs Input
- Rendez les placeholders courts et descriptifs
- Utilisez des exemples le cas échéant (ex: "Ex: Jean Dupont")

### 8. Noms pour Export PDF

- Utilisez `pdfName` qui correspond aux noms de colonnes de la base de données
- Gardez-le professionnel et cohérent
- Évitez les caractères spéciaux sauf les espaces et underscores

---

## Intégration avec l'Application

### Utilisation du Formulaire dans les Composants

Une fois que vous avez créé votre fichier JSON, vous pouvez l'utiliser dans vos composants React :

```typescript
import { DynamicForm } from "@/components/DynamicForm";
import formConfig from "@/utils/PremConsult.json";

export function ConsultationPage() {
  const handleSubmit = (data: FormData) => {
    console.log("Formulaire soumis:", data);
    // Envoyer les données au backend
  };

  return (
    <div>
      <DynamicForm config={formConfig} onSubmit={handleSubmit} />
    </div>
  );
}
```

### Structure des Données du Formulaire

Quand un formulaire est soumis, les données sont retournées comme un objet où :

- Les clés sont les valeurs de propriété `name` du champ
- Les valeurs sont l'input de l'utilisateur

**Exemple :**

```typescript
{
  "nom": "Dupont",
  "prenom": "Jean",
  "dob": "1990-05-15",
  "sexe": "m",
  "antecedents": "no",
  "pain_level": "2"
}
```

### Export PDF

Les données du formulaire peuvent être exportées en PDF en utilisant la fonction `createPdf`. La propriété `pdfName` détermine comment chaque champ apparaît dans le document.

---

## Règles de Validation

Le système de formulaire valide automatiquement :

1. **Champs Obligatoires** - Assure que les champs avec `required: true` sont remplis
2. **Types d'Input** - Valide le format en fonction de `inputType` (ex: format de date)
3. **Sélection Radio** - Assure qu'une option radio est sélectionnée si `required: true`
4. **Champs Imbriqués** - Valide les champs imbriqués dans RevealRadio quand ils sont révélés

---

## Motifs Courants

### Motif 1 : Oui/Non avec Détails

```json
{
  "type": "RevealRadio",
  "name": "has_symptoms",
  "pdfName": "Symptômes",
  "categoryLabel": "Symptômes",
  "label": "Avez-vous des symptômes ?",
  "options": [
    {
      "value": "yes",
      "label": "Oui",
      "fields": [
        {
          "type": "Input",
          "label": "Décrivez les symptômes",
          "name": "symptoms_description",
          "pdfName": "Description des symptômes"
        }
      ]
    },
    {
      "value": "no",
      "label": "Non",
      "default": true
    }
  ]
}
```

### Motif 2 : Choix Multiples avec Sous-Options

```json
{
  "type": "RevealRadio",
  "name": "occupation",
  "pdfName": "Occupation",
  "label": "Quel est votre statut professionnel ?",
  "options": [
    {
      "value": "employed",
      "label": "Employé",
      "fields": [
        {
          "type": "Input",
          "label": "Intitulé du poste",
          "name": "job_title",
          "pdfName": "Intitulé du poste"
        }
      ]
    },
    {
      "value": "student",
      "label": "Étudiant",
      "fields": [
        {
          "type": "Input",
          "label": "École/Université",
          "name": "education_place",
          "pdfName": "École/Université"
        }
      ]
    },
    {
      "value": "unemployed",
      "label": "Chômeur"
    }
  ]
}
```

### Motif 3 : Sélection d'Échelle/Plage

```json
{
  "type": "Range",
  "label": "Niveau de Douleur",
  "name": "pain_scale",
  "pdfName": "Niveau de douleur",
  "steps": ["Pas de douleur", "Légère", "Modérée", "Sévère", "Pire possible"]
}
```

---

## Dépannage

### Problème : Les valeurs de champs ne sont pas sauvegardées

- **Vérifier :** Assurez-vous que la propriété `name` est unique dans le formulaire
- **Vérifier :** Vérifiez que la syntaxe JSON est valide (utilisez un validateur JSON)

### Problème : Les champs imbriqués n'apparaissent pas

- **Vérifier :** Assurez-vous que l'option RevealRadio a `"value": "yes"` et contient un tableau `fields`
- **Vérifier :** Vérifiez que l'option n'est pas marquée avec `"default": true` pour l'option "no"

### Problème : L'export PDF affiche les mauvais libellés

- **Vérifier :** Vérifiez que la propriété `pdfName` est définie sur tous les champs
- **Vérifier :** Assurez-vous que `categoryLabel` est défini pour les champs RevealRadio

### Problème : La validation requise ne fonctionne pas

- **Vérifier :** Assurez-vous que `"required": true` est défini sur le champ
- **Vérifier :** Pour RevealRadio, définissez `required` sur le parent, pas sur les champs imbriqués

---

## Historique des Versions

- **v1.0.0** (Actuel) - Système de formulaire de consultation initial supportant tous les 6 types de champs

---

## Support

Pour les questions ou problèmes avec le système de formulaire, consultez :

- `src/components/DynamicForm.tsx` - Rendu principal du formulaire
- `src/types/formTypes.ts` - Définitions de types TypeScript
- `src/utils/pdfLogic/createPdf.ts` - Logique de génération PDF
