const url = "/static/PROBA/isom.json";
async function fetchData(url){
    try{
        const response = await fetch(url);
        const data = response.json();
        return data;
}catch(error) {
        console.log(error);
    };    
}
let donnees = 0;
class Team {
    constructor(name, country, group, set) {
        this._name = name;
        this._country = country;
        this._group = group;
        this._set = set;
    }

    name() {
        return this._name;
    }

    country() {
        return this._country;
    }

    group() {
        return this._group;
    }

    set() {
        return this._set;
    }
}

class GraphBipartite {
    constructor(features) {
        if (features.length === 0) {
            this.matrix = [];
            this._length = 0;
            this._teams = [];
            this.teamsRunnersUp = [];
            this.teamsWinners = [];
        } else {
            this.matrix = features[0];
            this._length = features[3];
            this._teams = features[4];
            this.teamsRunnersUp = features[1];
            this.teamsWinners = features[2];
        }
        this.lastRunnerDrawn = " ";
    }

    runnersUp() {
        return this.teamsRunnersUp;
    }

    winners() {
        return this.teamsWinners;
    }

    length() {
        return this._length;
    }

    teams() {
        return this._teams;
    }

    setLength(num) {
        this._length = num;
    }

    copyGraph() {
        const matrix2 = this.matrix.map(line => line.slice());
        const runnersUp2 = [...this.runnersUp()];
        const winners2 = [...this.winners()];
        const length = this.length();
        const teams2 = [...this.teams()];
        return new GraphBipartite([matrix2, runnersUp2, winners2, length, teams2]);
    }

    addTeam(team) {
        if (team.set() === "runner up") {
            this.teamsRunnersUp.push(team.name());
            for (let i = 0; i < this.winners().length; i++) {
                const winner = this.winners()[i];
                if (this.teams()[this.indexTeams(winner)].country() !== team.country()
                    && this.teams()[this.indexTeams(winner)].group() !== team.group()) {
                    this.matrix[i].push(1);
                } else {
                    this.matrix[i].push(0);
                }
            }
        } else {
            this.teamsWinners.push(team.name());
            this.matrix.push([]);
            for (let i = 0; i < this.runnersUp().length; i++) {
                const runner = this.runnersUp()[i];
                if (this.teams()[this.indexTeams(runner)].country() !== team.country()
                    && this.teams()[this.indexTeams(runner)].group() !== team.group()) {
                    this.matrix[this.matrix.length - 1].push(1);
                } else {
                    this.matrix[this.matrix.length - 1].push(0);
                }
            }
        }
        this.setLength(this.length() + 1);
        this._teams.push(team);
        print2Dmatrix(this.matrix);
    }

    indexTeams(name) {
        for (let i = 0; i < this.teams().length; i++) {
            if (name === this.teams()[i].name()) {
                return i;
            }
        }
        console.log("wsh");
    }

    indexRunner(runner) {
        for (let k = 0; k < this.runnersUp().length; k++) {
            if (this.runnersUp()[k] === runner) {
                return k;
            }
        }
    }

    indexWinner(winner) {
        for (let k = 0; k < this.winners().length; k++) {
            if (this.winners()[k] === winner) {
                return k;
            }
        }
    }

    indexName(name) {
        for (let k = 0; k < this.runnersUp().length; k++) {
            if (this.runnersUp()[k] === name) {
                return k;
            }
        }
        for (let k = 0; k < this.winners().length; k++) {
            if (this.winners()[k] === name) {
                return k;
            }
        }
    }

    remove2t(rU, wi) {
        const i0 = this.teamsRunnersUp.indexOf(rU);
        const j0 = this.teamsWinners.indexOf(wi);
        this.matrix.splice(j0, 1);
        for (let k = 0; k < this.matrix.length; k++) {
            this.matrix[k].splice(i0, 1);
        }
        this.teamsRunnersUp.splice(i0, 1);
        this.teamsWinners.splice(j0, 1);
        this.setLength(this.length() - 2);
        this.lastRunnerDrawn = i0;
    }

