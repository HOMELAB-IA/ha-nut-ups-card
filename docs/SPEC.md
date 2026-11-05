# SPEC — `custom:nut-ups-card`

## 1. Principe
Une carte unique qui s'adapte aux entités disponibles. Les entités sont résolues par
**clé logique** (cf. `ENTITIES.md`) : `sensor.<prefix>_<suffixe_par_défaut>`, surchargeables une par une.

## 2. Configuration
```yaml
type: custom:nut-ups-card
name: APC                      # titre (obligatoire)
model: Back-UPS                # sous-titre ; défaut = état de la clé `ups_type` si dispo
image: /local/apc-back-ups.png # PNG transparent conseillé ; optionnel
prefix: myups                  # préfixe des entity_id NUT
accent: "#3ecf6e"              # couleur d'accent (état OK, barre batterie)
load_alert: 85                 # % — repère rouge sur la barre de charge
sections:                      # ouvert/replié par défaut
  input: open                  # open | collapsed | hidden
  battery: open
  timers: collapsed
entities:                      # surcharges optionnelles clé → entity_id
  outlet_1_desc: sensor.infra_myups_description_de_la_prise_powershare_outlet_1
```
Validation : `name` requis ; `prefix` OU `entities` requis. Erreur → `throw new Error()` dans `setConfig`.

## 3. Structure visuelle (de haut en bas)
Référence pixel : `design/apc.dc.html` (APC) et `design/eaton.dc.html` (Eaton). Largeur maquette 440 px de carte.

| Bloc | Contenu | Repliable |
|---|---|---|
| **En-tête** | Grille `210px 1fr`. Gauche : image (contain, ~200 px de haut). Droite, aligné à droite : pastille d'état (point couleur + libellé + code NUT en mono), `name` 30 px bold, `model` 14 px gris, « Autonomie » + valeur 26 px bold couleur d'accent, en minutes. | non |
| **Charge de la batterie** | Titre + `NN %` 22 px. Barre 10 px, remplissage dégradé `accent 40% → accent`, repère rouge vertical au seuil `battery_low_pct`. Légende : `0 %` · `Seuil faible N %` · `100 %`. | non |
| **Charge (sortie)** | Titre + `NN %` + `· NNN W` (réel si `power_real`, sinon `≈` estimé = `load% × power_nominal`). Barre dégradé `#2563c9 → #4aa3ff`, repère rouge à `load_alert`. Légende droite : `Nominale N W/VA`. | non |
| **Entrée secteur** *ou* **Sortie** | Si `input_voltage` existe → « Entrée secteur » avec cette tension ; sinon si `output_voltage` → « Sortie ». Valeur 22 px dans l'en-tête de bloc + chevron. Barre dégradé `#c9761a → #f5b84a`, échelle = [`transfer_low`, `transfer_high`], repère blanc à la tension nominale. Pied : sensibilité d'entrée (APC) ou fréquence nominale (Eaton). | oui |
| **Batterie** | En-tête : tension batterie `/ nominale` si dispo, sinon chimie. Grille 2 colonnes : autonomie batterie faible, chimie, date de fabrication, résultat autotest, signal sonore — chaque champ seulement s'il existe. | oui |
| **Minuteries** (APC) / **Prises & minuteries** (Eaton) | Description prise PowerShare (pleine largeur), délai d'arrêt onduleur, délai de redémarrage, minuterie démarrage/arrêt/redémarrage charge. Valeur `-1` → « inactive ». | oui |

Blocs : fond `linear-gradient(160deg,#2b2e35,#212328)`, rayon 12, padding 16, gap 16 entre blocs.
Carte : `linear-gradient(180deg,#22242a,#18191d)`, rayon 16, bordure `#2a2c31`.
**Thème** : en v0.1 ces couleurs sont des variables CSS (`--nut-card-bg`, `--nut-block-bg`, `--nut-text`,
`--nut-text-secondary`, `--nut-track`) avec fallback sur les variables HA (`--ha-card-background`,
`--primary-text-color`, `--secondary-text-color`, `--divider-color`) pour que le thème clair reste lisible.
Police : héritée de HA (pas de Google Fonts).

## 4. État NUT (`ups.status`, clé `status_code`)
| Flags | Libellé | Couleur pastille |
|---|---|---|
| `OL` | En ligne | accent |
| `OL CHRG` | En ligne · charge | accent |
| `OB` | Sur batterie | `#f5b84a` |
| `LB` (avec ou sans OB) | Batterie faible | `#ff6b5b` |
| `RB` | Batterie à remplacer | `#ff6b5b` |
| `BYPASS`, `OVER`, `TRIM`, `BOOST` | libellé brut traduit | `#f5b84a` |
| autre / indisponible | valeur brute / « Indisponible » | gris |

Hors secteur (OB/LB) : la pastille clignote doucement (respecter `prefers-reduced-motion`).
Le libellé affiché préfère l'état de la clé `status` (déjà traduit par HA) ; le code brut va en mono à côté.

## 5. Formatage
- Autonomie (`battery_runtime`, en secondes) → `N min` ; ≥ 3600 s → `H h MM`.
- Tensions : 0 décimale pour le secteur, 1 décimale pour la batterie.
- Unités prises dans `attributes.unit_of_measurement` quand présentes.
- Clic sur toute valeur → event `hass-more-info` `{ entityId }`.

## 6. Hors périmètre v0.1
Actions (test batterie, coupure bip) via `nut.*` services ; éditeur visuel complet ; graphiques historiques.
