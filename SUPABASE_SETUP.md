# Configuration Supabase

## Étapes pour connecter votre application à Supabase

### 1. Créer un projet Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Créez un nouveau projet
4. Notez votre **Project URL** et votre **anon/public key**

### 2. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```
VITE_SUPABASE_URL=votre_url_du_projet_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

**Important :** Remplacez `votre_url_du_projet_supabase` et `votre_clé_anon_supabase` par vos vraies valeurs depuis le dashboard Supabase.

### 3. Où trouver vos clés Supabase

1. Dans votre projet Supabase, allez dans **Settings** (Paramètres)
2. Cliquez sur **API**
3. Vous trouverez :
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### 4. Activer l'authentification par email

1. Dans Supabase, allez dans **Authentication** > **Providers**
2. Activez **Email** provider
3. Configurez les paramètres selon vos besoins (email confirmation, etc.)

### 5. Redémarrer le serveur de développement

Après avoir créé le fichier `.env`, redémarrez votre serveur :

```bash
npm run dev
```

## Fonctionnalités implémentées

- ✅ Inscription (Sign Up)
- ✅ Connexion (Login)
- ✅ Réinitialisation de mot de passe (Forgot Password)
- ✅ Gestion de session utilisateur
- ✅ Protection des routes (à implémenter si nécessaire)

## Notes

- Le fichier `.env` ne doit **jamais** être commité dans Git
- Utilisez `.env.example` comme modèle (si vous le créez)
- Les variables d'environnement doivent commencer par `VITE_` pour être accessibles dans Vite

