import React,{useState,useEffect} from 'react'
import { collection,deleteDoc,getDocs,onSnapshot,where,query } from 'firebase/firestore'
import { firestore } from '../firebase/firebaseConfig'
import BlogSection from '../component/BlogSection';
import Spinner from '../component/Spinner';
import { doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Tags from '../component/Tags';
import MostPopular from '../component/MostPopular';
import Trending from '../component/Trending';

const Home = ({setActive,user}) => {
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState([]);
    const [tags,setTags] = useState([]);
    const [trendBlogs, setTrendBlogs] = useState([]);

    const getTrendingBlogs=async()=>{
        const blogRef = collection(firestore,"blogs");
        const trendQuery = query(blogRef,where("trending","==","yes"));
        const querySnapshot = await getDocs(trendQuery);
        let trendBlogs = [];
        querySnapshot.forEach((doc)=>{
            trendBlogs.push({id:doc.id,...doc.data()})
        })
        setTrendBlogs(trendBlogs)
    }

    useEffect(()=>{
        getTrendingBlogs();
        const unsub = onSnapshot(collection(firestore,"blogs"),
        (snapshot)=>{
            let list = [];
            let tags = [];
            snapshot.docs.forEach((doc)=>{
                tags.push(...doc.get("tags"));
                list.push({id:doc.id,...doc.data()})
            });
            const uniqueTags = [...new Set(tags)];
            setTags(uniqueTags);
            setBlogs(list);
            setLoading(false)
        },
        (error)=>{
            console.log(error)
        }
        );
        return ()=>{
            unsub();
            getTrendingBlogs();
        }
    },[]);
    if(loading){
        return <Spinner/>
    }
    // console.log(blogs)

   const handleDelete = async(id)=>{
    if(window.confirm("Are you sure you want to delete that blog?")){
        try{
            setLoading(true);
            await deleteDoc(doc(firestore,"blogs",id));
            toast.success("Blog deleted successfully!!!")
            setLoading(false)
        }
        catch(err){
            console.log(err)
        }
    }
   }

  return (
   <div className='container-fluid pb-4 pt-4 padding'>
    <div className='container padding'>
        <div className='row mx-0'>
        <Trending blogs={trendBlogs}/>
            {/* <h2 className='text-center'>Trending</h2> */}
            <div className='col-md-8'>
                <BlogSection blogs={blogs} user={user} handleDelete={handleDelete}/>
            </div>
            <div className='col-md-3'>
                <Tags tags={tags}/>
                <MostPopular blogs={blogs}/>
            </div>
        </div>
    </div>
   </div>
  )
}

export default Home
