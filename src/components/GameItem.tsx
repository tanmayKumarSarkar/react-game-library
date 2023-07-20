import { useContext } from 'react';
import { Game } from '../redux/Reducers';
import { Link } from 'react-router-dom';
import { GameDetails } from './GameDetails';
import { AppContext, AppContextType } from '../context/appContext';

export const GameItem = ({ game }: { game: Game }) => {
    const { theme } = useContext<AppContextType>(AppContext);
    
    return (
        <>
            <div className="card mb-1 text-center">
                <Link to={{ pathname: `/game/${game.id}` }}><img className="card-img-top" src={game.thumbnail} alt={game.title} /></Link>
                <div className={`card-body p-0 bg-${theme.color}`}>
                    <div className="card-title">
                        <div className="row">
                            <span className="col-1 ps-3"><i className="fa fa-solid fa-gamepad"></i></span>
                            <div className="col-10">
                                <div
                                    style={{ whiteSpace:'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
                                    className="text text-primary ">{game.title}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">{ game.publisher }</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}