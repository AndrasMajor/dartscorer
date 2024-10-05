let set = 0;
let leg = 0;
let score = 0;
let name1 = "";
let name2 = "";
let player1_legs = 0;
let player1_sets = 0;
let player2_legs = 0;
let player2_sets = 0;
let player1_score = 0;
let player2_score = 0;
let player1_points = 0;
let player2_points = 0;
let player1_rounds = 0;
let player2_rounds = 0;

function initialize() {
    document.getElementById('player1').innerHTML = name1;
    document.getElementById('player2').innerHTML = name2;
    document.getElementById('score1').innerHTML = score;
    document.getElementById('score2').innerHTML = score;
    player1_score = score;
    player2_score = score;
}

function gameFc() {
    // Retrieve values from input fields
    set = document.getElementById('set').value;
    leg = document.getElementById('leg').value;
    score = document.querySelector("#valasztas").value;
    name1 = document.querySelector("#name1").value;
    name2 = document.querySelector("#name2").value;
    initialize();
}

function restartGame() {
    document.getElementById('player1').innerHTML = '';
    document.getElementById('player2').innerHTML = '';
    document.getElementById('score1').innerHTML = '';
    document.getElementById('score2').innerHTML = '';
    document.querySelector("#set").value = '';
    document.querySelector("#leg").value = '';
    document.querySelector("#name1").value = '';
    document.querySelector("#name2").value = '';
    document.querySelector("#valasztas").value = '301';
    document.querySelector("#player1_avg").innerHTML = '0';
    document.querySelector("#player2_avg").innerHTML = '0';
    document.querySelector("#player1_legs").innerHTML = '0';
    document.querySelector("#player2_legs").innerHTML = '0';
    document.querySelector("#player1_sets").innerHTML = '0';
    document.querySelector("#player2_sets").innerHTML = '0';
    player1_legs = 0;
    player1_sets = 0;
    player2_legs = 0;
    player2_sets = 0;
    player1_points = 0;
    player2_points = 0;
    player1_rounds = 0;
    player2_rounds = 0;
}

function resetScores()
{
    player1_score = score;
    player2_score = score;
    document.getElementById('score1').innerHTML = score;
    document.getElementById('score2').innerHTML = score;
}

function player1_wisLeg()
{
    player1_legs++;
    console.log(leg == player1_legs)
    if(player1_legs == leg)
    {
        player1_sets++;
        if(player1_sets == set)
        {
            document.getElementById('player1_sets').innerHTML = player1_sets;
            alert(name1 + " has won the game");
        }
        else
        {
            document.getElementById('player1_sets').innerHTML = player1_sets;
            document.getElementById('player1_legs').innerHTML = 0;
            document.getElementById('player2_legs').innerHTML = 0;
            player1_legs = 0;
            player2_legs = 0;
        }
    }
    else{
        document.getElementById('player1_legs').innerHTML = player1_legs;
    }
    resetScores();
}

function player2_wisLeg()
{
    player2_legs++;
    if(player2_legs == leg)
    {
        player2_sets++;
        if(player2_sets == set)
        {
            document.getElementById('player2_sets').innerHTML = player2_sets;
            alert(name2 + " has won the game");
        }
        else
        {
            document.getElementById('player2_sets').innerHTML = player2_sets;
            document.getElementById('player1_legs').innerHTML = 0;
            document.getElementById('player2_legs').innerHTML = 0;
            player1_legs = 0;
            player2_legs = 0;
        }
    }
    else{
        document.getElementById('player2_legs').innerHTML = player2_legs;
    }
    resetScores();
}

function handleScoreInput(event, player) {
    if (event.key === 'Enter') {
        let value = parseInt(event.target.value);
        if (!isNaN(value)) {
            if (player === 'player1' && value <= 180) {
                if (player1_score - value < 0){
                    player1_score = player1_score;
                    player1_rounds++;
                }
                else if(player1_score - value === 0 && value <= 180)
                {
                    player1_score = 0;
                    player1_points += value;
                    player1_rounds++;
                    player1_wisLeg();
                }
                else if(player1_score - value === 1){
                    player1_score = player1_score;
                    player1_rounds++;
                }
                else{   
                    if(value <= 180)
                    {
                        player1_score -= value;
                        player1_points += value;
                        player1_rounds++;
                    }
                }
                document.getElementById('score1').innerHTML = player1_score;
                document.getElementById('player1_avg').innerHTML = (player1_points/player1_rounds).toFixed(2);
                // Automatikus váltás player2 input mezőre
                document.getElementById('player2score').focus();
                
            } else if (player === 'player2' && value <= 180) {
                if (player2_score - value < 0){
                    player2_score = player2_score;
                    player2_rounds++;
                }
                else if(player2_score - value === 0 && value <= 180)
                {
                    player2_score = 0;
                    player2_points += value;
                    player2_rounds++;
                    player2_wisLeg();
                }
                else if(player2_score - value === 1){
                    player2_score = player2_score;
                    player2_rounds++;
                }
                else{
                    if(value <= 180)
                    {
                        player2_score -= value;
                        player2_points += value;
                        player2_rounds++;
                    } 
                }
                document.getElementById('score2').innerHTML = player2_score;
                document.getElementById('player2_avg').innerHTML = (player2_points/player2_rounds).toFixed(2);
                // Automatikus váltás player2 input mezőre
                document.getElementById('player1score').focus();
            }
        }
        event.target.value = ''; // Törli az input mezőt
    }
}

function init() {
    document.getElementById('startgomb').onclick = gameFc;
    document.getElementById('restartgomb').onclick = restartGame;

    // Enter esemény figyelése a játékosok input mezőinél
    document.getElementById('player1score').addEventListener('keydown', function(event) {
        handleScoreInput(event, 'player1');
    });

    document.getElementById('player2score').addEventListener('keydown', function(event) {
        handleScoreInput(event, 'player2');
    });
}

window.onload = init;
