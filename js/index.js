// ✅ 1) Generare il giusto numero di celle

// ✅ 2) Assegnare il nome del mese corretto nel titolo

// ✅ 3) Illuminare il giorno corrente

// ✅ 4) Rendere cliccabile una cella e visualizzarne il bordo

// ✅ 5) Rendere la selezione univoca (rimuovere il precedente bordo e applicarlo alla nuova cella cliccata

// ✅ 6) Modificare il meeting day contestualmente al click della cella

// _________________________________________________________________________________

// ✅ 7) Prendere il valore dell'orario e il testo dell'appuntamento

// ✅ 8) Salva il dato nella giusta posizione dell'array di appuntamenti e mostralo in fondo alla pagina

// ✅ 9) Dobbiamo poter selezionare altri giorni e inserire appuntamenti anche per loro

// ✅ 10) Se trovo degli appuntamenti nei successivi giorni cliccati, dovrebbero visualizzarsi

// ✅ EXTRA - la cella del giorno contenente appuntamenti dovrebbe dare un feedback della loro presenza (pallino con classe .dot)

// array globale che conterrà lo stesso numero di celle quante sono quelle generate nel calendario
// (vedi funzione createDays e suo for loop)
const appointments = [];
/* 
[
  [], [], [], [], [], [], [],
  [], [], [], [], [], [], [],
  [], [], [], [], [], [], [],
  [], [], [], [], [], [], [],
  [], [], [],
] 
*/

// creiamo un'istantanea della data odierna in modo dinamico che utilizzeremo in più punti nel codice
const now = new Date();

// questa funzione si occupa di estrarre dinamicamente il numero dell'ultimo giorno del mese
const daysInThisMonth = function () {
  const currentMonth = now.getMonth(); // estrazione dinamica dell'indice di mese corrente
  const currentYear = now.getFullYear(); // estrazione dinamica dell'anno corrente

  const lastDateOfThisMonth = new Date(currentYear, currentMonth + 1, 0); // Date Object
  const lastDayOfThisMonth = lastDateOfThisMonth.getDate(); // Number

  // ritorniamo dalla funzione un numero dell'ultimo giorno del mese
  return lastDayOfThisMonth;
};

// questa funzione si occupa di gestire il cambio del numero dentro all'elemento meetingDay
const changeDayNumber = function (num) {
  const dayNumberSpan = document.getElementById("newMeetingDay");

  dayNumberSpan.innerText = num;
  dayNumberSpan.className = "hasDay";
};

// questa funzione si occupa di cercare eventuali altri elementi precedentemente selezionati per poi rimuovergli la selezione
// (e permettere al nuovo elemento cliccato di selezionarsi ed essere l'unico selezionato in quel momento)
const unselectPreviousDay = function () {
  const previouslySelectedDay = document.querySelector(".day.selected");

  // se nella variabile riceviamo un null (quando non esiste un elemento con selected la prima volta)
  // allora non si procede,
  if (previouslySelectedDay !== null) {
    //  viceversa se nella variabile c'è un nodo del DOM allora si procede e lo si usa per rimuovergli la classe
    previouslySelectedDay.classList.remove("selected");
  }
};

const showAppointments = function (index) {
  // prendiamo i riferimenti dei nodi con cui lavoreremo
  const appointmentsContainer = document.getElementById("appointments");
  const ul = document.getElementById("appointmentsList");
  // svuotiamo preventivamente la lista per evitare dupplicati
  ul.innerHTML = "";

  // andiamo a SELEZIONARE la posizione interna dell'array appointments, con lo stesso numero di indice che ci eravamo passati da fuori
  const appointmentsOnSelectedDay = appointments[index]; // otteniamo un sotto-array del giorno interessato
  console.log("APPOINTMENTS OF TODAY", appointmentsOnSelectedDay);

  if (appointmentsOnSelectedDay.length > 0) {
    // se il sotto-array contiene degli elementi (stringhe di appuntamento)
    // allora il forEach eseguirà dei cicli, creando nuovi <li> e aggiungendoli dentro alla lista
    appointmentsOnSelectedDay.forEach(appointmentStr => {
      const newLi = document.createElement("li");
      newLi.innerText = appointmentStr;

      ul.appendChild(newLi);
    });

    // rendiamo visibile la sezione degli appuntamenti
    appointmentsContainer.style.display = "block";
  } else {
    // in caso di array di appuntamenti vuoto nascondiamo la sezione appuntamenti
    appointmentsContainer.style.display = "none";
  }
};

