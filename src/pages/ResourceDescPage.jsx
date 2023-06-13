import React from 'react'
import '../assets/css/ResourceDescPageCSS.css'
import ReactPic from '../assets/images/react_img.png'

const ResourceDescPage = () => {
  return (
    <div className='ResourcePageDesc_Conatiner'>
      <div className="ResDesc">
        <button>Add resources</button>
        <h1>React Resources</h1>
        <img src={ReactPic} alt="" />
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, necessitatibus incidunt! Facilis perspiciatis veniam maiores nobis doloremque laborum animi sapiente eligendi sunt! Esse nesciunt minus cupiditate aperiam vitae perferendis? Facere eligendi at incidunt ipsum sunt! Repellendus quia, beatae numquam earum in, laudantium deleniti vel dolor, quam atque nihil. Ad deserunt accusantium aliquid nulla, non debitis explicabo labore necessitatibus maxime culpa voluptates, perspiciatis dicta sed aperiam unde dolore? In numquam cumque reprehenderit cupiditate accusantium amet? Aliquid omnis maxime vitae et saepe ducimus fuga adipisci, itaque quia nulla ea in deserunt natus est quis culpa, impedit vero beatae dignissimos odio consequatur deleniti.</p>
      </div>
      <div className="ResDescButtons">
        <button>Lectures</button>
        <button>Notes</button>
        <button>Official Docs</button>
      </div>
    </div>
  )
}

export default ResourceDescPage