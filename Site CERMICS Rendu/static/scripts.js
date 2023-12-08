const equipes = [
    "Real Madrid", "Paris Saint-Germain",
    "Manchester City", "Sporting CP",
    "Bayern Munich", "Salzburg",
    "Liverpool", "Inter Milan",
    "Chelsea", "Lille",
    "Manchester United", "Atletico Madrid",
    "Villarreal", "Juventus",
    "Ajax", "Benfica"
    ];

const groupe1 = [
    "Real Madrid", "Paris Saint-Germain",
    "Manchester City", "Sporting CP",
    "Bayern Munich", "Salzburg",
    "Liverpool", "Inter Milan",
];

const groupe2 = [
    "Chelsea", "Lille",
    "Manchester United", "Atletico Madrid",
    "Villarreal", "Juventus",
    "Ajax", "Benfica",
];

const fakeProbabilities = [];
for(let m=0; m<8; m++){
    fakeProbabilities.push([]);
    for(let n=0; n<8;n++){
        fakeProbabilities[m].push(12.5);
    }
}
var clock = document.createElement("div");
clock.classList.add("animation");
var animation1 = clock.animate(
    [{ backgroundPosition: '200% 0' }, { backgroundPosition: '-200% 0' }],
    {
      duration: 4000,
      iterations: Infinity
    }
  );

var selectedTeams = [];   // Variable globale très dangereuse !!
var opponentTeams = [];

