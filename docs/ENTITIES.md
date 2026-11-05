# Clés logiques ↔ entités

Suffixes par défaut = noms générés par l'intégration NUT d'HA **en français** (`sensor.<prefix>_<suffixe>`).
Variable NUT indiquée pour référence. ✔ = entité présente sur l'onduleur.

| Clé | Suffixe par défaut | Variable NUT | APC | Eaton |
|---|---|---|---|---|
| `status` | `etat` | ups.status (traduit) | ✔ | ✔ |
| `status_code` | `code_d_etat` | ups.status | ✔ | ✔ |
| `ups_type` | `type_d_ups` | ups.type | | ✔ |
| `battery_charge` | `charge_de_la_batterie` | battery.charge | ✔ | ✔ |
| `battery_low_pct` | `consigne_de_batterie_faible` | battery.charge.low | ✔ | ✔ |
| `battery_runtime` | `autonomie_de_la_batterie` | battery.runtime | ✔ | ✔ |
| `battery_runtime_low` | `autonomie_de_la_batterie_faible` | battery.runtime.low | ✔ | |
| `battery_voltage` | `tension_de_la_batterie` | battery.voltage | ✔ | |
| `battery_voltage_nominal` | `tension_nominale_de_la_batterie` | battery.voltage.nominal | ✔ | |
| `battery_chemistry` | `chimie_de_la_batterie` | battery.type | ✔ | ✔ |
| `battery_mfr_date` | `date_de_fabrication_de_la_batterie` | battery.mfr.date | ✔ | |
| `self_test` | `resultat_de_l_autotest` | ups.test.result | ✔ | |
| `beeper` | `etat_du_signal_sonore` | ups.beeper.status | ✔ | ✔ |
| `load` | `charge` | ups.load | ✔ | ✔ |
| `power_real` | `puissance_reelle_actuelle` | ups.realpower | | ✔ |
| `power_nominal` | `puissance_reelle_nominale` → fallback `puissance_nominale` | ups.realpower.nominal / ups.power.nominal | ✔ (W) | ✔ (VA) |
| `input_voltage` | `tension_d_entree` | input.voltage | ✔ | |
| `input_voltage_nominal` | `tension_d_entree_nominale` | input.voltage.nominal | ✔ | |
| `input_sensitivity` | `sensibilite_de_la_puissance_d_entree` | input.sensitivity | ✔ | |
| `transfer_low` | `transfert_tension_basse` | input.transfer.low | ✔ | ✔ |
| `transfer_high` | `transfert_tension_haute` | input.transfer.high | ✔ | ✔ |
| `output_voltage` | `tension_de_sortie` | output.voltage | | ✔ |
| `output_voltage_nominal` | `tension_de_sortie_nominale` | output.voltage.nominal | | ✔ |
| `output_frequency_nominal` | `frequence_de_sortie_nominale` | output.frequency.nominal | | ✔ |
| `shutdown_delay` | `delai_d_arret_de_l_onduleur` | ups.delay.shutdown | ✔ | ✔ |
| `restart_delay` | `charger_le_delai_de_redemarrage` | ups.delay.start | | ✔ |
| `load_off_timer` | `minuterie_d_arret_de_la_charge` | ups.timer.shutdown | ✔ | ✔ |
| `load_on_timer` | `minuterie_de_demarrage_de_la_charge` | ups.timer.start | | ✔ |
| `load_restart_timer` | `minuterie_de_redemarrage_de_la_charge` | ups.timer.reboot | ✔ | |
| `outlet_1_desc` | `description_de_la_prise_powershare_outlet_1` | outlet.1.desc | | ✔ (préfixe `infra_myups`) |

Notes :
- `power_nominal` : essayer les deux suffixes dans l'ordre ; l'unité vient de l'attribut.
- Pour la tension nominale de la barre « Sortie » (Eaton), utiliser `output_voltage_nominal`, sinon `input_voltage_nominal`.
- Les entity_id dépendent de la langue d'HA au moment de la création : l'override `entities:` est le filet de sécurité. Documenter ça dans le README.

## ⚠️ Collision de préfixe à signaler à Antoine
Les listes APC et Eaton fournies utilisent toutes deux le préfixe `myups_`. Deux appareils NUT dans la même
instance HA ne peuvent pas partager ces entity_id : vérifier dans *Paramètres › Appareils* le vrai préfixe de
chaque onduleur avant de figer `examples/eaton.yaml` (placeholder `prefix: eaton` + commentaire en attendant).
