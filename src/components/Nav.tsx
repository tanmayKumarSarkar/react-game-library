import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext, AppContextType, Theme } from '../context/appContext';
import { useContext, useState, useEffect } from 'react';

export const Nav = () => {
    const navigate = useNavigate();
    const { searchKey, setSearchKey, theme, setTheme } = useContext<AppContextType>(AppContext);
    const [text, setText] = useState('');
    const { search, pathname } = useLocation();
    
    const onSeacrch = (e: any) => {
        if (e.key === "Enter" || e.key === "Backspace" || e.key === "Delete") {
            if(searchKey!==text){ setSearchKey(text); }
        } 
    }

    const toggleTheme = (selectedTheme: string) => {
        if (selectedTheme == theme.font) {
            setTheme({ color: theme.font, font: theme.color });
        }
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(search);       
        setText(queryParams.get('search')||'');
    }, []);
    
    return (<>
        <div className="container pt-2">
            <div className="row">
                <div className="col-xs-1 col-sm-1 col-sm-4 justify-content-start">
                    { pathname !== '/' && <i className="fa fa-home cursor-pointer" aria-hidden="true" onClick={() => navigate("/")}></i> }
                    {/* <i className="fa fa-arrow-circle-left cursor-pointer" aria-hidden="true" onClick={() => navigate(-1)}></i> &nbsp;
                    <i className="fa fa fa-arrow-circle-right cursor-pointer" aria-hidden="true" onClick={() => navigate(1)}></i> */}
                </div>
                <div className="col-auto">
                    <div className="btn-group btn-group-toggle" role="group" data-toggle="buttons">
                        <i className="fa-regular fa-sun btn btm-sm btn-light border-secondary" style={{width:'38px'}} onClick={()=>toggleTheme(Theme.Light)}></i>
                        <i className="fa-regular fa-moon btn btn-sm btn-dark border-secondary pt-2" style={{width:'38px'}} onClick={()=>toggleTheme(Theme.Dark)}></i>
                        {/* <button type="button" className="btn btm-sm btn-light border-secondary">Light</button>
                        <button type="button" className="btn btn-sm btn-dark border-light">Dark</button> */}
                    </div>
                </div>
                <div className="col">
                        <div className="input-group justify-content-end">
                            <div className="form-outline">
                            <input type="text" className={`form-control bg-${theme.color}`} placeholder="Search Here" aria-label="Search Here" value={text} onChange={(e)=> setText(e.target.value)} 
                                onKeyUp={(e) => onSeacrch(e)}
                            />
                            </div>
                            <button type="button" className="btn btn-primary">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                </div>
            </div>
            <hr/>
        </div>
        
    </>)
}