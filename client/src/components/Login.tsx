import {useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button'; 
import TextField from '@mui/material/TextField'; 
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import CarList from './CarList';

type User = {
	username: string;
	password: string;
};

const Login = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [user, setUser] = useState<User>({
		username: '',
		password: ''
	});

	const [isAuth, setIsAuth] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	};

	const handleLogin = () => {
		axios.post(
			import.meta.env.VITE_API_URL + '/login',
			user,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		).then(response => {
			const jwtToken = response.headers.authorization;

			if(jwtToken != null) {
				sessionStorage.setItem('jwtToken', jwtToken);
				setIsAuth(true);
			}
		}).catch(() => setIsOpen(true));
	};

	const handleLogout = () => {
		setIsAuth(false);
		sessionStorage.setItem('jwtToken', '');
	};

	if(isAuth) {
		return <CarList logOut={handleLogout}/>;
	} else {
		return ( 
			<Stack spacing={2} alignItems='center' mt={2}> 
				<TextField 
					name='username' 
					label='Username' 
					onChange={handleInputChange}/>
				<TextField 
					type='password' 
					name='password' 
					label='Password' 
					onChange={handleInputChange}/>
				<Tooltip title='username: user/admin | password: user/admin'>	
					<Button 
						variant='outlined' 
						color='primary' 
						onClick={handleLogin}
					>
						Login
					</Button>
				</Tooltip>
				<Snackbar
					open={isOpen}
					autoHideDuration={3000} 
					onClose={() => setIsOpen(false)} 
					message='Login failed: Invalid Credentials'
				/> 
			</Stack> 
		);
	}
};

export default Login;