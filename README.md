![NUT UPS Card](https://raw.githubusercontent.com/HOMELAB-IA/ha-nut-ups-card/main/assets/banner.png)

# NUT UPS Card

Carte Lovelace custom pour Home Assistant affichant les onduleurs remontés par l'intégration **Network UPS Tools (NUT)**.

Testée avec un **APC Back-UPS** (HAOS) et un **Eaton 3S** (DAMU).

---

## Prérequis

| Prérequis | Version minimale | Remarque |
|---|---|---|
| Home Assistant | **2026.1.0** | Pour le Marketplace intégré |
| Intégration NUT | incluse dans HA | Doit être configurée et les entités visibles |
| Upload d'image dans l'éditeur | **2023.6** | Facultatif — uniquement si vous utilisez le bouton « Choisir une image » dans l'éditeur visuel |

> **Note sur les `entity_id` :** les suffixes NUT sont générés par HA dans la langue de l'interface au moment de la première configuration. Cette carte utilise les suffixes **français** par défaut. Si vos entités ont des noms différents (instance en anglais, renommage manuel…), utilisez `entities:` pour les surcharger une par une.

---

## Installation

### Via le Marketplace (HA ≥ 2026.11)

1. **Paramètres › Marketplace › Cartes**
2. Rechercher **NUT UPS Card**
3. Télécharger — la ressource est ajoutée automatiquement

> Le Marketplace installe le fichier JS dans `/local/community/nut-ups-card/`. Les images des onduleurs ne sont **pas** incluses dans ce fichier : voir la section [Images des onduleurs](#images-des-onduleurs) ci-dessous.

### Via HACS (HA 2024.1 – 2026.10)

1. HACS → ⋮ → Dépôts personnalisés → coller `HOMELAB-IA/ha-nut-ups-card` → catégorie **Lovelace**
2. Télécharger **NUT UPS Card**
3. Tableau de bord → ⋮ → Modifier → Gérer les ressources → Ajouter `/hacsfiles/nut-ups-card/nut-ups-card.js`

### Manuellement

1. Copier `dist/nut-ups-card.js` dans `config/www/`
2. Tableau de bord → ⋮ → Modifier → Gérer les ressources → Ajouter `/local/nut-ups-card.js`

---

## Images des onduleurs

Le champ `image:` de la configuration accepte trois formes :

**A. Upload via l'éditeur visuel (recommandé, HA ≥ 2023.6)**
Dans l'éditeur de carte, cliquer sur « Choisir une image » — le fichier est uploadé dans HA et l'URL est remplie automatiquement.

**B. URL distante (aucune action requise)**
```yaml
image: https://raw.githubusercontent.com/HOMELAB-IA/ha-nut-ups-card/main/assets/apc-back-ups.png
```
Nécessite qu'HA ait accès à internet.

**C. Fichier local**
Copier le PNG dans `config/www/` puis :
```yaml
image: /local/apc-back-ups.png
```
Les fichiers sources sont disponibles dans le dossier [`assets/`](assets/) du dépôt.

> Si `image:` est omis, la carte affiche une icône onduleur générique à la place.

---

## Configuration

```yaml
type: custom:nut-ups-card
name: APC HAOS          # obligatoire
prefix: myups           # obligatoire sauf si entities: est renseigné
model: Back-UPS 900G2   # sous-titre (optionnel, sinon ups.type)
image: /local/apc-back-ups.png  # image PNG transparent (optionnel)
accent: "#3ecf6e"       # couleur d'accent (défaut : vert)
load_alert: 85          # % — repère rouge sur la barre de charge (défaut : 85)
sections:
  input: open           # open | collapsed | hidden
  battery: open
  timers: collapsed
entities:               # surcharges optionnelles clé → entity_id
  outlet_1_desc: sensor.infra_myups_description_de_la_prise_powershare_outlet_1
```

### Éditeur visuel

L'éditeur intégré détecte automatiquement les appareils NUT dans votre instance HA.
Sélectionner un appareil dans le menu déroulant remplit le préfixe automatiquement.

### Préfixe des entités

Le préfixe correspond au nom de l'onduleur tel qu'il apparaît dans les `entity_id` NUT.
Exemple : si HA a créé `sensor.myups_charge_de_la_batterie`, le préfixe est `myups`.

> **Note :** les `entity_id` dépendent de la langue de HA au moment de la création des entités.
> Si vos entités ont des noms différents des suffixes par défaut (français), utilisez `entities:` pour les surcharger.

---

## Exemples complets

- [APC Back-UPS](examples/apc.yaml)
- [Eaton 3S](examples/eaton.yaml)
- [Cartes natives HA (sans HACS)](examples/native/)

---

## Fonctionnalités

- Charge batterie avec seuil de batterie faible
- Charge sortie avec puissance réelle ou estimée
- Entrée secteur ou tension de sortie avec barre de transfert
- Détails batterie : tension, chimie, date de fabrication, autotest, signal sonore
- Minuteries : délais d'arrêt/redémarrage, prises PowerShare (Eaton)
- Blocs repliables avec état mémorisé par carte
- Thème sombre et clair (variables CSS HA)
- Clic sur toute valeur → fiche de l'entité
- Pastille d'état NUT clignotante sur batterie (respecte `prefers-reduced-motion`)

## États NUT reconnus

| Code | Libellé |
|---|---|
| `OL` | En ligne |
| `OL CHRG` | En ligne · charge |
| `OB` | Sur batterie |
| `LB` | Batterie faible |
| `RB` | Batterie à remplacer |
| `BYPASS`, `OVER`, `TRIM`, `BOOST` | libellé traduit |

---

## Développement

```bash
npm install
npm run build      # → dist/nut-ups-card.js
npm test           # Vitest (22 tests)
npm run dev        # watch mode
```

## Licence

MIT — © 2026 Antoine HAUTIER
