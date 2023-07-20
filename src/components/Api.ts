import { Game } from "../redux/Reducers";

export const fetchGames = async () : Promise<Game[]> => { 
    return new Promise((res, rej) => {
        fetch('/gamesdata.json').then(gs => gs.json()).then(gs => {
            res(gs);
        }).catch(e=> res([]) );
    })
}

export type paginationDetailsType = { pageCount: number, startIndex: number, endIndex: number, pages: number[] };

export const pagination = (totalItems: number, itemsPerPage: number, pageIndex: number = 1): paginationDetailsType => { 
    
    let pageCnt = Math.ceil(totalItems / itemsPerPage);
    let itemsInPage = 0;
    if (pageIndex < pageCnt) itemsInPage = itemsPerPage;
    else if (pageIndex == pageCnt) itemsInPage = (totalItems % itemsPerPage) == 0 ? itemsPerPage : totalItems % itemsPerPage;
    let showIndexOnPage = 5;
    if (pageCnt < showIndexOnPage) showIndexOnPage = pageCnt;
    let middleIndex = Math.floor(showIndexOnPage / 2), startIndex = 1, endIndex = pageCnt;
    if ((pageIndex - middleIndex) < 1) {
        startIndex = 1;
        endIndex = startIndex + showIndexOnPage - 1;
    }else if ((pageIndex - middleIndex) >= 1 && (pageIndex + middleIndex) <= pageCnt) {
        startIndex = pageIndex - middleIndex;
        endIndex = startIndex + showIndexOnPage - 1;
    }else if ((pageIndex + middleIndex) > pageCnt) {
        endIndex = pageCnt;
        startIndex = endIndex - showIndexOnPage + 1;
    }
    let pages = Array.from({ length: showIndexOnPage }, (value, index) => startIndex + index);
    return {
        pageCount: pageCnt,
        startIndex,
        endIndex, 
        pages
    }
}

async function toDataURL(url: string) {
    const blob = await fetch(url).then(res => res.blob());
    return URL.createObjectURL(blob);
}

async function download(url: string) {
    const a = document.createElement("a");
    a.href = await toDataURL(url);
    a.download = "myImage.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}