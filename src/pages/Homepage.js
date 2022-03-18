import React,{useState,useEffect} from 'react';
import Search from '../components/Search';
import Picture from '../components/Picture';


const Homepage = () => {
  const [input,setInput] = useState("");
  let [data,setData] = useState(null);
  let [page,setPage] = useState(2);
  let [currentSearch,setCurrentSearch] = useState("");
  const auth = "563492ad6f9170000100000170505e6caef24d0d8539f5c95c26d05b";
  const initURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;

  // fetch data from pexels api
  const search = async (url) =>{
      setPage(2);
      const dataFetch = await fetch(url,{ // 參考 weather 筆記第 11,12
        method:"GET",
        headers:{Accept:"application/json",Authorization:auth}
      });
      let parserData = await dataFetch.json();
      //setData(parserData);
      setData(parserData.photos); // 只需要 object 裡的 photos
      

  }

  // load more picture
  // 1. 從精選相片獲得更多
  // 2. 從搜尋相片獲得更多
  const morepicture = async () => {
      let newUrl;
      if(currentSearch === "" ){
        newUrl = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
      }
      else{
        newUrl = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=${page}`;
      }
      setPage(page + 1);
      const dataFetch = await fetch(newUrl,{ 
        method:"GET",
        headers:{Accept:"application/json",Authorization:auth}
      });
      let parserData = await dataFetch.json();
      setData(data.concat(parserData.photos)); 
  }

  // fetch data when the page loads up
  useEffect(() =>{
    search(initURL);
  },[]);

  
  // 解決 search 發生的 JSX Closure
  useEffect(() =>{
    // 程式一跑,
    // 這裡會先被執行一次,
    // 此時 currentSearch 還是空的,
    // 要執行 search(initURL)
    if(currentSearch === "")
      search(initURL);
    else
      search(searchURL);
  },[currentSearch]);

  
  return (
    <div>
        <Search search={() =>{
          // JSX Closure
          // 即使先 setCurrentSearch 成 input,
          // 還是會先執行 search(searchURL),
          // 所以此時 currentSearch 還是 ""空字串,
          // searchURL 裡還是 "" 空字串
          // 解法 : 使用 useEffect
          setCurrentSearch(input);  
          //search(searchURL);
          }} setInput={setInput}/>
        <div className="pictures">
          {
               //在 JavaScript 中，true && expression 總是回傳 expression ，而 false && expression 總是回傳 false
               // 所以，當條件為 true 時，&& 右側的 element 會出現在輸出中，如果是 false，React 會忽略並跳過它。
               data // 判斷不為 null
               && data.map(d =>{
                return <Picture data={d} />;
              })
          } 
        </div>

        <div className="morePicture">
          <button onClick={morepicture}>Load More</button>
        </div>
    </div>
  )
}

export default Homepage