    remove1t(runner) {
        this.setLength(this.length() - 1);
        this.lastRunnerDrawn = runner;
    }

    sortRows(matrix, permutation) {
        let scores = [];
        let perm = [];
        for (let k = 0; k < permutation.length; k++) {
            perm.push(permutation[k]);
        }
        for (let i = 0; i < matrix.length; i++) {
            let sum = 0;
            for (let j = 0; j < matrix[0].length; j++) {
                sum += matrix[i][j] * Math.pow(2, j);
            }
            scores.push(sum);
            const currentElement = scores[i];
            const currentPerm = perm[i];
            let k = i - 1;
            while (k >= 0 && scores[k] > currentElement) {
                scores[k + 1] = scores[k];
                perm[k + 1] = perm[k];
                k -= 1;
            }
            scores[k + 1] = currentElement;
            perm[k + 1] = currentPerm;
        }
        let res = [];
        for (let i = 0; i < matrix.length; i++) {
            for (let k = 0; k < matrix.length; k++) {
                if (perm[i] === permutation[k]) {
                    res.push(matrix[k]);
                }
            }
        }
        return [res, perm];
    }

    sortCol(matrix, permutation) {
        let scores = [];
        let perm = [];
        for (let k = 0; k < permutation.length; k++) {
            perm.push(permutation[k]);
        }
        for (let j = 0; j < matrix[0].length; j++) {
            let sum = 0;
            for (let i = 0; i < matrix.length; i++) {
                sum += matrix[i][j] * Math.pow(2, i);
            }
            scores.push(sum);
            const currentElement = scores[j];
            const currentPerm = perm[j];
            let k = j - 1;
            while (k >= 0 && scores[k] > currentElement) {
                scores[k + 1] = scores[k];
                perm[k + 1] = perm[k];
                k -= 1;
            }
            scores[k + 1] = currentElement;
            perm[k + 1] = currentPerm;
        }
        let res = [];
        for (let i = 0; i < matrix.length; i++) {
            res.push([]);
        }
        for (let j = 0; j < perm.length; j++) {
            for (let k = 0; k < permutation.length; k++) {
                if (perm[j] === permutation[k]) {
                    for (let i = 0; i < res.length; i++) {
                        res[i].push(matrix[i][k]);
                    }
                }
            }
        }
        return [res, perm];
    }

    indexEqRunner(runner, permutationCols) {
        let trueInd = runner;
        let ind = runner;
        for (let i = 0; i < permutationCols.length; i++) {
            for (let j = 0; j < permutationCols[i].length; j++) {
                if (trueInd === permutationCols[i][j]) {
                    ind = j;
                }
            }
        }
        return ind;
    }

    indexEqWinner(winner, permutationRows) {
        let trueInd = winner;
        let ind = winner;
        for (let i = 0; i < permutationRows.length; i++) {
            for (let j = 0; j < permutationRows[i].length; j++) {
                if (trueInd === permutationRows[i][j]) {
                    ind = j;
                }
            }
        }
        return ind;
    }

    isom() {
        let permutationRows = new Array(1);
        permutationRows[0] = new Array(this.matrix.length);
        let permutationCols = new Array(1);
        permutationCols[0] = new Array(this.matrix.length);
        for(let i=0; i<this.matrix.length; i++){
            permutationRows[0][i]=i;
            permutationCols[0][i]=i;
        }
        let end = false;
        let mat1 = [];
        for (let k of this.matrix) {
            mat1.push(k);
        }
        while (!end) {
            const rows = permutationRows[permutationRows.length - 1].slice();
            const cols = permutationCols[permutationCols.length - 1].slice();
            const [mat2, permRows] = this.sortRows(mat1, permutationRows[permutationRows.length - 1]);
            const [mat3, permCols] = this.sortCol(mat2, permutationCols[permutationCols.length - 1]);
            permutationRows.push(permRows);
            permutationCols.push(permCols);
            mat1 = [];
            for (let k of mat3) {
                mat1.push(k);
            }
            end = true;
            for (let i = 0; i < rows.length; i++) {
                if (rows[i] !== permutationRows[permutationRows.length - 1][i]) {
                    end = false;
                }
            }
            for (let i = 0; i < cols.length; i++) {
                if (cols[i] !== permutationCols[permutationCols.length - 1][i]) {
                    end = false;
                }
            }
        }
        let binaryString = '';

        for (const row of mat1) {
            for (const element of row) {
                binaryString += String(element);
            }
        }
        let q;

        if (binaryString.length <= 32) {
            q = parseInt(binaryString, 2);
        } else {
            q = [
                parseInt(binaryString.slice(0, 32), 2),
                parseInt(binaryString.slice(32), 2)
            ];
        }
        return [q, permutationRows, permutationCols];
    }

