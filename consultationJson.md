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
      "placeholder": "Nom",
      "required": true
    }
  ]
}
```

---

## Types de Champs

Il y a 8 types de champs différents disponibles. Chaque type de champ a des propriétés spécifiques.

### Propriétés Communes pour Tous les Champs

Tous les types de champs partagent ces propriétés :

| Propriété  | Type    | Requis | Description                                                                                          |
| ---------- | ------- | ------ | ---------------------------------------------------------------------------------------------------- |
| `type`     | string  | Oui    | Le type de champ (Input, Radio, Range, RevealRadio, RevealCheckBox, Select, Checkbox, TeethSelector) |
| `label`    | string  | Oui    | Libellé d'affichage pour le champ                                                                    |
| `name`     | string  | Oui    | Identifiant unique du champ (utilisé dans les données du formulaire)                                 |
| `required` | boolean | Non    | Si le champ est obligatoire (défaut: false)                                                          |

---

## Détails des Types de Champs

### 1. Champ Input

Un champ input pour du texte, des nombres, des emails, des dates, etc.

#### Propriétés

| Propriété     | Type                | Requis | Description                                                                                             |
| ------------- | ------------------- | ------ | ------------------------------------------------------------------------------------------------------- |
| `type`        | string              | Oui    | Doit être `"Input"`                                                                                     |
| `label`       | string              | Oui    | Libellé d'affichage                                                                                     |
| `name`        | string              | Oui    | Identifiant unique du champ                                                                             |
| `placeholder` | string              | Non    | Texte d'indication affiché dans l'input vide                                                            |
| `inputType`   | string              | Non    | Type d'input HTML : `"text"`, `"email"`, `"password"`, `"number"`, `"date"`, `"tel"` (défaut: `"text"`) |
| `required`    | boolean             | Non    | Si le champ doit être rempli                                                                            |
| `default`     | string/number/"now" | Non    | Valeur par défaut. Pour les dates, utiliser `"now"` pour la date du jour.                               |

#### Exemples

**Input Texte :**

```json
{
  "type": "Input",
  "label": "Nom",
  "name": "name",
  "placeholder": "Entrez votre nom",
  "inputType": "text",
  "required": true
}
```

**Input Date (avec défaut aujourd'hui) :**

```json
{
  "type": "Input",
  "label": "Date de consultation",
  "name": "date_consultation",
  "inputType": "date",
  "required": true,
  "default": "now"
}
```

**Input Nombre :**

```json
{
  "type": "Input",
  "label": "Poids (kg)",
  "name": "poids",
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

---

### 3. Champ Checkbox

Affiche une case à cocher simple (vrai/faux).

#### Propriétés

| Propriété  | Type    | Requis | Description                      |
| ---------- | ------- | ------ | -------------------------------- |
| `type`     | string  | Oui    | Doit être `"Checkbox"`           |
| `label`    | string  | Oui    | Libellé d'affichage              |
| `name`     | string  | Oui    | Identifiant unique du champ      |
| `required` | boolean | Non    | Si la case doit être cochée      |
| `default`  | boolean | Non    | Si la case est cochée par défaut |

#### Exemple

```json
{
  "type": "Checkbox",
  "label": "ATCD chir orthognathique",
  "name": "atcd_chir_ortho"
}
```

---

### 4. Champ Range

Un champ basé sur un curseur où les utilisateurs sélectionnent parmi des étapes prédéfinies.

#### Propriétés

| Propriété  | Type    | Requis | Description                             |
| ---------- | ------- | ------ | --------------------------------------- |
| `type`     | string  | Oui    | Doit être `"Range"`                     |
| `label`    | string  | Oui    | Libellé d'affichage                     |
| `name`     | string  | Oui    | Identifiant unique du champ             |
| `steps`    | array   | Oui    | Tableau de valeurs (nombres ou chaînes) |
| `required` | boolean | Non    | Si une sélection est obligatoire        |

#### Exemple

```json
{
  "type": "Range",
  "label": "Douleur",
  "name": "douleurRange",
  "steps": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  "required": true
}
```

---

### 5. Champ RevealRadio (Champs Conditionnels)

Un champ radio spécial qui révèle des champs supplémentaires en fonction de l'option sélectionnée. Parfait pour la logique conditionnelle.

#### Propriétés

| Propriété  | Type    | Requis | Description                                                |
| ---------- | ------- | ------ | ---------------------------------------------------------- |
| `type`     | string  | Oui    | Doit être `"RevealRadio"`                                  |
| `label`    | string  | Oui    | Libellé d'affichage de la question                         |
| `name`     | string  | Oui    | Identifiant unique du champ                                |
| `options`  | array   | Oui    | Tableau d'objets option (avec champs imbriqués optionnels) |
| `required` | boolean | Non    | Si une sélection est obligatoire                           |

#### Objet Option (pour RevealRadio)

| Propriété | Type    | Requis | Description                                                                |
| --------- | ------- | ------ | -------------------------------------------------------------------------- |
| `value`   | string  | Oui    | La valeur quand cette option est sélectionnée                              |
| `label`   | string  | Oui    | Texte d'affichage de l'option                                              |
| `default` | boolean | Non    | Si cette option est sélectionnée par défaut                                |
| `fields`  | array   | Non    | Tableau de champs imbriqués à afficher quand cette option est sélectionnée |

#### Exemple

```json
{
  "type": "RevealRadio",
  "name": "antecedentsRadio",
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
          "placeholder": "ces Antécédents",
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

---

### 6. Champ RevealCheckBox (Champs Conditionnels avec Checkboxes)

Un champ checkbox spécial qui révèle des champs supplémentaires quand la checkbox est cochée.

#### Propriétés

| Propriété  | Type    | Requis | Description                                         |
| ---------- | ------- | ------ | --------------------------------------------------- |
| `type`     | string  | Oui    | Doit être `"RevealCheckBox"`                        |
| `label`    | string  | Oui    | Libellé d'affichage de la checkbox                  |
| `name`     | string  | Oui    | Identifiant unique du champ                         |
| `fields`   | array   | Non    | Tableau de champs imbriqués à afficher quand cochée |
| `required` | boolean | Non    | Si la checkbox doit être cochée                     |
| `default`  | boolean | Non    | Si la checkbox est cochée par défaut                |

#### Exemple

```json
{
  "type": "RevealCheckBox",
  "label": "Traumatique",
  "name": "atcd_traumatique",
  "fields": [
    {
      "type": "Checkbox",
      "label": "Fracture condyle",
      "name": "trauma_fracture_condyle"
    }
  ]
}
```

---

### 7. Champ Select

Un menu déroulant pour sélectionner une option unique dans une liste.

#### Propriétés

| Propriété     | Type    | Requis | Description                               |
| ------------- | ------- | ------ | ----------------------------------------- |
| `type`        | string  | Oui    | Doit être `"Select"`                      |
| `label`       | string  | Oui    | Libellé d'affichage                       |
| `name`        | string  | Oui    | Identifiant unique du champ               |
| `options`     | array   | Oui    | Tableau d'objets option                   |
| `placeholder` | string  | Non    | Texte d'indication dans le menu déroulant |
| `required`    | boolean | Non    | Si une sélection est obligatoire          |

---

### 8. Champ TeethSelector

Un sélecteur visuel de dents configurable.

#### Propriétés

| Propriété  | Type    | Requis | Description                                                                 |
| ---------- | ------- | ------ | --------------------------------------------------------------------------- |
| `type`     | string  | Oui    | Doit être `"TeethSelector"`                                                 |
| `label`    | string  | Oui    | Libellé d'affichage                                                         |
| `name`     | string  | Oui    | Identifiant unique du champ                                                 |
| `required` | boolean | Non    | Si une sélection est obligatoire                                            |
| `options`  | array   | Non    | Tableau d'états possibles pour les dents (voir ci-dessous). Défaut si omis. |

#### Objet Option (pour TeethSelector)

| Propriété | Type   | Requis | Description                                                             |
| --------- | ------ | ------ | ----------------------------------------------------------------------- |
| `value`   | string | Oui    | La valeur interne de l'état (ex: "Missing")                             |
| `label`   | string | Oui    | Le libellé affiché dans le menu (ex: "Absente")                         |
| `color`   | string | Oui    | Classe CSS Tailwind pour la couleur (ex: "fill-error", "fill-base-300") |

#### Exemple

```json
{
  "type": "TeethSelector",
  "label": "Schéma Dentaire",
  "name": "schema_dentaire",
  "options": [
    { "value": "Normal", "label": "Sain", "color": "fill-base-300" },
    { "value": "Missing", "label": "Absent", "color": "fill-error" },
    { "value": "Implant", "label": "Implant", "color": "fill-warning" }
  ]
}
```

---

## Bonnes Pratiques

### 1. Conventions de Nomination

- Utilisez **camelCase** pour la propriété `name` (ex: `dateConsultation`, `antecedentsMedicaux`) toujours les mettres en francais
- Utilisez du **texte lisible en français** pour la propriété `label`

### 2. Champs Obligatoires

- Marquez les champs comme `required: true` uniquement quand le champ doit être complété
- Pour les champs conditionnels dans RevealRadio, définissez `required` approprié seulement pour les champs exposés

### 3. Valeurs par Défaut

- Utilisez `default: true` sur une option dans les champs Radio ou RevealRadio
- Utilisez `default: "now"` pour les champs Input de type date pour pré-remplir avec la date du jour
- Utilisez `default : "valeur"` pour les champs Input texte/nombre pour pré-remplir avec une valeur spécifique
- Une seule option devrait avoir `default: true` par champ Radio

### 4. Organisation des Champs

- Groupez les champs connexes dans des sections logiques
- Utilisez des titres de section significatifs

### 5. Types d'Input

Choisissez le `inputType` approprié pour les champs Input :

- `text` - Input texte général (défaut)
- `email` - Validation email
- `password` - Input texte masqué
- `number` - Input numérique
- `date` - Sélecteur de date
- `tel` - Input numéro de téléphone
