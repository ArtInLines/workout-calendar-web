const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const port = process.env.PORT;
const publicPath = `${__dirname}/public`;

app.use('/assets', express.static(publicPath));
app.use(express.json());

const connectDB = require('./config/connectDB');
connectDB();
const model = require('./models/model');

app.get('/', (req, res) => {
	res.sendFile(`${publicPath}/index.html`);
})
	.get('/download', (req, res) => {
		res.sendFile(`${publicPath}/download.html`);
	})
	.get('/download/:os', (req, res) => {
		res.download(`${__dirname}/downloads/${req.params.os}`, (err) => {
			if (err) console.log(err);
			else console.log('File successfully sent');
		});
	})
	.post('/data', async (req, res) => {
		console.log(req.body);
		const data = await getUser(req.body.userName, true);
		res.status(201).json({ userName: data.user });
	})
	.get('/:userName', async (req, res) => {
		let userName = req.params.userName.toLowerCase();
		const user = await getUser(userName, false);
		if (!user) {
			res.redirect('/');
			return;
		}
		res.sendFile(`${publicPath}/user.html`);
	})
	.get('/:userName/programme', (req, res) => {
		res.redirect(`/${req.params.userName}/program`);
	})
	.get('/:userName/program', async (req, res) => {
		let userName = req.params.userName.toLowerCase();
		const user = await getUser(userName, false);
		if (!user) {
			res.redirect('/');
		} else {
			res.sendFile(`${publicPath}/program.html`);
		}
	})
	.delete('/:userName', async (req, res) => {
		const user = await model.findOneAndDelete({ user: req.params.userName });
		console.log(`Successfully deleted ${user}`);
		res.status(201).json({ success: true });
	})
	.post(`/:userName/data`, async (req, res) => {
		let userName = req.params.userName.toLowerCase();
		const user = await getUser(userName, false);
		res.status(200).json({ success: true, data: user });
	})
	.put(`/:userName/data`, async (req, res) => {
		const user = await model.findOne({ user: req.params.userName });

		let dayFound = false;

		for (let i = 0; i < user.data.length; i++) {
			if (user.data[i].date === req.body.date && user.data[i].month === req.body.month && user.data[i].year === req.body.year) {
				dayFound = true;
				if (req.body.done == 'false') {
					user.data.splice(i, 1);
					console.log('req.body.done == false:', user.data.length);
					break;
				} else {
					user.data[i].done = req.body.done;
					console.log('req.body.done != false:', user.data[i]);
					break;
				}
			}
		}

		console.log('dayFound:', dayFound, '\nUser Data:', user.data.length);

		if (!dayFound) {
			console.log("Day wasn't found");
			user.data.push(req.body);
		}

		user.save();
		res.status(201).json({ success: true, user: user.user, data: user.data });
	});

app.listen(port, console.log(`Server listening on port ${port}`));

async function getUser(userName, createNew) {
	try {
		const user = await model.findOne({ user: userName });
		if (user === null) {
			if (createNew) {
				const newUser = await model.create({ user: userName, data: [] });
				console.log('new user:', newUser);
				return newUser;
			} else {
				return false;
			}
		}
		return user;
	} catch (err) {
		console.log(err);
	}
}
