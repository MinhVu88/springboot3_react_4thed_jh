import {useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import Dialog from '@mui/material/Dialog'; 
import DialogActions from '@mui/material/DialogActions'; 
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'; 
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import {ExistingCar, NewCar, UpdatedCar} from '../types';
import CarDialogContent from './CarDialogContent';
import {updateCar} from '../api/CarApi';

type CarUpdateFormProps = {
	currentCar: ExistingCar;
};

const EditCar = ({currentCar}: CarUpdateFormProps) => {
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
		updateCar,
		{
			onSuccess: () => queryClient.invalidateQueries(['cars']),
			onError: error => console.error(error)
		}
	);

	const handleOpeningDialogForm = () => {
		setCar({
			brand: currentCar.brand,
			model: currentCar.model,
			color: currentCar.color,
			registrationNumber: currentCar.registrationNumber,
			modelYear: currentCar.modelYear,
			price: currentCar.price
		});
		
		setIsOpen(true);
	};

	const handleClosingDialogForm = () => setIsOpen(false);
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCar({
			...car,
			[e.target.name]: e.target.value
		});
	};

	const handleSavingCarUpdates = () => {
		const url = currentCar._links.self.href;

		const modifiedCar: UpdatedCar = {car, url};
		
		mutate(modifiedCar);
		
		setCar({
			brand: '', 
			model: '', 
			color: '', 
			registrationNumber: '', 
			modelYear: 0, 
			price: 0
		});
		
		setIsOpen(false);
	};

	return (
		<>
			<Tooltip title='Edit car'>
				<IconButton 
					aria-label='edit' 
					size='small' 
					onClick={handleOpeningDialogForm}
				>
					<EditIcon fontSize='small'/>
				</IconButton>
			</Tooltip>
			<Dialog open={isOpen} onClose={handleClosingDialogForm}>
				<DialogTitle>Edit car</DialogTitle>
				<CarDialogContent car={car} handleInputChange={handleInputChange}/>
				<DialogActions>
					<Button onClick={handleClosingDialogForm}>Cancel</Button>
					<Button onClick={handleSavingCarUpdates}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default EditCar;