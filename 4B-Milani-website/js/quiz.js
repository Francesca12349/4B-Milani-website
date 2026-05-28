const domande = [
{
q: "cosa sono gli eSport?",
opzioni: ["competizioni organizzate di videogiochi aperte a tutti", "gruppi di persone che giovano ai videogiochi", "competizioni organizzate di videogiochi a livello professionistico", "competizioni organizzate di videogiochi di ogni tipo a livello professionistico"],
esatta: 2
},
{
q: "cos'è il gaiming Disorder?",
opzioni: ["malattia del comportamento", "un livello da raggiungere", "l'adrenalina", "un videogioco"],
esatta: 0
},
{
q: "qual'è la maggiore industria di intrattenimento?",
opzioni: ["l'industria cinematografica", "l'industria globale dei videogiochi", "l'industra musicale", "nessuna dei queste opzioni"],
esatta: 1
},
{
q: "cosa fa lo stato italiano per il gioco d'azzardo ?",
opzioni: ["niente", "lo tassano (attraverso l'agenzia delle dogane e dei monopoli)", "lo hanno vietato", "lo incitano"],
esatta: 1
},
{
q: "Cosa dice la scienza sulla relazione tra videogiochi violenti e aggressività reale?",
opzioni: ["Causano sempre violenza", "Non hanno effetti", "Possono desensibilizzare ma non c'è un legame causale diretto", "Rendono pacifici"],
esatta: 2
},
{
q: "cos'è il gioco d'azzardo?", 
opzioni: ["qualsiasi gioco in cui si scommette un valore economico su un esito certo, con la possibilità di vincere o perdere", "un pretesto per fre soldi facili", "qualsiasi gioco in cui si scommette un valore economico su un esito incerto, con la possibilità di vincere o perdere", "un tipo di videogioco"],
esatta: 2
},
{
q: "cosa sono le loot box ?",
opzioni: ["Contenitori virtuali acquistabili con premi casuali", "Le scatole fisiche dei CD", "I premi degli eSport", "I salvataggi"],
esatta: 0
},
{
q: "cosa significa la sigla GAP?",
opzioni: ["Gaming Altamente Professionale", "Gioco d'Azzardo Patologico", "Guida all'Acquisto Protetto", "Grande Associazione Psicologi"],
esatta: 1
},
{
q: "cos'è una skin?",
opzioni: ["dei codici", "oggetti virtuali scambiabili per denaro reale", "personaggio seondario", "nessuna delle risposte"],
esatta: 1
},
{
q: "In Italia, quale ente statale vigila e regolamenta il gioco d'azzardo?",
opzioni: ["AGCOM", "Istituto Superiore di Sanità", "ADM (Agenzia delle Dogane e dei Monopoli)", "Ministero dell'Istruzione"],
esatta: 2
}
];

let indiceDomanda = 0;
let punteggio = 0;
let rispostaData = false;

function mostraSchermata(idDaMostrare) {
document.getElementById('schermata-inizio').classList.add('nascondi');
document.getElementById('schermata-quiz').classList.add('nascondi');
document.getElementById('schermata-risultato').classList.add('nascondi');
document.getElementById(idDaMostrare).classList.remove('nascondi');
}

function iniziaQuiz() {
indiceDomanda = 0;
punteggio = 0;
mostraSchermata('schermata-quiz');
caricaDomanda();
}

function caricaDomanda() {
rispostaData = false;
document.getElementById('btn-avanti').disabled = true;
document.getElementById('feedback').classList.add('nascondi');

let d = domande[indiceDomanda];

document.getElementById('contatore').innerText = "Domanda " + (indiceDomanda + 1) + " di " + domande.length;
document.getElementById('testo-domanda').innerText = d.q;

let box = document.getElementById('box-opzioni');
box.innerHTML = "";

for (let i = 0; i < d.opzioni.length; i++) {
let p = document.createElement('p');
p.id = "opzione-" + i;
p.className = "w3-padding w3-border w3-round";
p.style.cursor = "pointer";

p.innerHTML = '<input class="w3-radio w3-margin-right" type="radio" name="scelta" value="' + i + '" onclick="controllaRisposta(' + i + ')"> ' + d.opzioni[i];
box.appendChild(p);
}
}

function controllaRisposta(indiceScelto) {
if (rispostaData) return; 
rispostaData = true;

let d = domande[indiceDomanda];
let feedback = document.getElementById('feedback');
feedback.classList.remove('nascondi', 'corretto', 'errato');

let radios = document.getElementsByName('scelta');
for(let r of radios) { r.disabled = true; }

if (indiceScelto === d.esatta) {
punteggio++;
document.getElementById("opzione-" + indiceScelto).classList.add('corretto');
feedback.innerText = "Esatto!";
feedback.className += " corretto";
} else {
document.getElementById("opzione-" + indiceScelto).classList.add('errato');
document.getElementById("opzione-" + d.esatta).classList.add('corretto');
feedback.innerText = "Errato. La risposta corretta era: " + d.opzioni[d.esatta];
feedback.className += " errato";
}

document.getElementById('btn-avanti').disabled = false;
}

function prossimaDomanda() {
indiceDomanda++;
if (indiceDomanda < domande.length) {
caricaDomanda();
} else {
document.getElementById('voto-finale').innerText = "Hai risposto correttamente a " + punteggio + " domande su " + domande.length + ".";
mostraSchermata('schermata-risultato');
}
}

function ricominciaQuiz() {
iniziaQuiz();
}