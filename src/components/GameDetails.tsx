
import { Game } from '../redux/Reducers';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../redux/Store"
import { useContext } from 'react';
import { AppContext, AppContextType } from '../context/appContext';

export const GameDetails = ({ games }: {games: Game[]}) => {

    const navigate = useNavigate();
    // const { search, pathname } = useLocation();
    const gameId = useParams().id;
    let game = games.filter(g => g.id === parseInt(gameId || '0'))[0];
    const { games: allGames } = useAppSelector(state => state.games);
    if (!game) {         
        game = allGames.filter(g => g.id === parseInt(gameId || '0'))[0];
    }

    const { theme } = useContext<AppContextType>(AppContext);
    
    return (
        <>  { !!game? 
            <div className="card mb-1 p-2 text-center">
                <a href={game.game_url}><img className="card-img-top" src={game.thumbnail} alt={game.title} /></a>
                <div className = {`card-body p-0 bg-${theme.color}`}>
                    <div className="card-title">
                        <div className="row">
                            <span className="col-1 ps-3"><i className="fa fa-solid fa-gamepad"></i></span>
                            <div className="col-10">
                                <div
                                    style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                    className="text text-primary ">{game.title}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col"># {game.id}</div>
                            <div className="col">{game.developer}</div>
                            <div className="col">{game.platform}</div>
                        </div>
                        <div className="row">
                        <div className="col">{game.publisher}</div>
                            <div className="col"><i className="fa fa-tags me-2" aria-hidden="true"></i> {game.genre}</div>
                            <div className="col">{ (new Date(game.release_date)).toDateString()}</div>
                        </div>
                        <div className="row">
                            <div className="col">{game.short_description}</div>
                        </div>
                    </div>
                </div>
            </div>
            : <div className="card mb-1 text-center"><h3> Item not Found</h3></div>}
        </>
    )
}