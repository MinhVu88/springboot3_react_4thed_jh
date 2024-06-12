// CarResponse (in book)
export type ExistingCar = {
	brand: string;
	model: string;
	color: string;
	registrationNumber: string;
	modelYear: number;
	price: number;
	_links: {
		self: {
			href: string;
		},
		car: {
			href: string;
		},
		owner: {
			href: string;
		}
	};
};

// Car (in book)
export type NewCar = {
	brand: string; 
	model: string; 
	color: string; 
	registrationNumber: string; 
	modelYear: number; 
	price: number;
};

// CarEntry (in book)
export type UpdatedCar = {
	car: NewCar;
	url: string;
};