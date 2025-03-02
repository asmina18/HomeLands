
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { Administration } from './components/Admin/Administration';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage'
import { MainLayout } from './layout/MainLayout';
import { UserContextProvider } from './context/UserContext';

import { BoligTilSalgPage } from './pages/BoligTilSalgPage/BoligTilSalgPage';


function App() {

    return (
        <>
            <UserContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<MainLayout />}>
                            <Route index element={<HomePage />} />
                            <Route path='/boliger' element={<BoligTilSalgPage />} />
                            <Route path='/boliger/:id' element={<BoligTilSalgPage />} />
                            <Route path='/admin' element={<Administration />} />
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='/*' element={<ErrorPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UserContextProvider>
        </>
    )
}
export default App

