import fetch from 'node-fetch'
import { HttpsProxyAgent } from 'https-proxy-agent'

async function testProxy(proxyUrl) {
	// 1. Primero obtenemos nuestra IP real SIN proxy
	const realIpResponse = await fetch('https://api.ipify.org?format=json')
	const realIpData = await realIpResponse.json()
	const realIp = realIpData.ip
	console.log(`IP Real: ${realIp}`)

	// 2. Configuramos el agente del proxy correctamente
	let agent
	try {
		agent = new HttpsProxyAgent(proxyUrl)
	} catch (error) {
		console.error('Error configurando agente proxy:', error)
		return {
			working: false,
			error: 'Configuración de proxy inválida'
		}
	}

	// 3. Realizamos la prueba con el proxy
	const proxyIpResponse = await fetch('https://api.ipify.org?format=json', {
		agent,
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
		}
	})
	const proxyIpData = await proxyIpResponse.json()
	const proxyIp = proxyIpData.ip
	console.log(`IP Proxy: ${proxyIp}`)
}

async function main() {
	const url = 'https://api-mtc.dhs.pe/exam/create'

	await testProxy('https://47.251.122.81:8888')
}
main()
