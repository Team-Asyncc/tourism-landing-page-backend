const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	const data = fs.readFileSync('./data.json');
	console.log(data.toString());
	res.send(data.toString());
});

app.put('/add', (req, res) => {
	try {
		const prevData = fs.readFileSync('./data.json').toString();
		const objData = JSON.parse(prevData);
		objData.push(req.body);
		fs.writeFileSync('./data.json', JSON.stringify(objData));
		res.status(200).send();
	} catch (e) {
		res.status(400).send(e.message);
	}
});

app.listen(PORT, () => {
	console.log(`server is up on http://localhost:${PORT}`);
});
