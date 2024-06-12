import axios, {AxiosRequestConfig} from "axios";
import {ExistingCar, NewCar, UpdatedCar} from '../types';

const getAxiosConfig = (): AxiosRequestConfig => {
	const jwtToken = sessionStorage.getItem('jwtToken');

	return {
		headers: {
			'Authorization': jwtToken,
			'Content-Type': 'application/json'
		}
	};
};

export const getCars = async (): Promise<ExistingCar[]> => {
	const response = await axios.get(
		`${import.meta.env.VITE_API_URL}/api/cars`,
		getAxiosConfig()
	);
	
	return response.data._embedded.cars;
};

export const deleteCar = async (link: string): Promise<ExistingCar> => {
	const response = await axios.delete(link, getAxiosConfig());
	return response.data;
};

export const addCar = async (car: NewCar): Promise<ExistingCar> => {
	const response = await axios.post(
		`${import.meta.env.VITE_API_URL}/api/cars`,
		car,
		getAxiosConfig()
	);

	return response.data;
};

export const updateCar = async (car: UpdatedCar): Promise<ExistingCar> => {
	const response = await axios.put(
		car.url,
		car.car,
		getAxiosConfig()
	);

	return response.data;
};