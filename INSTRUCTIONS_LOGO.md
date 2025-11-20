# Instructions pour ajouter le logo Edumate

## Étape 1: Placer votre image du logo

Placez votre image du logo dans le dossier `public/` à la racine du projet.

**Nom du fichier:** `logo.png` (ou `logo.jpg`, `logo.svg`, etc.)

**Chemin complet:** `public/logo.png`

## Étape 2: Modifier le nom du fichier si nécessaire

Si votre image a un nom différent, ouvrez le fichier `src/components/Logo.jsx` et modifiez la ligne:

```jsx
const logoImage = '/logo.png'  // Changez 'logo.png' par le nom de votre fichier
```

Par exemple:
- Si votre fichier s'appelle `edumate-logo.png` → `const logoImage = '/edumate-logo.png'`
- Si votre fichier s'appelle `logo.jpg` → `const logoImage = '/logo.jpg'`
- Si votre fichier s'appelle `logo.svg` → `const logoImage = '/logo.svg'`

## Étape 3: Vérifier

Le logo devrait maintenant s'afficher dans la sidebar de votre application.

## Note

Les images dans le dossier `public/` sont accessibles directement via le chemin `/nom-du-fichier`.


