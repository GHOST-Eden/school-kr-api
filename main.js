const express = require('express');
const School = require('school-kr');

const school = new School();

const app = express();

app.get('/school-meal/:schoolName', async (req, res) => {
	const { schoolName } = req.params;
	const result = await school.search(School.Region.SEOUL, schoolName);
	const sN = result[0].name;
	const sC = result[0].schoolCode;
	const sA = result[0].address;
	school.init(School.Type.HIGH, School.Region.SEOUL, sC);
	const meal = await school.getMeal();
	res.json(meal);
});

app.get('/school-calendar/:schoolName', async (req, res) => {
	const { schoolName } = req.params;
	const result = await school.search(School.Region.SEOUL, schoolName);
	var sN = result[0].name;
	var sC = result[0].schoolCode;
	var sA = result[0].address;
	school.init(School.Type.HIGH, School.Region.SEOUL, sC);
	const calendar = await school.getCalendar();
	res.json(calendar);
});

app.listen(process.env.PORT || 3000, () => {
	console.log('서버 시작됨');
});
