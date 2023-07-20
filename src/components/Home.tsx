import { useEffect, useState, useContext } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/Store"
import { GameList } from "./GameList";
import { Game, loadGames, loadGenres } from '../redux/Reducers';
import { fetchGames, pagination } from './Api';
import { SidePanel } from './SidePanel';
import { Nav } from './Nav';
import { AppContext, Theme } from '../context/appContext';
import { GameDetails } from './GameDetails';

export const Home = () => {

    const [allGames, setAllGames] = useState<Game[]>([]);
    const [genre, setGenre] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    const [pageIndex, setPageIndex] = useState<number>(1);
    const [searchKey, setSearchKey] = useState<string>('');
    const [selectTag, setSelectTag] = useState<string>('');
    const [theme, setTheme] = useState<{font:string, color:string}>({font:Theme.Dark, color:Theme.Light});

    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [inPageGames, setInPageGames] = useState<Game[]>([]);

    const initialPageDetails = { pageCount: 0, startIndex: 0, endIndex: 0, pages: [] };
    const [paginationDetails, setPaginationDetails] = useState<{ pageCount: number, startIndex: number, endIndex: number, pages: number[] }>(initialPageDetails);
    const itemsPerPage = 12;

    const navigate = useNavigate();

    useEffect(() => {       
        fetchGames().then(gms => {
            setAllGames(() => gms);
            dispatch(loadGames(gms));
        });
    }, [])

    useEffect(() => { 
        distinctGenres();
        filterGames();
        // setFilteredGames(allGames);
    }, [allGames])

    const distinctGenres = () => { 
        const gnrs = [...new Set(allGames.map(g => g.genre))];
        setGenre(() => gnrs);
        dispatch(loadGenres(gnrs));
    }

    useEffect(() => { 
        let newInPageGames = filteredGames.slice((pageIndex - 1) * itemsPerPage, pageIndex*itemsPerPage);
        setInPageGames(newInPageGames);
        let pgDetails = pagination(filteredGames.length, itemsPerPage, pageIndex)
        setPaginationDetails(pgDetails);
    }, [filteredGames, pageIndex])

    useEffect(() => {
        filterGames();
        // let newFilteredGames = allGames.filter(g => g.genre.toLowerCase().includes(selectTag.toLowerCase()));
        // newFilteredGames = newFilteredGames.filter(g => g.title.toLowerCase().includes(searchKey.toLowerCase()) || g.publisher.toLowerCase().includes(searchKey.toLowerCase()));
        // setFilteredGames(newFilteredGames);
        if ((!!searchKey || !!selectTag)) {
            navigate(`/${(!!searchKey || !!selectTag) ? `?${searchKey ? `search=${searchKey}` : ''}${(!!searchKey && !!selectTag) ? '&' : ''}${selectTag ? `tag=${selectTag}` : ''}` : ''}`)
        }
    }, [searchKey, selectTag]);

    const filterGames = () => {
        let newFilteredGames = allGames.filter(g => g.genre.toLowerCase().includes(selectTag.toLowerCase()));
        newFilteredGames = newFilteredGames.filter(g=> g.title.toLowerCase().includes(searchKey.toLowerCase()) || g.publisher.toLowerCase().includes(searchKey.toLowerCase()));
        setFilteredGames(newFilteredGames);
    }
    
    return (
        <>  
            <AppContext.Provider value={{pageIndex, setPageIndex, paginationDetails, setPaginationDetails, inPageGames, setInPageGames, searchKey, setSearchKey, selectTag, setSelectTag, theme, setTheme}}>
                <div className={`container-fluid theme-${theme.color}`}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-5 col-md-4 col-xl-3 min-vh-100 ps-0">
                            <SidePanel></SidePanel>
                        </div>
                        <div className="col ">
                            <div className="row">
                                <div className="col">
                                    <Nav></Nav>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <Routes>
                                        <Route path='/' element={<GameList fltrdGames={filteredGames}></GameList>}/>
                                        <Route path='/game/:id' element={<GameDetails games={ inPageGames }/>}/>
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppContext.Provider>
            
        </>
    )
}
