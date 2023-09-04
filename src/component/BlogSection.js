import React from 'react'
import FontAwesome from "react-fontawesome";
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { excerpt } from '../utility/index';


const BlogSection = ({ blogs, user, handleDelete }) => {
  const userId = user?.uid;
  return (
    <div>
      <div className='blog-heading text-start py-3 mb-4'>Daily Blogs</div>
      {blogs?.map((item) => (
        <div className='row pb-4' key={item.id}>
          <div className='col-md-5'>
            <div className='hover-blogs-img'>
              <div className='blogs-img'>
                <img src={item.imgURL} alt={item.title} />
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <div className='text-start'>
              <h6 className='category catg-color'>{item.category}</h6>
              <span className='title py-2'>{item.title}</span>
              <span className='meta-info'>
                <p className='author'>{item.author}</p>&nbsp;
                {item.timestamp.toDate().toDateString()}
              </span>
            </div>
            <div className='short-description text-start'>
              {excerpt(item.description, 60)}

            </div>
            <Link to={`./detail/${item.id}`}><button className='btn btn-read'>Read More</button></Link>
            {user?.uid && item.userId === user.uid && (
              <div style={{ float: "right", height: "1.3rem", width: "1.3rem", cursor: "pointer" }}>
                <FaTrash className="trash" onClick={() => handleDelete(item.id)} />
                <Link to={`/update/${item.id}`}>
                  <FaEdit className="edit" />
                </Link>
              </div>
            )}

          </div>
        </div>
      ))}
    </div>

  )
}

export default BlogSection
