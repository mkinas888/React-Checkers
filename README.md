# React Checker with AI
Checkers game implemented using React and Minimax algorithm with alpha beta pruning.

While AI has its move the game tree is created. Its depth equals 5 because of high possibilities number and memory restrictions. Each node has its own value based on which move its represent, which player made that move and the game situation such as number of current player pieces.
Each move has its own value like: 

* simple move forward --- 1 point
* make single beating --- 10 points
* make i beatings --- i * 10 points
* make your piece King --- 25 points
* win game --- 1000 points

The pon is worth 3 points while King is worth 5 points.
Each game tree contains from 15 000 to even more than 1 500 000 nodes per one AI move based on
how many pieces are left and what type they are. Minimax algorithm choose the optimal move of AI player supposing that human player also make his best. Minimax compare node values form leaves to parent node and then return the board which contains move chosen by AI.

Button on the bottom trigers AI move 