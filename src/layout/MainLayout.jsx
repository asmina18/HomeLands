
import { Outlet } from 'react-router-dom';
import{Nav} from "../components/Nav/Nav"
import { Footer } from '../components/Footer/Footer'
import { Slideshow } from '../components/Slideshow/Slideshow';

export const MainLayout = () => {

    return (
        <div>
            <Nav/>
            <Slideshow />
            <Outlet />
            <Footer />
        </div>
    )
}

