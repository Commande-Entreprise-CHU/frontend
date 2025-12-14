# Documentation des Données de Consultation

## Structure des Données

Lorsque le formulaire est soumis ou utilisé pour générer un template, les données sont structurées sous forme d'un objet plat (clé-valeur).

### Aplatissement des Données

Contrairement à la structure imbriquée du fichier JSON de configuration (avec ses sections et champs imbriqués), l'objet de données (`formData`) contient toutes les valeurs au premier niveau.

**Exemple de Configuration JSON :**

```json
{
  "sections": [
    {
      "fields": [
        { "name": "nom", "type": "Input" },
        {
          "name": "antecedents",
          "type": "RevealRadio",
          "options": [
            {
              "value": "oui",
              "fields": [{ "name": "details_antecedents", "type": "Input" }]
            }
          ]
        }
      ]
    }
  ]
}
```

**Objet de Données Résultant :**

```json
{
  "nom": "Dupont",
  "antecedents": "oui",
  "details_antecedents": "Diabète"
}
```

### Conséquences pour les Templates

Dans vos templates Handlebars, vous pouvez accéder directement à n'importe quel champ par son nom (`name`), peu importe sa profondeur dans la configuration du formulaire.

```handlebars
Patient :
{{nom}}
Antécédents :
{{details_antecedents}}
```

Il n'est pas nécessaire de naviguer dans des objets imbriqués (ex: `antecedents.details` n'existe pas, c'est juste `details_antecedents`).

---

## Données Spécifiques : Sélecteur de Dents

Le champ `TeethSelector` stocke ses données sous forme d'une chaîne JSON stringifiée représentant l'état de chaque dent.

**Format brut (stocké) :**

```json
"{\"18\":\"Normal\",\"17\":\"Missing\",\"16\":\"Implant\", ...}"
```

### Utilisation dans les Templates

Pour afficher ces données proprement dans un template, vous **devez** utiliser le helper `formatTeeth`.

```handlebars
État dentaire : {{formatTeeth etat_dentaire}}
```

**Résultat généré :**

> État dentaire : Dent 17: Missing, Dent 16: Implant

Si toutes les dents sont "Normal", le helper affichera "RAS".

### Configuration du Sélecteur de Dents

Vous pouvez désormais configurer les états possibles pour les dents directement dans le JSON du formulaire.

**Exemple de configuration :**

```json
{
  "type": "TeethSelector",
  "label": "Schéma Dentaire",
  "name": "schema_dentaire",
  "options": [
    { "value": "Normal", "label": "Sain", "color": "fill-base-300" },
    { "value": "Missing", "label": "Absent", "color": "fill-error" },
    { "value": "Caries", "label": "Cariée", "color": "fill-warning" },
    { "value": "Crown", "label": "Couronne", "color": "fill-primary" }
  ]
}
```

- `value`: La valeur stockée dans les données.
- `label`: Le texte affiché dans le menu déroulant.
- `color`: La classe CSS Tailwind pour la couleur de la dent (ex: `fill-red-500`, `fill-primary`).