    mat(data) {
        const [q, permutationRows, permutationCols] = this.isom();
        let table = [];

        for (let i = 0; i <= this.winners().length; i++) {
            table.push([]);
        }

        table[0].push(" ");
        for (let line = 1; line <= this.winners().length; line++) {
            table[line].push(this.winners()[line - 1]);
        }
        for (let col = 1; col <= this.runnersUp().length; col++) {
            table[0].push(this.runnersUp()[col - 1]);
        }
        let temp = "";
        if(q.length === 1){temp = "q[0]";}
        else if(q.length===2){temp = "("+q[0]+", "+ q[1]+")";}
        else{console.error("Undefined key");}
        const key1 = temp; // "(4249345661, 126911)"
        const runners = this.runnersUp();
        const winners = this.winners();
        for (let i = 0; i < winners.length; i++) {
            for (let j = 0; j < runners.length; j++) {
                const runner = this.indexEqRunner(i, permutationCols);
                const winner = this.indexEqWinner(j, permutationRows);
                const draw = this.indexEqRunner(this.lastRunnerDrawn, permutationCols);
                if (this.length() % 2 === 0) {
                    const key2 = `${runner}, ${winner}`;
                    if (key1 in data && key2 in data[key1]) {
                        table[j + 1].push(data[key1][key2]);
                    } else {
                        console.log(`not, ${key1}, ${key2}`);
                    }
                } else {
                    const key2 = `${runner}, ${winner}, ${draw}`;
                    if (key1 in data && key2 in data[key1]) {
                        table[j + 1].push(data[key1][key2]);
                    }
                }
            }
        }
        const matrix = table.map(row => row.map(cell => cell));
        return matrix;
    }

    countOnes(i) {
        let count = 0;
        for (let k = 0; k < this.teamsWinners.length; k++) {
            if (this.matrix[k][i] === 1) {
                count += 1;
            }
        }
        return count;
    }

    proba_1t_drawn(i, j, runner, donnees) {
        const i_0 = this.indexRunner(runner);
        const proba_uni = 1 / this.countOnes(i_0);
        
        if (i_0 === i) {
            return this.matrix[j][i] * proba_uni * 100;
        } else {
            let proba = 0;

            if (this.length() > 2) {
                for (let k = 0; k < this.teamsWinners.length; k++) {
                    if (k !== j && this.matrix[k][i_0] === 1) {
                        if (this.matrix[j][i] === 1) {
                            const G2 = this.copyGraph();
                            G2.remove2t(i_0, k);

                            let i_change = i;
                            let j_change = j;

                            if (i > i_0) {
                                i_change = i - 1;
                            }

                            if (j > k) {
                                j_change = j - 1;
                            }
                            proba += G2.mat(donnees)[j_change + 1][i_change + 1] * proba_uni;
                        }
                    }
                }

                return proba;
            } else {
                return 100;
            }
        }
    }

    proba_cond(runner, donnees) {
        const mat = [[''].concat(this.teamsRunnersUp)];

        for (let i = 0; i < this.teamsWinners.length; i++) {
            mat.push([this.teamsWinners[i]].concat(
                this.teamsRunnersUp.map((v, index) => {
                    Math.round(this.proba_1t_drawn(index, i, runner, donnees) * 100) / 100;
                }
                )
            ));
        }

        return mat;
    }
}

