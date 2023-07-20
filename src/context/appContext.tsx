import { createContext } from 'react'
import { paginationDetailsType } from '../components/Api'
import { Game } from '../redux/Reducers'

export const Theme = { Light: 'light', Dark: 'dark'}
export const initialPageDetails = { pageCount: 0, startIndex: 0, endIndex: 0, pages: [] };

export type AppContextType = {
    pageIndex: number,
    setPageIndex: (pageIndex: number) => void,
    paginationDetails: paginationDetailsType,
    setPaginationDetails: (paginationDetails: paginationDetailsType) => void,
    inPageGames: Game[],
    setInPageGames: (games: Game[]) => void,
    searchKey: string,
    setSearchKey:  (searchKey: string) => void,
    selectTag:string,
    setSelectTag: (selectTag: string) => void,
    theme: { font: string, color: string},
    setTheme: (theme: { font: string, color: string}) => void
}
export const AppContext = createContext<AppContextType>({
    pageIndex: 1,
    setPageIndex: () => { },
    paginationDetails: initialPageDetails,
    setPaginationDetails: () => { },
    inPageGames: [],
    setInPageGames: () => {},
    searchKey: '',
    setSearchKey: () => {},
    selectTag: '',
    setSelectTag: () => {},
    theme: {font:Theme.Dark, color:Theme.Light},
    setTheme: () => {}
});