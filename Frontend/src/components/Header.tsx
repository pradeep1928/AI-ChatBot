
import { Toolbar } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavigationLink from './shared/NavigationLink'
const Header = () => {
    const auth = useAuth()
    return (
        <div>
            <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }} />
            < Toolbar sx={{ display: "flex" }}>
                < Logo />
                {auth?.isLoggedIn ?
                    <>
                        <NavigationLink
                            bg='#00fffc'
                            to='/chat'
                            text='go to chat'
                            textColor='black'
                        />
                        <NavigationLink
                            bg='#51538f'
                            to='/'
                            text='logout'
                            textColor='white'
                            onClink={auth.logout}
                        />
                    </> :
                    <>
                        <NavigationLink
                            bg='#00fffc'
                            to='/login'
                            text='login'
                            textColor='black'
                        />
                        <NavigationLink
                            bg='#51538f'
                            to='/signup'
                            text='SignUp'
                            textColor='white'
                        />

                    </>
                }
            </Toolbar>
        </div>
    )
}

export default Header