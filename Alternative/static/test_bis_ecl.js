// Test du chargement des probas:

// Remplacez le chemin par le chemin absolu vers votre fichier JSON
const url = "static/PROBA/isom_ecl.json";
let xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");
xhr.open("GET", url, false); // Notez-le "false" pour le mode synchrone
xhr.send();

let resultat;

if (xhr.status === 200) {
  resultat = JSON.parse(xhr.responseText);
} else {
  console.error('Erreur de chargement du fichier JSON resultat');
}

const url_teams = "static/PROBA/teams_ecl.json";
let xhr_teams = new XMLHttpRequest();
xhr_teams.overrideMimeType("application/json");
xhr_teams.open("GET", url_teams, false); // Notez-le "false" pour le mode synchrone
xhr_teams.send();

let teams_json;

if (xhr_teams.status === 200) {
  teams_json = JSON.parse(xhr_teams.responseText);
} else {
  console.error('Erreur de chargement du fichier JSON teams_json');
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/* Fonction qui fait l'appel à la base de donnée pour charger la base de donnée et renvoie un dictionnaire
de proba ou remplit elle même le tableau */

function fill_all2(){
    let result = G_init.isom()
    let q=result.q
    let permC=result.permCol
    let permR=result.permRow
    let proba_number;
    if(chosen_team.length%2===0 && chosen_team.length>0){
        let index_runner = G_init.index_name(change_bySpace(chosen_team[chosen_team.length-2].textContent))//,permR)
        let index_winner = G_init.index_name(change_bySpace(chosen_team[chosen_team.length-1].textContent))//,permC)
        G_init.remove_2t(index_runner, index_winner)
        result = G_init.isom()
        q=result.q
        permC=result.permCol
        permR=result.permRow
        for(let i=0;i<Winners.length;i++){
            for (let j = 0; j < Runners_up.length; j++) {
                let id = 'l'+(i+1)+'c'+(j+1)
                let cell = document.getElementById(id)
                proba_number = resultat[q][String(G_init.index_eq_runner(G_init.index_name(change_bySpace(Runners_up[i])), permR))+", "+G_init.index_eq_winner(G_init.index_name(change_bySpace(Winners[j])), permC)]
                cell.textContent = String(proba_number)+"%"
            }
        }
    }else if(chosen_team.length%2===1) {
        //console.log(chosen_team[chosen_team.length-1].textContent)
        let team_cond = String(G_init.index_eq_runner(G_init.index_name(chosen_team[chosen_team.length-1].textContent), permR))
        for (let i = 0; i < Winners.length; i++) {
            for (let j = 0; j < Runners_up.length; j++) {
                let id = 'l'+(i+1)+'c'+(j+1)
                let cell = document.getElementById(id)
                proba_number = resultat[q][String(G_init.index_eq_runner(G_init.index_name(change_bySpace(Runners_up[i])), permR)) + ", " + G_init.index_eq_winner(G_init.index_name(change_bySpace(Winners[j])), permC) + ", " +team_cond]
                cell.textContent = String(proba_number) + "%"
            }
        }
    }else{
        for(let i=0;i<Winners.length;i++) {
            for (let j = 0; j < Runners_up.length; j++) {
                let id = 'l'+(i+1)+'c'+(j+1)
                let cell = document.getElementById(id)
                proba_number = resultat[q][String(G_init.index_eq_runner(G_init.index_name(change_bySpace(Runners_up[i])), permR))+", "+G_init.index_eq_winner(G_init.index_name(change_bySpace(Winners[j])), permC)]
                cell.textContent = String(proba_number)+"%"
            }
        }
    }
    for(let k=0;k<runners_resultat.length;k++){
        console.log(k);
        console.log(Math.floor(chosen_team.length/2));
        if(k<Math.floor(chosen_team.length/2)){
            const ind1 = runners_resultat.indexOf(chosen_team[2*k].textContent);
            const ind2 = winners_resultat.indexOf(chosen_team[2*k+1].textContent);
            document.getElementById('p'+k).textContent = firstProb[ind1][ind2]+'%';
        }
        else{
            document.getElementById('p'+k).textContent = "";
        }
    }
    fill_Nan()
    verif_zero()
    change_graphism()
}

function fill_all(){
    fetch(url)
        .then(response=>response.json())
        .then (resultat=> {
            let result = G_init.isom()
            let q=result.q
            let permC=result.permCol
            let permR=result.permRow
            let proba_number;
            if(chosen_team.length%2===0 && chosen_team.length>0){
                let index_runner = G_init.index_name(change_bySpace(chosen_team[chosen_team.length-2].textContent))//,permR)
                let index_winner = G_init.index_name(change_bySpace(chosen_team[chosen_team.length-1].textContent))//,permC)
                G_init.remove_2t(index_runner, index_winner)
                result = G_init.isom()
                q=result.q
                permC=result.permCol
                permR=result.permRow
                for(let i=0;i<Winners.length;i++){
                    for (let j = 0; j < Runners_up.length; j++) {
                        let id = 'l'+(i+1)+'c'+(j+1)
                        let cell = document.getElementById(id)
                        proba_number = resultat[q][String(G_init.index_eq_runner(G_init.index_name(change_bySpace(Runners_up[i])), permR))+", "+G_init.index_eq_winner(G_init.index_name(change_bySpace(Winners[j])), permC)]
                        cell.textContent = String(proba_number)+"%"
                    }
                }
            }else if(chosen_team.length%2===1) {
                //console.log(chosen_team[chosen_team.length-1].textContent)
                let team_cond = String(G_init.index_eq_runner(G_init.index_name(chosen_team[chosen_team.length-1].textContent), permR))
                for (let i = 0; i < Winners.length; i++) {
                    for (let j = 0; j < Runners_up.length; j++) {
                        let id = 'l'+(i+1)+'c'+(j+1)
                        let cell = document.getElementById(id)
                        proba_number = resultat[q][String(G_init.index_eq_runner(G_init.index_name(change_bySpace(Runners_up[i])), permR)) + ", " + G_init.index_eq_winner(G_init.index_name(change_bySpace(Winners[j])), permC) + ", " +team_cond]
                        cell.textContent = String(proba_number) + "%"
                    }
                }
            }else{
                for(let i=0;i<Winners.length;i++) {
                    for (let j = 0; j < Runners_up.length; j++) {
                        let id = 'l'+(i+1)+'c'+(j+1)
                        let cell = document.getElementById(id)
                        proba_number = resultat[q][String(G_init.index_eq_runner(G_init.index_name(change_bySpace(Runners_up[i])), permR))+", "+G_init.index_eq_winner(G_init.index_name(change_bySpace(Winners[j])), permC)]
                        cell.textContent = String(proba_number)+"%"
                    }
                }
            }
            fill_Nan()
            verif_zero()
            change_graphism()
        })
}

////////////////////////////////////////////////////////////////////////////////////////////////////
/*      Fonctions pour lire la base de données      */
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
            this.teams_runners_up = [];
            this.teams_winners = [];
        } else {
            this.matrix = features[0];
            this._length = features[3];
            this._teams = features[4];
            this.teams_runners_up = features[1];
            this.teams_winners = features[2];
        }
        this.last_runner_drawn = " ";
    }
    set_teams(teams){
        self._teams = teams;
    }
    runners_up() {
        return this.teams_runners_up;
    }

    winners() {
        return this.teams_winners;
    }

    length() {
        return this._length;
    }

    teams() {
        return this._teams;
    }

    set_length(num) {
        this._length = num;
    }

    copy_graph() {
        // pour créer un autre graph avec les mÃªmes composants
        const matrix2 = this.matrix.map(line => line.slice());
        const runners_up2 = this.runners_up().slice();
        const winners2 = this.winners().slice();
        const length = this.length();
        const teams2 = this.teams().slice();
        const new_graph = new GraphBipartite([matrix2, runners_up2, winners2, length, teams2]);
        return new_graph;
    }

    add_team(team) {
        // pour mettre les équipes au début
        if (team.set() === "runner up") {
            this.teams_runners_up.push(team.name());
            for (let i = 0; i < this.winners().length; i++) {
                const winner = this.winners()[i];
                if (
                    this.teams()[this.index_teams(winner)].country() !== team.country() &&
                    this.teams()[this.index_teams(winner)].group() !== team.group()
                ) {
                    this.matrix[i].push(1);
                } else {
                    this.matrix[i].push(0);
                }
            }
        } else {
            this.teams_winners.push(team.name());
            this.matrix.push([]);
            for (let i = 0; i < this.runners_up().length; i++) {
                const runner = this.runners_up()[i];
                if (
                    this.teams()[this.index_teams(runner)].country() !== team.country() &&
                    this.teams()[this.index_teams(runner)].group() !== team.group()
                ) {
                    this.matrix[this.matrix.length - 1].push(1);
                } else {
                    this.matrix[this.matrix.length - 1].push(0);
                }
            }
        }
        this.set_length(this.length() + 1);
        this._teams.push(team);
    }

    index_teams(name) {
        for (let i = 0; i < this.teams().length; i++) {
            if (name === this.teams()[i].name()) {
                return i;
            }
        }
        console.log("error in index_teams");
    }


    index_runner(runner) {
        for (let k = 0; k < this.runners_up().length; k++) {
            if (this.runners_up()[k] === runner) {
                return k;
            }
        }
    }

    index_winner(winner) {
        for (let k = 0; k < this.winners().length; k++) {
            if (this.winners()[k] === winner) {
                return k;
            }
        }
    }

    index_name(name) {
        for (let k = 0; k < this.runners_up().length; k++) {
            if (this.runners_up()[k] === name) {
                return k;
            }
        }
        for (let k = 0; k < this.winners().length; k++) {
            if (this.winners()[k] === name) {
                return k;
            }
        }
    }

    remove_2t(i_0, j_0) {
        // enlever 2 clubs du graphe
        if (j_0 >= this.winners().length) {
            console.log("erreur dans remove_2t");
        }
        this.matrix.splice(j_0, 1);
        for (let k = 0; k < this.matrix.length; k++) {
            this.matrix[k].splice(i_0, 1);
        }
        this.teams_runners_up.splice(i_0, 1);
        this.teams_winners.splice(j_0, 1);
        this.set_length(this.length() - 2);
        this.last_runner_drawn = i_0;
    }

    sort_rows(matrix, permutation) {
        // tri les lignes en fonction du score de chacune
        let scores = [];
        let perm = [...permutation];
        for (let i = 0; i < matrix.length; i++) {
            // calcul du score pour chaque ligne et tri
            let sum = 0;
            for (let j = 0; j < matrix[0].length; j++) {
                sum += matrix[i][j] * Math.pow(2, j);
            }
            scores.push(sum);
            let currentElement = scores[i];
            let currentPerm = perm[i];
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

        // renvoie la matrice triÃ©e et les permutations
        return { matrix: res, permutation: perm };
    }

    sort_col(matrix, permutation) {
        // pareil avec les colonnes
        let scores = [];
        let perm = [...permutation];
        for (let j = 0; j < matrix[0].length; j++) {
            let sum = 0;
            for (let i = 0; i < matrix.length; i++) {
                sum += matrix[i][j] * Math.pow(2, i);
            }
            scores.push(sum);
            let currentElement = scores[j];
            let currentPerm = perm[j];
            let k = j - 1;
            while (k >= 0 && scores[k] > currentElement) {
                scores[k + 1] = scores[k];
                perm[k + 1] = perm[k];
                k -= 1;
            }
            scores[k + 1] = currentElement;
            perm[k + 1] = currentPerm;
        }


        const res = [];
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
        return { matrix: res, permutation: perm };
    }

    index_eq_runner(runner, permutationCols) {
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

    index_eq_winner(winner, permutationRows) {
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
        // calcule la matrice de l'isomorphisme
        // avec les fonctions de tri
        let permutationRows = [[...Array(this.matrix.length).keys()]];
        let permutationCols = [[...Array(this.matrix.length).keys()]];
        let end = false;
        let mat1 = this.matrix.map(row => [...row]);

        while (!end) {
            let rows = [...permutationRows[permutationRows.length - 1]];
            let cols = [...permutationCols[permutationCols.length - 1]];
            let { matrix: mat2, permutation: permRows } = this.sort_rows(mat1, permutationRows[permutationRows.length - 1]);
            let { matrix: mat3, permutation: permCols } = this.sort_col(mat2, permutationCols[permutationCols.length - 1]);

            permutationRows.push(permRows);
            permutationCols.push(permCols);

            mat1 = mat3.map(row => [...row]);

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

        // renvoie la matrice et toutes les permutations
        let binaryString = '';
        for (let row of mat1) {
            for (let element of row) {
                binaryString += element.toString();
            }
        }
        let q = " ";
        if(binaryString.length<=32){
            q=String(parseInt(binaryString,2))
        }else{
            q="("+String(parseInt(binaryString.slice(0,32),2))+", "+String(parseInt(binaryString.slice(32,binaryString.length),2))+")"
        }
        return {'q': q, "permCol":permutationRows, "permRow":permutationCols };
    }

    mat(data) {
        const { q, permutationRows, permutationCols } = this.isom();
        const table = [];

        for (let i = 0; i < this.winners().length + 1; i++) {
            table.push([]);
        }

        table[0].push(" ");

        for (let line = 1; line < this.winners().length + 1; line++) {
            table[line].push(this.winners()[line - 1]);
        }

        for (let col = 1; col < this.runners_up().length + 1; col++) {
            table[0].push(this.runners_up()[col - 1]);
        }

        const key1 = `${q}`;
        const runners = this.runners_up();
        const winners = this.winners();

        for (let i = 0; i < winners.length; i++) {
            for (let j = 0; j < runners.length; j++) {
                const runner = this.index_eq_runner(i, permutationCols);
                const winner = this.index_eq_winner(j, permutationRows);
                const draw = this.index_eq_runner(this.last_runner_drawn, permutationCols);

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
        const matrix = table.map(row => row.map(element => element));
        return matrix;
    }
}

// le binaire doit être en format string
function binaire_to_deci(binaire){
    let deci = 0;
    let puissance = 0
    let digit;
    for(let i=0;i<binaire.length;i++){
        digit = binaire[i]
        puissance = 2**(binaire.length-i-1)
        deci += parseInt(digit)*puissance
    }
    return deci
}

G_init = new GraphBipartite([])
let teams = []
for(let i=0; i<16; i++){
  key = String(i)
  team = new Team(teams_json[key]["_name"], teams_json[key]["_country"], teams_json[key]["_group"], teams_json[key]["_set"])
  teams.push(team)
}

teams.forEach(element => {
    G_init.add_team(element)
});

////////////////////////////////////////////////////////////////////////////////////////////////////

// Nom des équipes en un morceau plus pratique à manipuler
//let Winners = ["Napoli", "Porto", "Bayern", "Tottenham", "Chelsea", "Real_Madrid", "Manchester_City", "Benfica"];
//let Runners_up = ["Liverpool", "Brugge", "Inter", "Frankfurt", "AC_Milan", "Leipzig", "Dortmund", "PSG"]
// Liste des équipes comme elles sont écrites dans le fichier resultat.json

//let runners_resultat = ['Liverpool', 'Brugge', 'Inter', 'Frankfurt', 'AC Milan', 'Leipzig', 'Dortmund', 'PSG']
//let winners_resultat = ['Napoli', 'Porto', 'Bayern', 'Tottenham', 'Chelsea', 'Real Madrid', 'Manchester City', 'Benfica']
let runners_resultat = []
let Winners = [];
let Runners_up = [];
G_init.runners_up().forEach(function(name){
  runners_resultat.push(name)
  Runners_up.push(changeSpaceby_(name))
})
let winners_resultat = []
G_init.winners().forEach(function(name){
  winners_resultat.push(name)
  Winners.push(changeSpaceby_(name))
})


let affichage_winners = false  // pour savoir quel type de boutons est affiché

const default_cell_match = "........."

// Crée et ajoute les boutons au conteneur
let boutons_winners = []    // Ce sont les boutons qui sont toujours affichés sur le site
let boutons_runner = []     // cad les équipes qui n'ont pas été choisies
let chosen_team = []   // Crée la liste des équipes choisies qui sert pour l'instant pour le undo


// Fonction qui fait disparaître les boutons
function disappear_bouton(bouton){
    bouton.style.display = "none";
}

// Fonction qui change uppercase par espace
function change_bySpace(word){
    const new_word = word.replace(/_/g, ' ');
    return new_word;
}

function changeSpaceby_(word){
    const new_word = word.replace(/\s/g,'_')
    return new_word
}

// Fonction qui change la valeur de la cellule
function change_proba(cell,index,index2){
    if(cell){
        let nombre = resultat[index][index2]
        nombre = 100*nombre
        cell.textContent = String(nombre.toFixed(2))+"%"
    }else{
        console.log("erreur dans change proba")
    }
}

function verif_zero(){
    for(let i=0;i<Winners.length;i++){
        for(let j=0;j<Runners_up.length;j++){
            let id = 'l'+(i+1)+'c'+(j+1)
            let cell = document.getElementById(id)
            let content = cell.textContent
            let number = parseFloat(content.slice(0,-1))
            if(number===0){ // on grise la cellule si la valeur est 0
                cell.style.backgroundColor = "rgb(182,182,182)"
            }
        }
    }
    let max_index;  // vérifie s'il y a des matchs et affichent
    // les cases correspondantes en bleu en écrivant match
    if(chosen_team.length%2===0){max_index=chosen_team.length}
    else{max_index=chosen_team.length-1}
    for(let i=0;i<max_index/2;i++){
        let id = 'l'+(runners_resultat.indexOf(chosen_team[2*i].textContent)+1)+'c'+(winners_resultat.indexOf(chosen_team[2*i+1].textContent)+1);
        let cell = document.getElementById(id)
        cell.style.backgroundColor = "#75ACDA"//"#50f3db"
        //cell.textContent= "Match"
        cell.textContent = "✔️"
    }
}
// Quand un match est décidé il n'y a plus de probas pour les équipes dans ce match, il y a donc des erreurs
// et cela affiche des Nan, donc s'il y a un match par les probas 0
// On rajoute un truc pour mettre en valeur quand il ya un match sur: 100%
function fill_Nan(){
    for(let i=0;i<Winners.length;i++) {
        for (let j = 0; j < Runners_up.length; j++) {
            let id = 'l'+(runners_resultat.indexOf(Runners_up[i])+1)+'c'+(winners_resultat.indexOf(Winners[j])+1)
            let cell = document.getElementById(id)
            let number = parseFloat(cell.textContent.slice(0, -1))
            if(number===100){
                cell.style.backgroundColor = "#121212"
            }
        }
    }
    for(let i=0;i<runners_resultat.length;i++){
        for(let j=0;j<winners_resultat.length;j++){
            let id = 'l'+(i+1)+'c'+(j+1)
            let cell = document.getElementById(id)
            let number = parseFloat(cell.textContent.slice(0, -1))
            if(isNaN(number)){
                cell.textContent = "-"
                cell.style.color = "#FFFFFF"
                cell.style.backgroundColor = "rgb(51, 51, 51)"
            }
        }
    }
}
function change_graphism(){
    without_graphism()
    // Illumine la ligne en jaune
    if(chosen_team.length%2===1){
        let last_team = chosen_team[chosen_team.length-1]
        let selecteur = "."+changeSpaceby_(last_team.textContent)
        let colorChange = document.querySelectorAll(selecteur)
        colorChange.forEach(function (element){
            element.style.backgroundColor = "rgba(255,255,112,0.93)"
        })
    }
    fill_Nan()
}

// test reini graphiquement le tableau
function without_graphism(){
    for(let i=0;i<Winners.length;i++) {
        for (let j = 0; j < Runners_up.length; j++) {
            let id = 'l'+(i+1)+'c'+(j+1)
            let cell = document.getElementById(id)
            cell.style.backgroundColor = "transparent"
            cell.style.color = "black"
        }
        const line = document.getElementById('l'+(i+1));
        line.classList.remove("border-emphasize");
    }
}

function remove(list,elt_to_delete){
    let index = list.indexOf(elt_to_delete)
    list.splice(index, 1)
}
function remove_from_list(){ // Utilise les variables globales
    let runner = []
    let winner = []
    let max_index;
    runners_resultat.forEach(function(name){    // On copie les listes
        runner.push(name)
    })
    winners_resultat.forEach(function(name){
        winner.push(name)
    })
    if(chosen_team.length%2 === 1){max_index = chosen_team.length-1}
    else{max_index = chosen_team.length}
    for(let i=0;i<max_index;i++) {
        let name = change_bySpace(chosen_team[i].textContent) // Normalement la liste sera déjà bien organisé
        if (runner.includes(name)) {
            remove(runner, name)
        } else if (winner.includes(name)) {
            remove(winner, name)
        }else{console.log("on est dans le else avec: "+name)}
    }
    let index = "('" + runner[0] + "'"
    for(let i=1;i<runner.length-1;i++){
        index += ", '"+ runner[i]+"'"
    }
    index+= ", '"+runner[runner.length-1] +"'), ("
    index += "'"+winner[0]+"'"
    for(let i=1;i<winner.length-1;i++){
        index += ", '"+ winner[i]+"'"
    }
    index+= ", '"+winner[winner.length-1] +"')"
    return index
}

function give_index2(winner,runner){ // Utilise des variables globales
    let index2 = change_bySpace(runner)+", "+change_bySpace(winner);
    if(affichage_winners){
        index2+=", "+change_bySpace(chosen_team[chosen_team.length-1].textContent)
    }
    return index2
}
function change_all(){
    for(let i=0;i<Winners.length;i++){
        for(let j=0;j<Runners_up.length;j++){
            let id = 'l'+(i+1)+'c'+(j+1)
            let cell = document.getElementById(id)
            //console.log(cell.id)
            let index = remove_from_list()
            //console.log(index)
            let index2 = give_index2(Winners[j],Runners_up[i])
            //console.log(index2)
            change_proba(cell,index,index2)
        }
    }
}

function handleClickTable(){
    for(let i=0; i<runners_resultat.length;i++){
        const c1 = document.getElementById("l0c"+(i+1));
        const c2 = document.getElementById("l"+(i+1)+"c0");
        const b1 = document.getElementById('bw'+i);
        const b2 = document.getElementById('br'+i);

        if(affichage_winners){
            if(chosen_team.includes(b1)){
                c1.classList.remove('pointer');
                c1.classList.add('pointer-events');
            }
            else{
                // Get last team drawn
                const ind = runners_resultat.indexOf(chosen_team[chosen_team.length-1].textContent);
                const cell = document.getElementById('l'+(ind+1)+'c'+(i+1));
                if(parseFloat(cell.textContent)!= 0){
                    c1.classList.remove('pointer-events');
                    c1.classList.add('pointer');
                }
                else{
                    c1.classList.remove('pointer');
                    c1.classList.add('pointer-events');
                }
            }
            c2.classList.remove('pointer');
            c2.classList.add('pointer-events');
        }
        else{
            if(chosen_team.includes(b2)){
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

function fill_end(){ // To complete
    for(let k=0;k<runners_resultat.length;k++){
        if(k<Math.floor(chosen_team.length/2)){
            const ind1 = runners_resultat.indexOf(chosen_team[2*k].textContent);
            const ind2 = winners_resultat.indexOf(chosen_team[2*k+1].textContent);
            document.getElementById('p'+k).textContent = firstProb[ind1][ind2]+'%';
        }
        else{
            document.getElementById('p'+k).textContent = "";
        }
    }
}

function heatmap(){
    without_graphism()
    fill_Nan()
    for(let i=0;i<Winners.length;i++) {
        for (let j = 0; j < Runners_up.length; j++) {
            let id = 'l'+(i+1)+'c'+(j+1)
            let cell = document.getElementById(id)
            let number = 100-parseFloat(cell.textContent.slice(0, -1))
            let couleur = "hsl(0,100%,"+String(number)+"%)"
            cell.style.background = couleur
            if(100-number>33){
                cell.style.color="white"
            }
        }
    }
    let max_index;  // vérifie s'il y a des matchs et affichent
    // les cases correspondantes en bleu en écrivant match
    if(chosen_team.length%2===0){max_index=chosen_team.length}
    else{max_index=chosen_team.length-1}
    for(let i=0;i<max_index/2;i++){
        let id = 'l'+(runners_resultat.indexOf(chosen_team[2*i].textContent)+1)+'c'+(winners_resultat.indexOf(chosen_team[2*i+1].textContent)+1)
        let cell = document.getElementById(id)
        cell.style.backgroundColor = "#75ACDA"//"#50f3db"
        //cell.textContent= "Match"
        cell.textContent = "✔️"
    }
    if(chosen_team.length%2===1){
        let last_team = chosen_team[chosen_team.length-1].textContent
        let line = document.getElementById('l'+(runners_resultat.indexOf(last_team)+1))
        line.classList.add('border-emphasize');
    }
}

// Fonction qui ajoute les équipes au tableau et change les boutons affichés
function add_team_to_list_match(bouton){
    //  Change les boutons
    let list=[]
    let other_list=[]
    if(boutons_winners.includes(bouton)){  // if affichage_winners
        list = boutons_winners
        other_list = boutons_runner    // Peut aussi se faire avec affichage_winners dans la condition
    }else{
        list = boutons_runner
        other_list = boutons_winners
    }
    let index = list.indexOf(bouton)
    list.splice(index, 1)     // On enlève l'équipe des équipes à proposer
    affichage_winners = !affichage_winners  // on affiche les autres équipes
    list.forEach(function(button){  // Je fais disparaître toutes les autres boutons
        disappear_bouton(button)
    })
    other_list.forEach(function(button){
        // Si la proba du texte de ce button avec le dernier choisi: bouton est de 0 alors on n'affiche pas le button
        // car le match ne peut pas avoir lieu et donc pas de calcul de proba, sinon il y a un pb
        if(affichage_winners) {  // on vérifie que le bouton est un runner, dans ce cas on peut pas afficher tous les winners
            let id = 'l'+(runners_resultat.indexOf(bouton.textContent)+1)+'c'+(winners_resultat.indexOf(button.textContent)+1);
            let cellule = document.getElementById(id);
            let proba = parseFloat(cellule.textContent)
            if(proba !== 0){
                button.style.display="inline"
            }
        }
        else{button.style.display="inline"}
    })
    chosen_team.push(bouton)    // Rajoute l'équipe dans les équipes choisies
    // J'actualise toutes les probas
        //change_all()
        //fill_all()
    if(chosen_team.length<runners_resultat.length+winners_resultat.length-1){
        fill_all2();
    }
    else{
        fill_end();
    }
    // Ajoute la liste des matchs en fonction des clics de l'utilisateur
    let number = chosen_team.length
    let i = 1-(number%2)
    let j = Math.floor((number-1)/2)
    let cell = document.getElementById((2*j+i).toString())
    cell.textContent=bouton.textContent
    heatmap()
    handleClickTable();
}

function toggleOverlay() {
    // Get the overlay element
    var overlay = document.getElementById('overlay');
  
    // Toggle the 'hidden' class to show/hide the overlay
    overlay.classList.toggle('hidden');
  }

  function selectionnerVariableAleatoire() {
    if(affichage_winners){
        let indiceAleatoire = -1;
        do{
            indiceAleatoire = Math.floor(Math.random() * boutons_winners.length);
        }while(boutons_winners[indiceAleatoire].style.display == "none")
        return boutons_winners[indiceAleatoire];
    }
    else{
        let indiceAleatoire = -1;
        do{
            indiceAleatoire = Math.floor(Math.random() * boutons_runner.length);
        }while(boutons_runner[indiceAleatoire].style.display == "none")
        return boutons_runner[indiceAleatoire];
    }
}

let firstProb = [];

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById('selectRandomTeam').addEventListener('click', function() {
        if(chosen_team.length < 16){
            let bouton = selectionnerVariableAleatoire();

            // Afficher la variable dans le rendu HTML
            document.getElementById((chosen_team.length).toString()).textContent = bouton.textContent;
            document.getElementById((chosen_team.length).toString()).classList.remove("disabled");
            document.getElementById((chosen_team.length).toString()).classList.add("animation");
            if(chosen_team.length>0){
                document.getElementById((chosen_team.length-1).toString()).classList.remove("animation");
            }
            disappear_bouton(bouton);
            add_team_to_list_match(bouton);


            if(chosen_team.length == 16){
                document.getElementById('selectRandomTeam').classList.remove('pointer');
                document.getElementById('selectRandomTeam').classList.add('disabled-button');
            }
            if(chosen_team.length == 1){
                document.getElementById('removeTeam').classList.remove('disabled-button');
                document.getElementById('removeTeam').classList.add('pointer');
                document.getElementById('reset').classList.remove('disabled-button');
                document.getElementById('reset').classList.add('pointer');
            }
        }
    });

    document.addEventListener('keydown', function(event) {
        // Check if the pressed key is 'S'
        if (event.key == 'S' || event.key == 's') {
            document.getElementById('blur').classList.toggle('hidden');
            document.getElementById('page').classList.toggle('pointer-events');
          toggleOverlay();
        }
      });

    // Sélectionne le conteneur des boutons des équipes
let buttonTeamContainer = document.getElementById("second-choice")

    // Initialise tous les boutons et affiche dans un premier temps les winners
let taille_boucle = Math.max(Winners.length,Runners_up.length)
for(let i=0; i<taille_boucle;i++){
    if(i<Winners.length){
        let bouton = document.createElement("button");
        bouton.textContent = change_bySpace(Winners[i]);
        bouton.className = "winner";
        bouton.classList.add('pointer');
        bouton.classList.add('boutonDeFonctionnalite');
        bouton.classList.add('margin');
        bouton.setAttribute('id', 'bw'+i);
        buttonTeamContainer.appendChild(bouton);
        boutons_winners.push(bouton);
        bouton.style.display="none";
    }
    if(i<Runners_up.length){
        let bouton = document.createElement("button");
        bouton.textContent = change_bySpace(Runners_up[i]);
        bouton.className = "runner_up";
        bouton.classList.add('pointer');
        bouton.classList.add('boutonDeFonctionnalite');
        bouton.classList.add('margin');
        bouton.setAttribute('id', 'br'+i);
        buttonTeamContainer.appendChild(bouton);
        boutons_runner.push(bouton);
    }
}

    // Affichage du tableau des matchs
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

    // Fait disparaître les boutons quand on clique dessus et les ajoute à liste des matchs
for(let i=0; i<boutons_winners.length; i++) {
    boutons_winners[i].addEventListener("click", function (event) {
        if(affichage_winners) {
            let bouton = event.target;
            // Afficher la variable dans le rendu HTML
            document.getElementById((chosen_team.length).toString()).textContent = bouton.textContent;
            document.getElementById((chosen_team.length).toString()).classList.remove("disabled");
            document.getElementById((chosen_team.length).toString()).classList.add("animation");
            if(chosen_team.length>0){
                document.getElementById((chosen_team.length-1).toString()).classList.remove("animation");
            }
            
            disappear_bouton(bouton);
            add_team_to_list_match(bouton);


            if(chosen_team.length == 16){
                document.getElementById('selectRandomTeam').classList.remove('pointer');
                document.getElementById('selectRandomTeam').classList.add('disabled-button');
            }
            if(chosen_team.length == 1){
                document.getElementById('removeTeam').classList.remove('disabled-button');
                document.getElementById('removeTeam').classList.add('pointer');
                document.getElementById('reset').classList.remove('disabled-button');
                document.getElementById('reset').classList.add('pointer');
            }
        }
    });
} // Même utilité pour cette boucle
for(let i=0; i<boutons_runner.length; i++) {
    boutons_runner[i].addEventListener("click", function (event) {
        if(!affichage_winners) {
            let bouton = event.target;
            // Afficher la variable dans le rendu HTML
            document.getElementById((chosen_team.length).toString()).textContent = bouton.textContent;
            document.getElementById((chosen_team.length).toString()).classList.remove("disabled");
            document.getElementById((chosen_team.length).toString()).classList.add("animation");
            if(chosen_team.length>0){
                document.getElementById((chosen_team.length-1).toString()).classList.remove("animation");
            }
            
            disappear_bouton(bouton);
            add_team_to_list_match(bouton);


            if(chosen_team.length == 16){
                document.getElementById('selectRandomTeam').classList.remove('pointer');
                document.getElementById('selectRandomTeam').classList.add('disabled-button');
            }
            if(chosen_team.length == 1){
                document.getElementById('removeTeam').classList.remove('disabled-button');
                document.getElementById('removeTeam').classList.add('pointer');
                document.getElementById('reset').classList.remove('disabled-button');
                document.getElementById('reset').classList.add('pointer');
            }
        }
    })
}

// bouton undo inclu dans le conteneur de boutons des options
let undo_button = document.getElementById("removeTeam")
// Touche pour revenir en arrière, enlever la dernière équipe ajoutée
undo_button.addEventListener("click", function(event){
    if (chosen_team.length !== 0) {
        if(chosen_team.length == 16){
            document.getElementById('selectRandomTeam').classList.remove('disabled-button');
            document.getElementById('selectRandomTeam').classList.add('pointer');
        }

        document.getElementById((chosen_team.length-1).toString()).textContent = "";
        document.getElementById((chosen_team.length-1).toString()).classList.add('disabled');
        document.getElementById((chosen_team.length-1).toString()).classList.remove("animation");

        let last_team_chosen = chosen_team.pop()
        G_init.matrix = []
        G_init.set_length(0)
        G_init.set_teams([])
        G_init.teams_winners = []
        G_init.teams_runners_up = []
        teams.forEach(element => {
            G_init.add_team(element)
        });
        if(chosen_team.length%2===0){
            for(let i = 0; i < Math.floor(chosen_team.length / 2)-1; i++) {
            G_init.remove_2t(G_init.index_name(chosen_team[2 * i].textContent), G_init.index_name(chosen_team[2 * i + 1].textContent))
            }
        }else{
            for(let i = 0; i < Math.floor(chosen_team.length / 2); i++) {
                G_init.remove_2t(G_init.index_name(chosen_team[2 * i].textContent), G_init.index_name(chosen_team[2 * i + 1].textContent))
            }
        }
        //last_team_chosen.style.display = "block"    // on affiche de nouveau l'équipe
        if (affichage_winners) {
            boutons_runner.push(last_team_chosen)   // on la remet dans la liste des boutons affichés correspondante
        } else {
            boutons_winners.push(last_team_chosen)
        }
        affichage_winners = !affichage_winners      // on rebascule sur l'affichage des autres teams
        boutons_winners.forEach(function (bouton) {   // on change les modes d'affichage des boutons
            if (affichage_winners) {
                // il faut que je rajoute une condition ici
                // test si (proba(chosen_team[last],bouton) !== 0): on affiche le bouton sinon on le fait
                let runner = chosen_team[chosen_team.length - 1].textContent
                let id = 'l'+(runners_resultat.indexOf(runner)+1) + 'c' + (winners_resultat.indexOf(bouton.textContent)+1)
                let cell = document.getElementById(id)
                //console.log(cell.id)
                let index = remove_from_list()
                //console.log(index)
                let index2 = give_index2(changeSpaceby_(bouton.textContent), changeSpaceby_(runner))
                //console.log(index2)
                if (cell) {
                    let nombre = Number(cell.textContent.slice(0, -1));// = resultat[index][index2]
                    if (nombre !== 0) {
                        bouton.style.display = "inline"
                    }
                } else {
                    console.log("la cellule n'existe pas")
                }
            } else {
                disappear_bouton(bouton)
            }
        })
        boutons_runner.forEach(function (bouton) {
            if (!affichage_winners) {
                bouton.style.display = "inline"
            } else {
                disappear_bouton(bouton)
            }
        })
        let number = chosen_team.length + 1     // On enlève les équipes du tableau
        let i = 1-(number % 2)
        let j = Math.floor((number - 1) / 2)
        let cell = document.getElementById((2*j+i).toString())
        cell.textContent = ""
        //change_all()
        //fill_all()
        fill_all2()
        heatmap()
        handleClickTable();

        if(chosen_team.length == 0){
            document.getElementById('removeTeam').classList.remove('pointer');
            document.getElementById('removeTeam').classList.add('disabled-button');
            document.getElementById('reset').classList.remove('pointer');
            document.getElementById('reset').classList.add('disabled-button');
        }
    }
})

// ------------------------- Test du bouton restart -------------------- //
let restart_button = document.getElementById("reset")
restart_button.addEventListener("click",function(event){
    while(chosen_team.length>0){
        undo_button.click()
    }
})

    // Create table
    for(let i=0; i<=runners_resultat.length;i++){
        const newLine = document.createElement("tr");
        newLine.setAttribute("id", 'l'+i);
        for(let j=0; j<=winners_resultat.length; j++){
            if(i==0 || j==0){
                const newCell = document.createElement("th");
                if(i>0){
                    newCell.textContent = runners_resultat[i-1];
                    newCell.classList.add('pointer');
                    newCell.addEventListener('click', function() {
                        // Afficher la variable dans le rendu HTML
                        document.getElementById((chosen_team.length).toString()).textContent = newCell.textContent;
                        document.getElementById((chosen_team.length).toString()).classList.remove("disabled");
                        document.getElementById((chosen_team.length).toString()).classList.add("animation");
                        if(chosen_team.length>0){
                            document.getElementById((chosen_team.length-1).toString()).classList.remove("animation");
                        }
                        
                        let bouton = document.getElementById('br'+(i-1));
                        disappear_bouton(bouton);
                        add_team_to_list_match(bouton);
                        affichage_winners = true;


                        if(chosen_team.length == 16){
                            document.getElementById('selectRandomTeam').classList.remove('pointer');
                            document.getElementById('selectRandomTeam').classList.add('disabled-button');
                        }
                        if(chosen_team.length == 1){
                            document.getElementById('removeTeam').classList.remove('disabled-button');
                            document.getElementById('removeTeam').classList.add('pointer');
                            document.getElementById('reset').classList.remove('disabled-button');
                            document.getElementById('reset').classList.add('pointer');
                        }
                      });
                }
                else if(j>0){
                    newCell.textContent = winners_resultat[j-1];
                    newCell.classList.add('pointer');
                    newCell.addEventListener('click', function() {
                        // Afficher la variable dans le rendu HTML
                        document.getElementById((chosen_team.length).toString()).textContent = newCell.textContent;
                        document.getElementById((chosen_team.length).toString()).classList.remove("disabled");
                        document.getElementById((chosen_team.length).toString()).classList.add("animation");
                        if(chosen_team.length>0){
                            document.getElementById((chosen_team.length).toString()-1).classList.remove("animation");
                        }

                        let bouton = document.getElementById('bw'+(j-1));
                        disappear_bouton(bouton);
                        add_team_to_list_match(bouton);
                        affichage_winners = false;

                        

                        if(chosen_team.length == 16){
                            document.getElementById('selectRandomTeam').classList.remove('pointer');
                            document.getElementById('selectRandomTeam').classList.add('disabled-button');
                        }
                        if(chosen_team.length == 1){
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
    
//fill_all()
fill_all2()
verif_zero()
heatmap();
handleClickTable();
for(let i=0; i<runners_resultat.length;i++){
    firstProb.push([]);
    for(let j=0; j<runners_resultat.length;j++){
        firstProb[i].push(parseFloat(document.getElementById('l'+(i+1)+'c'+(j+1)).textContent));
    }
}

});

