import React from 'react';
import Card from "../assets/images/cardA.jpg";
import Card2 from "../assets/images/cardB.jpg";
import Card3 from "../assets/images/cardC.jpg";
import Card4 from "../assets/images/cardD.jpg";
// import { Link } from "react-router-dom";

const CardSection = () => {
return(
    // <div className="cardSectionContainter">
    // <div className="container">
    //     <div className="card">
    //         <img src={Card1} alt=""/>
    //         <div className="intro">
    //             <h2>1 on 1 Call</h2>
    //             <p>Book a 1 on 1 session with your favorite mentor.
    //             </p>
    //         </div>
    //     </div>

    //     <div className="card">
    //         <img src={Card2} alt=""/>
    //         <div className="intro">
    //             <h2>Resources</h2>
    //             <p>get amazing content at just one click and that too free of cost.</p>
    //         </div>
    //     </div>

    //     <div className="card">
    //         <img src={Card3} alt=""/>
    //         <div className="intro">
    //             <h2>Project Contribution</h2>
    //             <p>Struggling with your ongoing personal project? get help.
    //             </p>
    //         </div>
    //     </div>

    //     <div className="card">
    //         <img src={Card4} alt=""/>
    //         <div className="intro">
    //             <h2>Video Contribution</h2>
    //             <p>do something for the community and add your valuable skills.
    //             </p>
    //         </div>
    //     </div>
    // </div>
    // </div>



    <div className="heading">
        <div className="container">
            <div className="card">
                <img src={Card} alt="pets"/>
                <div className="intro">
                    <h1>1 on 1 Call</h1>
                    <h3>Book a 1 on 1 session with your favorite mentor.</h3>
                    {/* <button><Link to={'/groomingproducts'}>SHOP NOW</Link></button> */}
                </div>
            </div>
            <div className="card">
                <img src={Card2} alt="food"/>
                <div className="intro">
                    <h1>Resources</h1>
                    <h3>Get amazing content at just one click and that too free of cost.</h3>
                    {/* <button><Link to={'/foodproducts'}>SHOP NOW</Link></button> */}
                </div>
            </div>
            <div className="card">
                <img src={Card3} alt="toys"/>
                <div className="intro">
                    <h1>Project Contribution</h1>
                    <h3>Struggling with your ongoing personal project? get help.</h3>
                    {/* <button><Link to={'/accessories'}>SHOP NOW</Link></button> */}
                </div>
                </div>

                <div className="card">
                <img src={Card4} alt="toys"/>
                <div className="intro">
                    <h1>Video Contribution</h1>
                    <h3>Do something for the community and add your valuable skills.</h3>
                    {/* <button><Link to={'/accessories'}>SHOP NOW</Link></button> */}
                </div>
                </div>
    </div>
    </div>
);
};
export default CardSection;