const team_1 = new Team("Napoli", "it", "A", "winner");
const team_2 = new Team("Liverpool", "en", "A", "runner up");
const team_3 = new Team("Porto", "pt", "B", "winner");
const team_4 = new Team("Brugge", "be", "B", "runner up");
const team_5 = new Team("Bayern", "de", "C", "winner");
const team_6 = new Team("Inter", "it", "C", "runner up");
const team_7 = new Team("Tottenham", "en", "D", "winner");
const team_8 = new Team("Frankfurt", "de", "D", "runner up");
const team_9 = new Team("Chelsea", "en", "E", "winner");
const team_10 = new Team("AC Milan", "it", "E", "runner up");
const team_11 = new Team("Real Madrid", "es", "F", "winner");
const team_12 = new Team("Leipzig", "de", "F", "runner up");
const team_13 = new Team("Manchester City", "en", "G", "winner");
const team_14 = new Team("Dortmund", "de", "G", "runner up");
const team_15 = new Team("Benfica", "pt", "H", "winner");
const team_16 = new Team("PSG", "fr", "H", "runner up");

const teams = [team_1, team_2, team_3, team_4, team_5, team_6, team_7, team_8,
               team_9, team_10, team_11, team_12, team_13, team_14, team_15, team_16];

function handleGraph(){
    G_init = new GraphBipartite([]);
    for (const team of teams) {
        if(selectedTeams.indexOf(team.name())<0 || (selectedTeams.length%2==1 && selectedTeams[selectedTeams.length-1]==team.name())){
            G_init.addTeam(team);
        }
    }
}

let G_init = new GraphBipartite([]);

for (const team of teams) {
    G_init.addTeam(team);
}

function matchPossible(winner){
    return (G_init.matrix[G_init.runnersUp().indexOf(selectedTeams[selectedTeams.length-1])][G_init.winners().indexOf(winner)]==1);
}


// Assuming you have the required implementation for mat and probaCond functions
// Adjust the file path accordingly for the JSON file

const groupe1 = ["Napoli", "Porto", "Bayern", "Tottenham", "Chelsea", "Real Madrid", "Manchester City", "Benfica"];

const groupe2 = ["Liverpool", "Brugge", "Inter", "Frankfurt", "AC Milan", "Leipzig", "Dortmund", "PSG"];

const equipes = groupe1.concat(groupe2);
var selectedTeams = [];   // Variable globale très dangereuse !!
var opponentTeams = [];

function hIndexOf(_2Dmatrix, j, value){
    for(let k=0;k<_2Dmatrix.length;k++){
        if(_2Dmatrix[k][j]==value){
            return k;
        }
    }
    return -1;
}

function print2Dmatrix(M){
    for(let i=0; i<M.length;i++){
        let st = ""
        for(let j=0;j<M[i].length;j++){
            st+=M[i][j];
        }
        console.log(st);
    }
}

function fillTable(donnees){
    let M=0;
    if(selectedTeams.length%2==0){M = G_init.mat(donnees);}
    else{M = G_init.proba_cond(selectedTeams[selectedTeams.length-1], donnees);}
    document.getElementById('l'+(0)+'c'+(0)).textContent = "";
    for(let i=1; i<groupe1.length+1;i++){
        document.getElementById('l'+(i)+'c'+(0)).textContent = groupe1[i-1];
        document.getElementById('l'+(0)+'c'+(i)).textContent = groupe2[i-1];
    }
    for(let i=0; i<groupe1.length;i++){
        const ind_winner = hIndexOf(M,0, groupe1[i]);
        for(let j=0; j<groupe2.length;j++){
            const ind_runner_up = M[0].indexOf(groupe2[j]);
            if(ind_winner < 0 || ind_runner_up < 0){
                document.getElementById('l'+(i+1)+'c'+(j+1)).textContent = '-';
                document.getElementById('l'+(i+1)+'c'+(j+1)).style.backgroundColor = 'rgb(255, 255, 255)';
            }
            else{
                document.getElementById('l'+(i+1)+'c'+(j+1)).textContent = M[ind_winner][ind_runner_up] + '%';
                document.getElementById('l'+(i+1)+'c'+(j+1)).style.backgroundColor = 'rgb('+(255-((255/100)*M[ind_winner][ind_runner_up]))+', 0, 0)';
            }
        }
    }
    // Completed matched
}
async function fillDaTable() {
    donnees = await fetchData(url);
    fillTable(donnees);
} 
let fakeProbabilities = [];

                // TOUT LE JAVASCRIPT

