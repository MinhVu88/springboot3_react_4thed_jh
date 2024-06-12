import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField'; 
import Stack from '@mui/material/Stack';
import {NewCar} from '../types';

type DialogFormProps = {
	car: NewCar;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CarDialogContent = ({car, handleInputChange}: DialogFormProps) => {
	return (
		<DialogContent>
			<Stack spacing={2} mt={1}> 
				<TextField 
					label='Brand' 
					name='brand' 
					value={car.brand} 
					onChange={handleInputChange}
				/>
				<TextField 
					label='Model' 
					name='model' 
					value={car.model} 
					onChange={handleInputChange}
				/>
				<TextField 
					label='Color' 
					name='color' 
					value={car.color} 
					onChange={handleInputChange}
				/>
				<TextField 
					label='Year' 
					name='modelYear' 
					value={car.modelYear} 
					onChange={handleInputChange}
				/>
				<TextField 
					label='Reg.nr' 
					name='registrationNumber' 
					value={car.registrationNumber} 
					onChange={handleInputChange}
				/>
				<TextField 
					label='Price' 
					name='price' 
					value={car.price} 
					onChange={handleInputChange}
				/>
			</Stack>
		</DialogContent>
	);
};

export default CarDialogContent;