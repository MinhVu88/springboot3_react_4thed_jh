import {useState} from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {DataGrid, GridColDef, GridCellParams, GridToolbar} from '@mui/x-data-grid';
import {Snackbar} from '@mui/material';
import IconButton from '@mui/material/IconButton'; 
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button'; 
import Stack from '@mui/material/Stack';
import {getCars, deleteCar} from '../api/CarApi';
import AddCar from './AddCar';
import EditCar from './EditCar';

type CarListProps = {
	logOut?: () => void;
};

const CarList = ({logOut}: CarListProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const queryClient = useQueryClient();

	const {mutate} = useMutation(
		deleteCar,
		{
			onSuccess: () => {
				setIsOpen(true);
				queryClient.invalidateQueries({queryKey: ['cars']});
			},
			onError: error => console.error(error)
		}
	);

	const columns: GridColDef[] = [
		{field: 'brand', headerName: 'Brand', width: 200}, 
		{field: 'model', headerName: 'Model', width: 200}, 
		{field: 'color', headerName: 'Color', width: 200}, 
		{field: 'registrationNumber', headerName: 'Reg.nr.', width: 150}, 
		{field: 'modelYear', headerName: 'Model Year', width: 150}, 
		{field: 'price', headerName: 'Price', width: 150},
		{
			field: 'edit',
			headerName: '',
			width: 90,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			renderCell: (params: GridCellParams) => <EditCar currentCar={params.row}/>
		},
		{
			field: 'delete',
			headerName: '',
			width: 90,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			renderCell: (params: GridCellParams) =>
				<Tooltip title='Remove car'> 
					<IconButton 
						aria-label='delete' 
						size='small' 
						onClick={() => {
							window.confirm(`Do you want to delete ${params.row.brand} ${params.row.model}?`);
							mutate(params.row._links.car.href);
						}}>
							<DeleteIcon fontSize='small' />
					</IconButton>
				</Tooltip>
		}
	];

	const {data, error, isSuccess} = useQuery({
		queryKey: ['cars'],
		queryFn: getCars
	});

	if(!isSuccess) {
		return <span>Loading...</span>;
	} else if(error) {
		return <span>Something's wrong</span>
	} else {
		return <>
			<Snackbar
				open={isOpen}
				autoHideDuration={3000}
				message='Car deleted'
				onClose={() => setIsOpen(false)}
			/>
			<Stack 
				direction='row' 
				alignItems='center' 
				justifyContent='space-between'
			> 
				<AddCar/> 
				<Button onClick={logOut}>Log out</Button>
			</Stack>
			<DataGrid
				rows={data}
				columns={columns}
				slots={{toolbar: GridToolbar}}
				disableRowSelectionOnClick={true}
				getRowId={row => row._links.self.href}
			/>
		</>
	}
};

export default CarList;