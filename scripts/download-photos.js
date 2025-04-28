import fs from 'fs/promises'
import dataJson from '../src/lib/data/A-I.json'

async function downloadPhoto(url) {
	const photoUrl = `https://sierdgtt.mtc.gob.pe${url}`
	const res = await fetch(photoUrl)
	const blob = await res.blob()
	const buffer = await blob.arrayBuffer()
	fs.writeFile('./photo1.jpg', buffer)
}
async function main() {
	const photos = dataJson.filter((p) => p.image).map((q) => q.image)
	downloadPhoto(photos[0])
}

main()
