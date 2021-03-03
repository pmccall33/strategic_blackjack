const express 	= require('express');
const app 		= express();



// routes
app.get

// Get player by id
app.get('api/players/:id', (req, res) => {
	const found = players.some(member => member.id === parseInt(req.params.id));


	found ?
		res.json(players.filter(player => player.id === parseInt(req.params.id)))
		: res.status(400).json({ msg: `No player with id of: ${req.params.id} found` })
})
