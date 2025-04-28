export const STATE = {
	Idle: 0,
	Progress: 2,
	End: 3
}

export const CATEGORIES = [
	{
		category: 'A-I',
		description: 'Vehículos particulares (sedanes, SUVs, pickup, etc.).'
	},
	{
		category: 'A-IIA',
		description: 'Vehículos de transporte público (taxis, buses, ambulancias).'
	},
	{
		category: 'A-IIB',
		description: 'Microbuses y minibuses (hasta 16 o 33 asientos y 4-7 toneladas).'
	},
	{
		category: 'A-IIIA',
		description: 'Vehículos pesados (más de 6 toneladas, como ómnibus).'
	},

	{
		category: 'A-IIIB',
		description: 'Vehículos comerciales (grúas, remolques, volquetes).'
	},

	{
		category: 'A-IIIC',
		description: 'Todos los vehículos de las categorías anteriores (A-I, A-II, A-III).'
	},
	{
		category: 'B-IIA',
		description: 'Bicimotos para transporte de pasajeros o mercancías.'
	},
	{
		category: 'B-IIB',
		description: 'Motocicletas de dos y tres rueda'
	},
	{
		category: 'B-IIC',
		description: 'Mototaxis y trimotos para transporte de pasajeros.'
	}
]
// BIIA: 'BII-A',
// BIIB: 'BII-B',
// AIIA: 'AII-A',
// AIIIA: 'AIII-A',
// AIIIB: 'AIII-B',
// AIIIC: 'AIII-C',
// BIIC: 'BII-C'

// BIIA: 'Categoría BII-A',

export const LIMIT_TIME = 1200
export const MAX_TRIES = 40
