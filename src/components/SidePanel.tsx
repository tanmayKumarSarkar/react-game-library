import { AppContext, AppContextType, Theme } from "../context/appContext";
import { useAppSelector, useAppDispatch } from "../redux/Store"
import { useContext } from "react";

export const SidePanel = () => {
    
    const { genres: allGenres } = useAppSelector(state => state.genres);
    const { selectTag, setSelectTag, theme } = useContext<AppContextType>(AppContext);
    
    const onTagSelect = (tag: string) => {
        setSelectTag(tag);
    }

    return (<>
        <div className={`d-flex flex-column flex-shrink-0 p-3 border bg-${theme.color}`} >
            <a href="/" className={`d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none link-${theme.font}`}>
                <span><i className="fa fa-solid fa-globe"></i></span>
                <span className="ms-2 fs-4">Game Library</span>
            </a>
            <hr/>
            <ul className="nav nav-pills flex-column" style={{fontSize:'12px'}}>
                <li className="nav-item cursor-pointer" onClick={()=>onTagSelect('')}>
                    <a className={`nav-link ${selectTag=='' && 'active'}`} aria-current="page">
                    <i className="fa fa-tags me-2" aria-hidden="true"></i>
                        All
                    </a>
                </li>
                {allGenres.map(genre => {
                    return (
                        <li className="nav-item cursor-pointer" key={genre} onClick={()=>onTagSelect(genre)}>
                            <a className={`nav-link ${selectTag==genre && 'active'}`} aria-current="page">
                            <i className="fa fa-tags me-2" aria-hidden="true"></i>
                                { genre }
                            </a>
                        </li>
                    )
                }) }
            </ul>
            <hr/>
            <div className="dropdown ">
                <a href="#" className={`d-flex align-items-center text-decoration-none dropdown-toggle link-${theme.font}`} id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://avatars.githubusercontent.com/u/10758438?v=4" alt="" width="32" height="32" className="rounded-circle me-2"/>
                    <strong>Tanmay Kr Sarkar</strong>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><a className="dropdown-item" href="#">New game...</a></li>
                    <li><a className="dropdown-item disabled" href="#">Settings</a></li>
                    <li><a className="dropdown-item disabled" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item disabled" href="#">Sign out</a></li>
                </ul>
            </div>
        </div>
    </>)


}