// 1) Generare il giusto numero di celle
const createDays = function (daysToGenerate) {
  const calendar = document.getElementById("calendar"); // prende il riferimento all'elemento calendario

  // daysToGenerate è il numero che ci siamo passati da fuori e ci darà il limite al for loop
  // alla data odierna contiene il numero 31, quindi il for farà 31 cicli
  for (let i = 0; i < daysToGenerate; i++) {
    appointments.push([]); // qui gestiamo la creazione dello stesso numero di sotto-array
    // nell'array appointments, da far corrispondere al singolo giorno del calendario

    // creiamo l'elemento cella composto da div esterno...
    const dayCell = document.createElement("div");
    dayCell.className = "day"; // applichiamo la classe al div

    // e h3 interno.
    const dayH3 = document.createElement("h3");
    dayH3.innerText = i + 1; // sfruttiamo la i (sommata di 1) per inserire un numero come testo nell'h3

    // gestiamo il giorno di oggi,
    const today = now.getDate(); // numero del giorno di oggi

    // valutando se l'elemento che verrà generato da questo ciclo è quello del giorno di oggi a calendario
    if (today === i + 1) {
      // e lo coloriamo di viola applicandogli la classe che dà il colore
      // 3) Illuminare il giorno corrente
      dayH3.classList.add("color-epic");
    }
    // 4) Rendere cliccabile una cella e visualizzarne il bordo
    // abbiamo dato l'abilità ad OGNI cella di fare delle operazioni nel momento del LORO click
    dayCell.onclick = function (event) {
      // 5) Rendere la selezione univoca
      unselectPreviousDay(); // gestiamo una EVENTUALE de-selezione di un precedente elemento con classe .selected
      event.currentTarget.classList.add("selected"); // aggiunge un bordo alla cella appena cliccata

      // 6) Modificare il meeting day contestualmente al click della cella
      // andiamo anche ad operare il cambio di contenuto dello span del meetingDay
      // ci inseriamo il valore corrispondente a i + 1 (es. 18 se clicco la cella con num 18)
      changeDayNumber(i + 1);
      // 9) Dobbiamo poter selezionare altri giorni e inserire appuntamenti anche per loro ==> (è la conseguenza del cambio numero che permette questo)

      // 10) Se trovo degli appuntamenti nei successivi giorni cliccati, dovrebbero visualizzarsi
      showAppointments(i);
    };

    // andiamo ad inserire l'h3 nel div
    dayCell.appendChild(dayH3);
    // inseriamo il div nel calendario
    calendar.appendChild(dayCell);
  }
};

// 2) Assegnare il nome del mese corretto nel titolo
const printMonth = function () {
  const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

  const monthIndex = now.getMonth(); // numero da 0-11

  const currentMonthStr = months[monthIndex];

  const h1 = document.querySelector("h1");

  h1.innerText = currentMonthStr;
};

// EXTRA - la cella del giorno contenente appuntamenti dovrebbe dare un feedback della loro presenza (pallino con classe .dot)
const applyDot = function () {
  const selectedCell = document.querySelector(".day.selected");

  const dot = document.createElement("span");
  dot.className = "dot";

  selectedCell.appendChild(dot);
};

// 7) Prendere il valore dell'orario e il testo dell'appuntamento
const saveMeeting = function (e) {
  e.preventDefault();

  // prendiamo i riferimenti ai nodi dei due campi input (sono dei nodi salvati nelle variabili)
  const meetingTime = document.getElementById("newMeetingTime");
  const meetingName = document.getElementById("newMeetingName");
  // riferimento all'elemento span (con il numero della cella inserito dentro)
  const dayNumberSpan = document.getElementById("newMeetingDay");

  // dobbiamo estrarre il .value e comporre una nuova stringa
  const meetingText = meetingTime.value + " — " + meetingName.value;

  // facciamo un controllo preventivo nell'avere il numero dentro a meetingDay prima procedere
  // senza quel numero NON possiamo selezionare la giusta posizione dell'array appointments
  if (dayNumberSpan.innerText !== "Click on a Day") {
    const dayIndex = parseInt(dayNumberSpan.innerText) - 1; // trasformo il numero in base 0 per usarlo come indice

    // sfruttiamo l'indice per selezionare una posizione dell'array appointments (che è speculare al nostro calendario)
    // otteniamo il sotto-array corrispondente al giorno cliccato
    // 8) Salva il dato nella giusta posizione dell'array di appuntamenti
    appointments[dayIndex].push(meetingText); // inseriamo il nuovo elemento

    // svotiamo i campi per prepararli ad un eventuale nuovo inserimento da parte dell'utente
    meetingTime.value = "";
    meetingName.value = "";

    // durante il salvataggio decidiamo se e quando ha senso inserire il nostro dot (span interno alla cella)
    // per evitare dupplicati controlliamo che la length sia esattamente 1, così da creare un singolo dot dopo il primo inserimento soltanto
    if (appointments[dayIndex].length === 1) {
      applyDot();
    }
    // 8b) ...e mostralo in fondo alla pagina
    // selezioniamo con lo stesso indice la posizione dell'array che ci dà il sotto-array aggiornato
    showAppointments(dayIndex);
  } else {
    alert("Devi selezionare un giorno in calendario prima di procedere");
  }
};

// 👇👇👇 Punto di ingresso dell'applicazione
window.addEventListener("DOMContentLoaded", function () {
  // qui dentro siamo sicuri che il DOM si sia generato

  // estraiamo il giusto numero di giorni per le quali creeremo delle celle
  const numOfDays = daysInThisMonth();

  // passiamo questo numero alla funzione createDays che concretamente andrà a crearle
  createDays(numOfDays);
  printMonth();

  // GESTIONE DEL FORM
  const form = document.getElementById("appointment-form");
  // associamo una funzione che verrà eseguita SE il form sarà VALIDO e SE il bottone verrà cliccato
  form.onsubmit = saveMeeting;

  console.log("appointments", appointments);
});
