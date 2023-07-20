import { useAppSelector, useAppDispatch } from "../redux/Store"
import { GameItem } from "./GameItem";
import { useEffect, useState, useContext } from 'react'
import { Game } from '../redux/Reducers';
import { pagination } from "./Api";
import { AppContext, AppContextType } from "../context/appContext";
import { Link, useLocation } from 'react-router-dom';

export const GameList = ({fltrdGames}: {fltrdGames: Game[]}) => {

    const { pageIndex, setPageIndex, inPageGames, setInPageGames, paginationDetails, setPaginationDetails, searchKey, setSearchKey, selectTag, setSelectTag, theme } = useContext<AppContextType>(AppContext);
    const { games: allGames } = useAppSelector(state => state.games);

    const dispatch = useAppDispatch();
    const { search, pathname } = useLocation();
    const queryParams = new URLSearchParams(search);
    const key = queryParams.get('search');
    const tag = queryParams.get('tag');
    
    useEffect(() => { 
        if (!!key) setSearchKey(key)
        if (!!tag) setSelectTag(tag);
    }, [])
    
    const changePage = (num: number) => {
        if (pageIndex + num < 1 || pageIndex + num > paginationDetails?.endIndex) return;
        setPageIndex(pageIndex + num);
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col"> Showing { inPageGames.length }/ { fltrdGames.length } Games </div>
                    <div className="col-auto">
                        <ul className="pagination">
                            <li className={`page-item ${pageIndex==1? 'disabled' : ''}`} onClick={()=>{ changePage(-1)}}>
                            <a className= {`page-link cursor-pointer bg-${theme.color}`} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                            </li>

                            {paginationDetails.pages.map(p => (
                                <li className={`page-item ${pageIndex==p? 'disabled' : ''}`} key={p} 
                                    onClick={()=>{ changePage(p-pageIndex)}}
                                ><a className={`page-link cursor-pointer bg-${theme.color}`} >{p}</a></li>
                            ))}
                            
                            <li className={`page-item ${pageIndex==paginationDetails?.endIndex? 'disabled' : ''}`} onClick={()=>{ changePage(1)}}>
                            <a className={`page-link cursor-pointer bg-${theme.color}`} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    {inPageGames.map(game => { 
                        return (
                            <div className="col-xs-11 col-sm-12 col-md-6 col-lg-4 col-xl-3" key={game.id}>
                                <GameItem game={game}></GameItem>
                            </div>
                        )
                     }) }
                    
                </div>
            </div>
            
        </>
    )
}