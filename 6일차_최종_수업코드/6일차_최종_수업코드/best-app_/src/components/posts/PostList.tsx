import { Link } from "react-router-dom";
import { usePostStore } from "../../stores/postStore";
import { useEffect } from "react";

const PostList:React.FC=()=>{
    const fetchPostList = usePostStore(s=> s.fetchPostList)
    const postList = usePostStore(s=>s.postList)
    const totalCount = usePostStore(s=>s.totalCount)
    const totalPages = usePostStore(s=>s.totalPages)
    const page = usePostStore(s=>s.page)
    const setPage = usePostStore(s=>s.setPage)
    
    useEffect(()=>{
        fetchPostList();
    },[page])
    const pageBlock = 5;
    const startPage =Math.floor( (page-1)/pageBlock  ) * pageBlock +1;
    const endPage =Math.min(startPage + (pageBlock-1), totalPages);
    /**
     * 페이지 블럭 처리 위한 연산
     * Prev [1][2][3][4][5] Next|Prev [6][7][8][9][10] Next |Prev [11][12][13][14][15] Next 
     * 
     * page         pageBlock           startPage           endPage
     * 1~5              5                   1               5
     * 6~10                                 6               10
     * 11~15                                11              15    
     * startPage = Math.floor( (page-1)/pageBlock  ) * pageBlock +1;
     * endPage = Math.min(startPage + (pageBlock-1), totalPages)
     */


    return (
        <div className="post-list">
            <h3>총 게시글 수: {totalCount} 개,   {page} page/ {totalPages} pages</h3>    
            {postList.map((post,index)=>(
                <div key={post.id??index} className="d-flex my-3 p-3" style={{background:'#efefef', borderRadius:10}}>
                <div style={{width:'25%'}}>
                    <img src={ 
                        post.file? `http://localhost:7777/uploads/${post.file}`:
                        `http://localhost:7777/images/noimage.png`} 
                    alt={post.title} className="postImage"/>
                </div>
                <div className="flex-grow-1 ms-3">
                    <h5>작성자: {post.writer}
                    <br/>
                    <small className="text-muted">
                        <i>Posted on {post.wdate} </i>
                    </small>
                    </h5>
                    <Link to={`/posts/${post.id}`}>
                        <h2>{post.title}</h2>
                    </Link>

                </div>
            </div>))}
            {/* 페이지 네비게이션 자리 ----------- */}
            <div className="text-center">
                        {/* for(let i=1;i<=totalPage;i++) <button>i</button>  
                            for(let i=startPage; i<= endPage;i++) <button>i</button>  
                        */}
                {startPage>1 && (
                    <button onClick={()=> setPage(startPage-1)} className="btn btn-outline-primary mx-1">Prev</button>
                )

                }        
                {Array.from({length: endPage-startPage +1 },(_, i)=> i+startPage).map((n)=>(
                    <button key={n}   onClick={()=> setPage(n)}
                    className={`btn ${n===page?'btn-primary':'btn-outline-primary'}   mx-1`}>
                        {n}
                    </button>
                ))
                } 
                {endPage<totalPages &&(
                    <button onClick={()=> setPage(endPage+1)} className="btn btn-outline-primary mx-1">Next</button>
                )
                }       
            </div>

        </div>
    )
}
export default PostList;