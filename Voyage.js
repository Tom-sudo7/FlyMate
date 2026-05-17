console.log('connecté');

// Le formulaire
const form = document.getElementById('form');

// Les champs
const depart = document.getElementById('Depart');
const arrive = document.getElementById('Arrive');
const start = document.getElementById('start');
const end = document.getElementById('end');

const listeResultats = document.querySelector('.liste-resultats');

// base de données
const voyages = [
    {
        pays : "paris",
        prix : 1630,
        voyageurs : 2
    },
    {
        pays : "hawai",
        prix : 1925,
        voyageurs : 4
    },
    {
        pays : "agadir",
        prix : 1090,
        voyageurs : 2
    },
    {
        pays : "mumbai",
        prix : 1550,
        voyageurs : 4
    },
    {
        pays : "new york",
        prix : 1490,
        voyageurs : 2
    },
    {
        pays : "bora-bora",
        prix : 1890,
        voyageurs : 5
    },
    {
        pays : "tahiti",
        prix : 1790,
        voyageurs : 4
    }
];

displayDetails();

form.addEventListener('submit', function(e){

    e.preventDefault();

    console.log('formulaire validé');

    const choix = {
        depart : depart.value,
        arrive : arrive.value,
        start : start.value,
        end : end.value
    };

    console.log(choix, "choix");

    const choixString = JSON.stringify(choix);

    localStorage.setItem('details', choixString);

    window.location.href = window.location.href;

});

function displayDetails(){

    if (localStorage.getItem('details')) {

        const choixObjet = JSON.parse(localStorage.getItem('details'));

        depart.value = choixObjet.depart;
        arrive.value = choixObjet.arrive;
        start.value = choixObjet.start;
        end.value = choixObjet.end;

        const resultats = voyages.filter(
            (voyage) =>
                voyage.pays === arrive.value
        );

        resultats.forEach((resultat) => {

            console.log(resultat, 'résultat');

            const item = `
                <div class="item">
                    <p class="item-pays">
                        ${resultat.pays}
                    </p>

                    <p>
                        offre pour ${resultat.voyageurs} personnes
                    </p>

                    <p>
                        prix du vol ${resultat.prix}€
                    </p>

                    <button onclick="window.location.href = 'https://www.google.com/search?q=${encodeURIComponent(depart.value + " " + arrive.value + " " + resultat.prix)}'">Go !</button>
                </div>
            `;

            listeResultats.innerHTML += item;

        });

    } else {

        console.log('pas de storage');

    }
}
