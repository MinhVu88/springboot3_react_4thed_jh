import {useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query'; 
import Dialog from '@mui/material/Dialog'; 
import DialogActions from '@mui/material/DialogActions'; 
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {addCar} from '../api/CarApi';
import {NewCar} from '../types';
import CarDialogContent from './CarDialogContent';

const AddCar = () => {
	const [isOpen, setIsOpen] = useState(false);
	
	const [car, setCar] = useState<NewCar>({
		brand: '', 
		model: '', 
		color: '',
		registrationNumber: '', 
		modelYear: 0, 
		price: 0
	});

	const queryClient = useQueryClient();

	const {mutate} = useMutation(
		addCar,
		{
			onSuccess: () => queryClient.invalidateQueries(['cars']),
			onError: error => console.error(error)
		}
	);

	const handleOpeningDialogForm = () => setIsOpen(true);

	const handleClosingDialogForm = () => setIsOpen(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCar({
			...car,
			[e.target.name]: e.target.value
		});
	};

	const handleSavingNewCar = () => {
		mutate(car);

		setCar({
			brand: '', 
			model: '', 
			color: '', 
			registrationNumber: '', 
			modelYear: 0, 
			price: 0
		});

		handleClosingDialogForm();
	};

	return (
		<>
			<Button onClick={handleOpeningDialogForm}>Add Car</Button> 
			<Dialog open={isOpen} onClose={handleClosingDialogForm}> 
				<DialogTitle>Car Info</DialogTitle> 
				<CarDialogContent car={car} handleInputChange={handleInputChange}/> 
				<DialogActions> 
					<Button onClick={handleClosingDialogForm}>Cancel</Button> 
					<Button onClick={handleSavingNewCar}>Save</Button>
				</DialogActions> 
			</Dialog>
		</>
	);
};

export default AddCar;