function displayProbability(){ // Probabilités avant toute sélection
    for(let k=0; k<8;k++){
        if(k<Math.floor(selectedTeams.length/2)){
            document.getElementById('p'+k).textContent = (fakeProbabilities[groupe1.indexOf(selectedTeams[2*k+1])][groupe2.indexOf(selectedTeams[2*k])]).toString()+'%';
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

        // Fonction pour sélectionner une variable aléatoire
        function selectionnerVariableAleatoire() {
            if(selectedTeams.length % 2 == 0){
                do{
                    var indiceAleatoire = Math.floor(Math.random() * 8);
                }while(selectedTeams.includes(groupe2[indiceAleatoire]));
                return groupe2[indiceAleatoire];
            }
            else{
                do{
                    var indiceAleatoire = Math.floor(Math.random() * 8);
                }while(selectedTeams.includes(groupe1[indiceAleatoire]) && matchPossible(groupe1[indiceAleatoire]));
                return groupe1[indiceAleatoire];
            }
        }
    
        // Fills the 'opponentTeams' array with all possible opponents of the last selected team (two cases : new match, the possible opponents are all still-not-selected teams of group 1 ; first team of the current match already selected, we choose the possible opponents in group 2)
        function defineOpponents() {
            if(selectedTeams.length % 2 == 0){
                groupe2.forEach((elem) => {if(!(selectedTeams.includes(elem))){opponentTeams.push(elem);}});
            }
            else{
                // Traitement supplémentaire nécessaire
                groupe1.forEach((elem) => {if((!selectedTeams.includes(elem)) && matchPossible(elem)){opponentTeams.push(elem);}});
            }
        }
    
        function toggleOverlay() {
            // Get the overlay element
            var overlay = document.getElementById('overlay');
          
            // Toggle the 'hidden' class to show/hide the overlay
            overlay.classList.toggle('hidden');
          }
    
        // Function to handle the display of the possible opponents given the last selected team
        function handleOpponents() {
            opponentTeams = [];
            removeAllChildNodes(document.getElementById('second-choice'));
            defineOpponents();
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
    
                handleGraph();
    
                handleClickTable();
                displayProbability();
                handleOpponents();
                fillDaTable();
    
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

document.addEventListener('DOMContentLoaded', function(){
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
                                    handleGraph();
                                    displayProbability();
                                    handleOpponents();
                                    fillDaTable(); 
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
                                    handleGraph();
                                    displayProbability();
                                    handleOpponents();
                                    fillDaTable(); 
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
            handleGraph();
            handleClickTable();
            
            handleOpponents();

            displayProbability();
            fillDaTable();

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
            handleGraph();
            displayProbability();
            handleOpponents();
            fillDaTable(); 
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
            handleGraph();
            displayProbability();
            handleOpponents();
            fillDaTable();
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
      handleOpponents();
    
    
    handleClickTable();


async function fakeProb() {
    donnees = await fetchData(url);
    const M = G_init.mat(donnees);
for(let m=0; m<8; m++){
    fakeProbabilities.push([]);
    for(let n=0; n<8;n++){
        fakeProbabilities[m].push(M[m+1][n+1]);
    }
}
}       // Gestionnaire d'événement pour le clic sur le bouton < Select Random Team > 
fillDaTable();
  fakeProb();

})