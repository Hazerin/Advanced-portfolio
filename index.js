let isModalOpen = false;
let contrastToggle = false;

/* Meglio dare un nome alle costanti e parametrizzarle per un codice più leggibile */
const scaleFactor = 1 / 20;

function moveBackground(event) {
  /* Seleziona tutti gli elementi che corrispondono alla richiesta */
  /* Crea un array di shapes prendendole nell'ordine in cui le ho elecante dall'HTML
  perchè va dall'alto al basso come mi aspetterei. */
  const shapes = document.querySelectorAll(".shape");
  /* I metodi clientX e clientY ritornano le posizioni X e Y del puntatore del mouse. */
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
  }
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme";
  }
  else {
    document.body.classList.remove("dark-theme")
  }
}

function contact(event) {
  /* Annulla le azioni di default, che una volta che si effettua un submit
    la pagina verrebbe ricaricata. */
  event.preventDefault();
  /* Service ID, template ID, event.target (il parametro in ingresso nella funzione)
    e la public key come parametri per il metodo della classe emailjs che invochiamo.
    Questa funzione è anche una promise perchè devo aspettare una risposta da un altro server!
    (Sto usando delle API, quindi è necessario il .then). */
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";

  /* Il catch avviene automaticamente se la promise non viene mantenuta. */

  emailjs
    .sendForm(
      "service_pknape4",
      "template_b7b7w38",
      event.target,
      "RY5gJ0T1jlqK0Gg22"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavable. Please contact me directly on alby91v@gmail.com"
      );
    });
}

/* Per far apparire la finestra delle info / contatti la miglior pratica è bersagliare
il "body" dell'HTML. */

/* Per fare in modo che la scomparsa graficamente non sia orribile bisogna mettere
una transition nel CSS della classe modal per tutti i parametri che compaiono nella
sua versione aperta (che la fa diventare visibile) oppure semplicemente il
classico all (tempo) (curva bezier a scelta) */

function toggleModal() {
    if (isModalOpen) {
        document.body.classList.remove("modal--open");
        return isModalOpen = false;
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
}