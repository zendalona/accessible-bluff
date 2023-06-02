var express =require("express");
var app = express()
var http =require("http").createServer(app)
var io =require("socket.io")(http)

module.exports = { 
    partitionCards:(cardset, roomCapacity) =>{
    const totalCards = cardset.length;
    const cardsPerPlayer = Math.floor(totalCards / roomCapacity);
    console.log(cardsPerPlayer)
    const partitionedCards = [];
    for (let i = 0; i < roomCapacity; i++) {
      const start = i * cardsPerPlayer;
      const end = (i + 1) * cardsPerPlayer;
      partitionedCards.push(cardset.slice(start, end));
    }
    return partitionedCards;
  },
  // Function to be executed after 2 seconds
delayedCode:(cardset,roomCapacity,connectedClients) =>{
    // Code to be executed after 2 seconds
    const partitionedCards = module.exports.partitionCards(cardset,roomCapacity);
          
  // Assuming you have the partitioned array and the client array already assigned with values
  
  // Iterate over the client array and assign subpartitions to each client
  connectedClients.forEach((client, index) => {
    const subpartition = partitionedCards[index]; // Get the corresponding subpartition
    console.log(subpartition);
    // Emit the subpartition to the client
    client.emit('subpartition', subpartition);
  });
  },
 /* emitClientList:(connectedClients)=> {
    // Create an array of client IDs
    const clientIds = connectedClients.map(socket => socket.id);
  
    // Emit the updated client list to all clients
   // io.emit('updateClientList', clientIds);
  },
   assignTurns:(connectedClients) =>{
    // Emit the turn order to each client
    connectedClients.forEach((client, index) => {
      client.emit('playOrder', index + 1);
    });
  },
  
  changeTurn:(connectedClients) =>{
    currentTurnIndex = (currentTurnIndex + 1) % connectedClients.length;
    const nextPlayer = connectedClients[currentTurnIndex];
    
    // Emit an event to the next player indicating it's their turn
    nextPlayer.emit('nextTurn');
  }
  /*executeDuringDelay:(roomId) =>{
    console.log(roomId);
    io.to(roomId).emit('shufflingCards', 'shuffle');
    console.log("the cards are shuffling......")
    // Place your additional code here
  },*/
}