function displayProbability(){ // Probabilités avant toute sélection
    for(let k=0; k<8;k++){
        if(k<Math.floor(selectedTeams.length/2)){
            document.getElementById('p'+k).textContent = (fakeProbabilities[groupe1.indexOf(selectedTeams[2*k])][groupe2.indexOf(selectedTeams[2*k+1])]).toString()+'%';
        }
        else{
            document.getElementById('p'+k).textContent = '';
        }
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function handleClickTable(){
    for(let i=0; i<groupe1.length;i++){
        const c1 = document.getElementById("l0c"+(i+1));
        const c2 = document.getElementById("l"+(i+1)+"c0");
        if(selectedTeams.length%2==0){
            if(selectedTeams.includes(groupe1[i])){
                c1.classList.remove('pointer');
                c1.classList.add('pointer-events');
            }
            else{
                c1.classList.remove('pointer-events');
                c1.classList.add('pointer');
            }
            c2.classList.remove('pointer');
            c2.classList.add('pointer-events');
        }
        else{
            if(selectedTeams.includes(groupe2[i])){
                c2.classList.remove('pointer');
                c2.classList.add('pointer-events');
            }
            else{
                c2.classList.remove('pointer-events');
                c2.classList.add('pointer');
            }
            c1.classList.remove('pointer');
            c1.classList.add('pointer-events');

        }
    }
}

// Affichage du tirage des 8èmes de finale dans la page HTML
const drawElement = document.getElementById("draw");
for(let k=0; k<8;k++){
    const matchElement = document.createElement("div");
    const lineElement = document.createElement("div");
    matchElement.classList.add("medium-box");
    const probaElement = document.createElement("div");
    probaElement.classList.add("probability-box");
    probaElement.textContent = '';
    const middle = document.createElement("div");
    middle.classList.add("little-middle-box");
    lineElement.classList.add("line-box");
    lineElement.classList.add("disabled");
    probaElement.setAttribute('id', 'p'+k);
    middle.appendChild(probaElement);
    middle.appendChild(lineElement);
    const teamElement1 = document.createElement("div");
    const teamElement2 = document.createElement("div");
    teamElement1.classList.add("little-left-box");
    teamElement2.classList.add("little-right-box");
    teamElement1.classList.add("disabled");
    teamElement2.classList.add("disabled");
    teamElement1.setAttribute('id', (2*k).toString());
    teamElement2.setAttribute('id', (2*k+1).toString());
    teamElement1.textContent = '';
    teamElement2.textContent = '';
    matchElement.appendChild(teamElement1);
    matchElement.appendChild(middle);
    matchElement.appendChild(teamElement2);
    drawElement.appendChild(matchElement);
}

document.addEventListener('DOMContentLoaded', function() {

    // Fonction pour sélectionner une variable aléatoire
    function selectionnerVariableAleatoire() {
        if(selectedTeams.length % 2 == 0){
            do{
                var indiceAleatoire = Math.floor(Math.random() * 8);
            }while(selectedTeams.includes(groupe1[indiceAleatoire]));
            return groupe1[indiceAleatoire];
        }
        else{
            do{
                var indiceAleatoire = Math.floor(Math.random() * 8);
            }while(selectedTeams.includes(groupe2[indiceAleatoire]));
            return groupe2[indiceAleatoire];
        }
    }

    // Fills the 'opponentTeams' array with all possible opponents of the last selected team (two cases : new match, the possible opponents are all still-not-selected teams of group 1 ; first team of the current match already selected, we choose the possible opponents in group 2)
    function defineOpponents(selectedTeam) {
        if(selectedTeams.length % 2 == 0){
            groupe1.forEach((elem) => {if(!(selectedTeams.includes(elem))){opponentTeams.push(elem);}});
        }
        else{
            // Traitement supplémentaire nécessaire
            groupe2.forEach((elem) => {if(!(selectedTeams.includes(elem))){opponentTeams.push(elem);}});
        }
    }

    function toggleOverlay() {
        // Get the overlay element
        var overlay = document.getElementById('overlay');
      
        // Toggle the 'hidden' class to show/hide the overlay
        overlay.classList.toggle('hidden');
      }

    // Function to handle the display of the possible opponents given the last selected team
    function handleOpponents(selectedVar) {
        opponentTeams = [];
        removeAllChildNodes(document.getElementById('second-choice'));
        defineOpponents(selectedVar);
        opponentTeams.forEach((elem) => {const teamButton = document.createElement('button');
        teamButton.classList.add('boutonDeFonctionnalite');
        teamButton.classList.add('pointer');
        teamButton.classList.add('margin'); 
        teamButton.textContent = elem;
        document.getElementById('second-choice').appendChild(teamButton);

        // When the new button is pressed, we make it add the related team to the 'selectedTeams' array and handle the display
        teamButton.addEventListener('click', function() {

            // Afficher la variable dans le rendu HTML
            document.getElementById((selectedTeams.length).toString()).textContent = elem;
            document.getElementById((selectedTeams.length).toString()).classList.remove("disabled");
            document.getElementById((selectedTeams.length).toString()).classList.add("animation");
            if(selectedTeams.length>0){
                document.getElementById((selectedTeams.length).toString()-1).classList.remove("animation");
            }
            selectedTeams.push(elem);
            handleClickTable();
            displayProbability();
            handleOpponents(elem);
            fillTable();

            if(selectedTeams.length == 16){
                document.getElementById('selectRandomTeam').classList.remove('pointer');
                document.getElementById('selectRandomTeam').classList.add('disabled-button');
            }
            if(selectedTeams.length == 1){
                document.getElementById('removeTeam').classList.remove('disabled-button');
                document.getElementById('removeTeam').classList.add('pointer');
                document.getElementById('reset').classList.remove('disabled-button');
                document.getElementById('reset').classList.add('pointer');
            }
        });
        });
            
    }

    handleOpponents(equipes[0]);

    // Create table
for(let i=0; i<=groupe1.length;i++){
    const newLine = document.createElement("tr");
    newLine.setAttribute("id", 'l'+i);
    for(let j=0; j<=groupe2.length; j++){
        if(i==0 || j==0){
            const newCell = document.createElement("th");
            if(i>0){
                newCell.textContent = groupe2[i-1];
                newCell.classList.add('pointer');
                newCell.addEventListener('click', function() {
                    // Afficher la variable dans le rendu HTML
                    document.getElementById((selectedTeams.length).toString()).textContent = newCell.textContent;
                    document.getElementById((selectedTeams.length).toString()).classList.remove("disabled");
                    document.getElementById((selectedTeams.length).toString()).classList.add("animation");
                    if(selectedTeams.length>0){
                        document.getElementById((selectedTeams.length).toString()-1).classList.remove("animation");
                    }
                    selectedTeams.push(newCell.textContent);
                    displayProbability();
                    handleOpponents(newCell.textContent);
                    fillTable(); 
                    handleClickTable();
                    if(selectedTeams.length == 16){
                        document.getElementById('selectRandomTeam').classList.remove('pointer');
                        document.getElementById('selectRandomTeam').classList.add('disabled-button');
                    }
                    if(selectedTeams.length == 1){
                        document.getElementById('removeTeam').classList.remove('disabled-button');
                        document.getElementById('removeTeam').classList.add('pointer');
                        document.getElementById('reset').classList.remove('disabled-button');
                        document.getElementById('reset').classList.add('pointer');
                    }
                  });
            }
            else if(j>0){
                newCell.textContent = groupe1[j-1];
                newCell.classList.add('pointer');
                newCell.addEventListener('click', function() {
                    // Afficher la variable dans le rendu HTML
                    document.getElementById((selectedTeams.length).toString()).textContent = newCell.textContent;
                    document.getElementById((selectedTeams.length).toString()).classList.remove("disabled");
                    document.getElementById((selectedTeams.length).toString()).classList.add("animation");
                    if(selectedTeams.length>0){
                        document.getElementById((selectedTeams.length).toString()-1).classList.remove("animation");
                    }
                    selectedTeams.push(newCell.textContent);
                    displayProbability();
                    handleOpponents(newCell.textContent);
                    fillTable(); 
                    handleClickTable();
                    if(selectedTeams.length == 16){
                        document.getElementById('selectRandomTeam').classList.remove('pointer');
                        document.getElementById('selectRandomTeam').classList.add('disabled-button');
                    }
                    if(selectedTeams.length == 1){
                        document.getElementById('removeTeam').classList.remove('disabled-button');
                        document.getElementById('removeTeam').classList.add('pointer');
                        document.getElementById('reset').classList.remove('disabled-button');
                        document.getElementById('reset').classList.add('pointer');
                    }
                  });
            }
            newCell.setAttribute("id",'l'+i+'c'+j);
            newLine.appendChild(newCell);
        }
        else{
            const newCell = document.createElement("td");
            newCell.setAttribute("id",'l'+i+'c'+j);
            newLine.appendChild(newCell);
        }
    }
    document.getElementById("overlay").appendChild(newLine);
}

function fillTable(){
    for(let i=0; i<groupe1.length;i++){
        for(let j=0; j<groupe2.length;j++){
            document.getElementById('l'+(i+1)+'c'+(j+1)).textContent = fakeProbabilities[i][j] + '%';
            document.getElementById('l'+(i+1)+'c'+(j+1)).style.backgroundColor = 'rgb('+((255/100)*parseFloat(document.getElementById('l'+(i+1)+'c'+(j+1)).textContent))+', 0, 0)';
        }
    }
}
handleClickTable();
fillTable();

    // Gestionnaire d'événement pour le clic sur le bouton < Select Random Team >
    document.getElementById('selectRandomTeam').addEventListener('click', function() {
        if(selectedTeams.length < 16){
            var variableSelectionnee = selectionnerVariableAleatoire();
            

            // Afficher la variable dans le rendu HTML
            document.getElementById((selectedTeams.length).toString()).textContent = variableSelectionnee;
            document.getElementById((selectedTeams.length).toString()).classList.remove("disabled");
            document.getElementById((selectedTeams.length).toString()).classList.add("animation");
            if(selectedTeams.length>0){
                document.getElementById((selectedTeams.length).toString()-1).classList.remove("animation");
            }
            selectedTeams.push(variableSelectionnee);
            handleClickTable();
            
            handleOpponents(variableSelectionnee);

            displayProbability();
            fillTable();

            if(selectedTeams.length == 16){
                document.getElementById('selectRandomTeam').classList.remove('pointer');
                document.getElementById('selectRandomTeam').classList.add('disabled-button');
            }
            if(selectedTeams.length == 1){
                document.getElementById('removeTeam').classList.remove('disabled-button');
                document.getElementById('removeTeam').classList.add('pointer');
                document.getElementById('reset').classList.remove('disabled-button');
                document.getElementById('reset').classList.add('pointer');
            }
        }
    });

    // Gestionnaire d'évènement pour le click sur le bouton < Remove Team >
    document.getElementById('removeTeam').addEventListener('click', function() {
        if(selectedTeams.length > 0){
            if(selectedTeams.length == 16){
                document.getElementById('selectRandomTeam').classList.remove('disabled-button');
                document.getElementById('selectRandomTeam').classList.add('pointer');
            }

            document.getElementById((selectedTeams.length-1).toString()).textContent = "";
            document.getElementById((selectedTeams.length-1).toString()).classList.add('disabled');
            document.getElementById((selectedTeams.length-1).toString()).classList.remove("animation");
            selectedTeams.pop();
            displayProbability();
            handleOpponents(selectedTeams[selectedTeams.length-1]);
            fillTable(); 
            handleClickTable();

            if(selectedTeams.length == 0){
                document.getElementById('removeTeam').classList.remove('pointer');
                document.getElementById('removeTeam').classList.add('disabled-button');
                document.getElementById('reset').classList.remove('pointer');
                document.getElementById('reset').classList.add('disabled-button');
            }
        }
    });

    // Gestionnaire d'évènement pour le click sur le bouton < Reset >
    document.getElementById('reset').addEventListener('click', function() {
        if(selectedTeams.length>0){
            if(selectedTeams.length == 16){
                document.getElementById('selectRandomTeam').classList.remove('disabled-button');
                document.getElementById('selectRandomTeam').classList.add('pointer');
            }

            // Clear content of the match table
            for (let i = 0; i < selectedTeams.length; i++) {
                document.getElementById((i).toString()).textContent = "";
                document.getElementById((i).toString()).classList.add('disabled');
                document.getElementById(i.toString).classList.remove("animation");
              }
            selectedTeams = [];
            displayProbability();
            handleOpponents(equipes[0]);
            fillTable();
            handleClickTable();

            document.getElementById('removeTeam').classList.remove('pointer');
            document.getElementById('removeTeam').classList.add('disabled-button');
            document.getElementById('reset').classList.remove('pointer');
            document.getElementById('reset').classList.add('disabled-button');
        }
    });

    // Gestionnaire d'évènement pour afficher le tableau lorsqu'on presse 'S'
    document.addEventListener('keydown', function(event) {
        // Check if the pressed key is 'S'
        if (event.key == 'S' || event.key == 's') {
            document.getElementById('blur').classList.toggle('hidden');
            document.getElementById('page').classList.toggle('pointer-events');
          toggleOverlay();
        }
      });
});






