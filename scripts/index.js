import fs from 'fs/promises'
import { HttpsProxyAgent } from 'https-proxy-agent'
import dotenv from 'dotenv'
dotenv.config()
import { SocksProxyAgent } from 'socks-proxy-agent'

async function getQuestionWithProxy({ category }) {
	const API_KEY = process.env.API_KEY
	const API_URL = process.env.API_URL

	if (!API_KEY && !API_URL) throw new Error('API_KEY or API_URL is not defined')

	return fetch({
		url: `https://api.scraperapi.com/?api_key=${API_KEY}&url=${API_URL}`,
		method: 'POST',
		body: JSON.stringify({ category, exampleType: 'practica' }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then((response) => {
			return response.json()
		})
		.catch((error) => {
			console.log(error)
		})
}

// Función para rotar User-Agents
function getRandomUserAgent() {
	const userAgents = [
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
		'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
		'Mozilla/5.0 (Linux; Android 10; SM-A505FN) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
	]
	return userAgents[Math.floor(Math.random() * userAgents.length)]
}

async function getQuestions({ category }) {
	//selecionar proxy alteatorio
	const proxyUrl = 'http://138.68.60.8:80'

	const agent = new HttpsProxyAgent(proxyUrl)

	//Configurar timeout
	const controller = new AbortController()
	const timeout = setTimeout(() => controller.abort(), 10000) //10 segundos

	try {
		const res = await fetch('https://api-mtc.dhs.pe/exam/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			agent,
			signal: controller.signal,
			body: JSON.stringify({ category, exampleType: 'practica' })
		})

		clearTimeout(timeout)

		const data = await res.json()

		if (!data.success) {
			console.error(`Error con proxy ${proxyUrl}: ${data.error}`)
			throw new Error(data.error)
		}
		return data
	} catch (error) {
		clearTimeout(timeout)
		console.error(`Falló el proxy ${proxyUrl}: ${error.message}`)
		throw error
	}
}

async function main(category) {
	let dataJson

	try {
		dataJson = await import(`../${category}.json`)
	} catch (error) {
		console.log(error)
		dataJson = { default: [] }
	}

	const savedData = new Map(dataJson.default.map((q) => [q.id, q]))
	console.log(`Preguntas ${category} : `, savedData.size)

	// const data = await getQuestions({ category: CATEGORY })
	const data = await getQuestionWithProxy({ category })

	for (const question of data.exam.questions) {
		const savedQuestion = savedData.get(question.id)
		if (!savedQuestion) {
			console.log({ question })
			savedData.set(question.id, question)
		}
	}

	console.log('preguntas totales: ', savedData.size)

	const dataToSaved = Array.from(savedData.values())
	await fs
		.writeFile(`./${category}.json`, JSON.stringify(dataToSaved, null, 2))
		.then((res) => console.log('success'))
		.catch((err) => console.log(err))
}

const categories = [
	// 'A-I',
	// 'A-IIA',
	// 'A-IIB',
	// 'A-IIIA',
	// 'A-IIIB',
	// 'A-IIIC',
	'B-IIA'
	// 'B-IIB',
	// 'B-IIC'
]

for (const category of categories) {
	await main(category)
}
