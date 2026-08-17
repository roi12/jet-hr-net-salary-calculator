# Documentazione del dominio RAL-netto Italia 2026

Questa cartella definisce le regole di dominio per un prototipo non ufficiale realizzato per la task tecnica Jet HR Product Builder.

Il prototipo stima il netto annuo e il netto mensile medio di un dipendente a partire dalla Retribuzione Annua Lorda (RAL) e spiega le principali trattenute e agevolazioni fiscali che portano dal lordo al netto.

È un riferimento di prodotto e ingegneria. Non costituisce consulenza legale, fiscale, paghe o contabile.

## Obiettivo di prodotto

Costruire uno stimatore annuale trasparente dal lordo al netto per uno scenario standard di dipendente italiano, in modo che utenti non specialisti possano:

- tradurre una RAL in una stima del netto annuo;
- tradurre quella stima annua in un netto mensile medio;
- esaminare le principali trattenute, imposte e agevolazioni che determinano il risultato;
- capire cosa il prototipo include, semplifica ed esclude.

## Persone

### Persona primaria

Un HR manager, recruiter o founder di una startup o PMI italiana che sta preparando o spiegando un'offerta di lavoro, ma non è uno specialista payroll.

### Persona secondaria

Un candidato o dipendente che vuole soprattutto capire il netto annuo e il netto mensile stimato.

## Casi d'uso principali

- Stimare il netto annuo associato a una RAL proposta.
- Spiegare come contributi previdenziali del dipendente, IRPEF e addizionali locali incidono sul netto percepito.
- Confrontare scenari di offerta a livello alto prima che un ufficio paghe o un consulente produca la simulazione ufficiale del cedolino.
- Produrre un esempio documentato che possa diventare in seguito una fixture per test di regressione.

## User story

“Come HR manager, recruiter o founder, voglio stimare il netto associato a una RAL e comprendere ogni trattenuta principale, così da poter preparare e spiegare un'offerta retributiva in modo trasparente.”

## Ambito del dominio

Questa documentazione copre una stima annuale standard per un dipendente del settore privato a Milano, in Lombardia, secondo le assunzioni elencate in [ASSUMPTIONS.md](./ASSUMPTIONS.md).

Incluso nell'ambito:

- Retribuzione Annua Lorda (RAL)
- Contributi previdenziali a carico del dipendente
- Reddito imponibile IRPEF
- IRPEF lorda
- Detrazione per lavoro dipendente
- Beneficio del cuneo fiscale, suddiviso in:
  - quota esente per i redditi più bassi;
  - detrazione aggiuntiva per le fasce superiori
- Addizionale regionale IRPEF della Lombardia
- Addizionale comunale IRPEF del Comune di Milano
- Netto annuo
- Netto mensile medio come media annuale

Fuori ambito:

- Costo azienda
- Contributi a carico del datore di lavoro
- TFR
- Simulazione payroll esatta mese per mese
- Regimi fiscali non standard
- Familiari a carico e detrazioni personali
- Altre fonti di reddito

Vedi [ASSUMPTIONS.md](./ASSUMPTIONS.md) per il perimetro completo.

## Sequenza di calcolo

Il modello di dominio segue questa sequenza annuale:

1. Retribuzione annua lorda
2. Contributi previdenziali del dipendente
3. Reddito imponibile IRPEF
4. IRPEF lorda
5. Detrazione per lavoro dipendente
6. Beneficio del cuneo fiscale
7. IRPEF netta
8. Addizionale regionale della Lombardia
9. Addizionale comunale di Milano
10. Netto annuo
11. Netto mensile medio

Quest'ordine è importante perché i passaggi successivi dipendono da quelli precedenti. In particolare:

- l'IRPEF usa l'imponibile dopo i contributi del dipendente;
- la detrazione per lavoro dipendente e le regole del cuneo fiscale usano soglie basate sul reddito;
- la quota esente del cuneo fiscale non coincide con una detrazione d'imposta;
- la cifra mensile è una media annua, non una promessa sul singolo cedolino.

## Mappa della documentazione

| File | Scopo |
| --- | --- |
| [README.md](./README.md) | Inquadramento di prodotto, ambito, gerarchia delle fonti e collegamento tra regole, implementazione e test |
| [GLOSSARY.md](./GLOSSARY.md) | Terminologia condivisa per discussioni di prodotto, design e ingegneria |
| [ASSUMPTIONS.md](./ASSUMPTIONS.md) | Scenario incluso, semplificazioni, esclusioni e decisioni ancora aperte |
| [RULE_CATALOG_2026.md](./RULE_CATALOG_2026.md) | Inventario delle regole del modello 2026 supportato da fonti |
| [EXAMPLE_RAL_35000.md](./EXAMPLE_RAL_35000.md) | Esempio svolto e futura fixture per test di regressione |

## Gerarchia delle fonti

Quando le fonti non concordano, il progetto usa questa gerarchia:

1. Legislazione italiana e regolamenti ufficiali
2. Agenzia delle Entrate
3. INPS
4. Regione Lombardia e Comune di Milano
5. Calcolatori secondari solo per confronto e sanity check

I calcolatori secondari non devono mai essere trattati come fonte di verità.

## Relazione tra regole, implementazione e test automatici

- Il catalogo delle regole è il contratto di dominio. Il codice applicativo deve implementare formule e limiti documentati in [RULE_CATALOG_2026.md](./RULE_CATALOG_2026.md), non logiche ad hoc.
- Il file delle assunzioni definisce cosa la prima implementazione può ignorare. Se una funzionalità è esclusa o ancora aperta, il codice non deve implementarla in modo implicito.
- L'esempio svolto in [EXAMPLE_RAL_35000.md](./EXAMPLE_RAL_35000.md) dovrebbe diventare una fixture di regressione dopo l'avvio della fase di implementazione.
- Ogni regola del catalogo elenca i test necessari su soglie, input non validi e continuità, così che i test automatici possano derivare direttamente dalla documentazione.

## Nota di validazione corrente

Per i redditi percepiti nell'anno fiscale `2026`, `IRPEF-001` è `Included` e `Confirmed`.

Le aliquote IRPEF confermate per il 2026 sono:

- `23%` fino a `EUR 28,000`
- `33%` oltre `EUR 28,000` e fino a `EUR 50,000`
- `43%` oltre `EUR 50,000`

Fonte normativa primaria:

- Legge n. `199` del `2025-12-30`, articolo `1`, comma `3`, che ha sostituito `35 per cento` con `33 per cento` nell'articolo `11`, comma `1`, lettera `b)` del TUIR per i redditi percepiti dal `2026-01-01`

L'interpretazione della fonte è importante:

- il `730/2026` riguarda principalmente i redditi percepiti nell'anno fiscale `2025`
- non è la fonte autoritativa per l'aliquota applicabile ai redditi percepiti nell'anno fiscale `2026`
