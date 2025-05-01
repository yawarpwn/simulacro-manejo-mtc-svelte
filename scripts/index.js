import fs from 'fs/promises'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { SocksProxyAgent } from 'socks-proxy-agent'

async function testProxy(proxyUrl) {
	// 1. Primero obtenemos nuestra IP real SIN proxy
	let realIp
	try {
		const realIpResponse = await fetch('https://api.ipify.org?format=json')
		const realIpData = await realIpResponse.json()
		realIp = realIpData.ip
		console.log(`IP Real: ${realIp}`)
	} catch (error) {
		console.error('Error obteniendo IP real:', error)
		throw new Error('No se pudo determinar la IP real')
	}

	// 2. Configuramos el agente del proxy correctamente
	let agent
	try {
		if (proxyUrl.startsWith('socks')) {
			agent = new SocksProxyAgent(proxyUrl)
		} else {
			agent = new HttpsProxyAgent(proxyUrl)
		}
	} catch (error) {
		console.error('Error configurando agente proxy:', error)
		return {
			working: false,
			error: 'Configuración de proxy inválida'
		}
	}

	// 3. Realizamos la prueba con el proxy
	try {
		// Usamos un servicio diferente al inicial para evitar cache
		const testUrls = [
			'https://ipapi.co/json/',
			'https://ifconfig.me/all.json',
			'http://ip-api.com/json'
		]

		const startTime = Date.now()
		const response = await fetch(testUrls[0], {
			agent,
			timeout: 10000,
			headers: { Accept: 'application/json' }
		})

		if (!response.ok) throw new Error(`HTTP ${response.status}`)

		const proxyIpData = await response.json()
		const proxyIp = proxyIpData.ip || proxyIpData.query

		// Verificación crítica
		if (proxyIp === realIp) {
			throw new Error(`
                El proxy NO está funcionando.
                IP Real: ${realIp}
                IP Proxy reportada: ${proxyIp}
                Proxy usado: ${proxyUrl}
            `)
		}

		// Verificación adicional
		const secondResponse = await fetch(testUrls[1], { agent })
		const secondIpData = await secondResponse.json()
		const secondIp = secondIpData.ip_addr || secondIpData.ip

		if (proxyIp !== secondIp) {
			throw new Error(`IP inconsistente entre servicios (${proxyIp} vs ${secondIp})`)
		}

		return {
			working: true,
			proxyUrl: proxyUrl,
			yourIp: realIp,
			proxyIp: proxyIp,
			location: proxyIpData.country || proxyIpData.country_name,
			latency: Date.now() - startTime
		}
	} catch (error) {
		console.error(`Fallo en proxy ${proxyUrl}:`, error.message)
		return {
			working: false,
			proxyUrl: proxyUrl,
			yourIp: realIp,
			error: error.message
		}
	}
}

async function getRandomProxy() {
	const proxiesUrl =
		'https://api.proxyscrape.com/v4/free-proxy-list/get?request=display_proxies&proxy_format=protocolipport&format=json'

	try {
		const response = await fetch(proxiesUrl)
		const data = await response.json()

		// Filtrar y ordenar proxies por calidad
		const qualityProxies = data.proxies
			.filter((proxy) => {
				// Filtros básicos
				return (
					proxy.alive &&
					proxy.anonymity === 'elite' &&
					proxy.uptime > 50 &&
					proxy.timeout < 1000 &&
					proxy.times_alive > proxy.times_dead
				)
			})
			.sort((a, b) => {
				// Ordenar por calidad (uptime, timeout, antigüedad)
				const scoreA = a.uptime * 0.6 - a.timeout * 0.3 + a.alive_since * 0.1
				const scoreB = b.uptime * 0.6 - b.timeout * 0.3 + b.alive_since * 0.1
				return scoreB - scoreA // Orden descendente
			})
			.slice(0, 20) // Tomar los 10 mejores

		if (qualityProxies.length === 0) {
			throw new Error('No se encontraron proxies de calidad')
		}

		// Seleccionar aleatoriamente entre los 3 mejores para distribuir carga
		const selectedProxy =
			qualityProxies[Math.floor(Math.random() * Math.min(20, qualityProxies.length))]

		console.log(
			`Proxy seleccionado: ${selectedProxy.proxy} | Uptime: ${selectedProxy.uptime}% | Timeout: ${selectedProxy.timeout}ms`
		)
		return selectedProxy.proxy
	} catch (error) {
		console.error('Error al obtener proxies:', error.message)
		throw error
	}
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

const CATEGORY = 'A-IIIA'
async function main() {
	let dataJson

	try {
		dataJson = await import(`../${CATEGORY}.json`)
	} catch (error) {
		console.log(error)
		dataJson = { default: [] }
	}

	const savedData = new Map(dataJson.default.map((q) => [q.id, q]))
	console.log('Preguntas guardadas: ', savedData.size)

	const data = await getQuestions({ category: CATEGORY })

	for (const question of data.exam.questions) {
		const savedQuestion = savedData.get(question.id)
		if (!savedQuestion) {
			savedData.set(question.id, question)
		}
	}

	console.log('preguntas totales: ', savedData.size)

	const dataToSaved = Array.from(savedData.values())
	fs.writeFile(`./${CATEGORY}.json`, JSON.stringify(dataToSaved, null, 2))
		.then((res) => console.log('success'))
		.catch((err) => console.log(err))
}
main()
