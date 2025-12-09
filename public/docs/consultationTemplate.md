# Documentation Template de Consultation

## Aperçu

Ce document explique comment créer des templates de texte pour générer des résumés de consultation à partir des données du formulaire. Le système utilise Handlebars pour le templating.

## Helpers Disponibles

Voici la liste des helpers personnalisés disponibles pour la logique dans vos templates.

### Comparaisons

#### `ifEgal`

Vérifie si deux valeurs sont égales.

```handlebars
{{#ifEgal sexe "homme"}}
  Le patient...
{{else}}
  La patiente...
{{/ifEgal}}
```

#### `ifNotEgal`

Vérifie si deux valeurs sont différentes.

```handlebars
{{#ifNotEgal tabac "non"}}
  Fumeur :
  {{tabac}}
{{/ifNotEgal}}
```

#### `ifIn`

Vérifie si une valeur est présente dans une liste (utile pour les Checkboxes multiples ou tableaux).

```handlebars
{{#ifIn "diabete" antecedents}}
  Patient diabétique.
{{/ifIn}}
```

#### `ifNotIn`

Vérifie si une valeur n'est PAS présente dans une liste.

```handlebars
{{#ifNotIn "aucun" symptomes}}
  Symptômes rapportés : ...
{{/ifNotIn}}
```

### Formatage de Texte

#### `maj`

Met la première lettre d'une chaîne en majuscule.

```handlebars
{{maj nom}}
```

#### `formatDate`

Formate une date ISO (YYYY-MM-DD) en format français (DD/MM/YYYY).

```handlebars
Date de consultation : {{formatDate date_consultation}}
```

### Utilitaires Tableaux et Objets

#### `join`

Joint les éléments d'un tableau avec un séparateur.

```handlebars
Antécédents : {{join antecedents ", "}}
```

#### `len`

Retourne la longueur d'un tableau ou d'une chaîne.

```handlebars
{{#if (len commentaires)}}
  Commentaires :
  {{commentaires}}
{{/if}}
```

#### `get`

Accède à une propriété d'un objet dynamiquement.

```handlebars
{{get user "name"}}
```

#### `default`

Fournit une valeur par défaut si la valeur principale est vide ou nulle.

```handlebars
{{default observation "Aucune observation"}}
```

## Structure du Template

Le template est un fichier texte simple qui peut contenir des balises Handlebars `{{ }}`.

### Exemple Complet

```handlebars
Compte rendu de consultation Date :
{{formatDate date_consultation}}

Patient :
{{maj nom}}
{{maj prenom}}
Né(e) le :
{{formatDate date_naissance}}

{{#ifEgal sexe "homme"}}Il{{else}}Elle{{/ifEgal}}
se présente pour :
{{motif_consultation}}. Antécédents :
{{#if antecedents}}
  {{join antecedents ", "}}
{{else}}
  Aucun antécédent notable.
{{/if}}

Examen clinique :
{{#ifEgal ouverture_buccale "limitee"}}
  Ouverture buccale limitée à
  {{ouverture_mm}}
  mm.
{{else}}
  Ouverture buccale normale.
{{/ifEgal}}

Conclusion :
{{conclusion}}
```

## Utilisation des Données du Formulaire

Les noms de variables utilisés dans le template (ex: `{{nom}}`, `{{sexe}}`) doivent correspondre exactement à la propriété `name` définie dans le fichier JSON du formulaire.

Pour les champs imbriqués (comme dans `RevealRadio`), les données sont accessibles directement au niveau racine si le formulaire est plat, ou selon la structure de votre objet de données.
