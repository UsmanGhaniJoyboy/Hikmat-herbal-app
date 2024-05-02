import CustomeNav from "../inc/CustomeNav";
import "../StyleSheets/Rem_det.css";
import hairfal from "../images/hairfal.jpeg";
import {FaStar} from "react-icons/fa";
import { useState } from "react";
import { Button } from "react-bootstrap";

function RemediesDetails() {
  const [rating,setRating] = useState(null);
  return (
    <>
      <CustomeNav />
      <div className="body">
        <div className="rem_detail">
          <div className="image">
            <img src={hairfal} alt="" />
            <br />
            <span>Hairfall Solution </span>
          </div>
          <div className="rem_det">
            <div className="rem_title">
                <span>This Product uses Natural ingredients and has no side effects</span>
            </div>
            <div className="rating">
              {
                [...Array(4)].map((star,index)=>{
                  const currentRating =index +1;
                  return(
                    <FaStar className="star" color="orange" size={20}/> 
                  );
                  

                })
              }
            </div>
            <div className="price">
                <span>Rs.999</span>
            </div>
            <div className="add-Cart">
              <Button type="submit">Add to Cart</Button>
            </div>
          </div>
        </div>
       
          <br />
          <div className="second_div">
            <div className="usage">
                <h3>Benifits</h3>
                <ul>
                  <li>Helps dissolve kidney stones: The powder contains ingredients known to aid in the breakdown and dissolution of kidney stones</li>
                  <li>Supports kidney health: Regular consumption of the powder can promote overall kidney health by preventing the formation of new stones and maintaining proper kidney function.</li>
                  <li>Natural and safe: Made from natural ingredients and herbs, the kidney stone powder offers a safe and effective alternative to conventional treatments</li>
                </ul>
            </div>
            <div className="ingredient">
              <h3>Ingredients</h3>
              <ul>
                <li>Chanca Piedra (Stone Breaker): Known for its ability to break down kidney stones and support urinary tract health.</li>
                <li>Lemon Juice: Contains citric acid, which may help prevent kidney stone formation by increasing urine citrate levels.</li>
                <li>Apple Cider Vinegar: Believed to help dissolve kidney stones and alkalize the body, reducing the risk of stone formation.</li>
                <li>Dandelion Root: Acts as a diuretic, promoting urine production and helping to flush out toxins and kidney stones.</li>
                <li>Nettle Leaf: Acts as a diuretic and may help prevent crystallization of minerals in the kidneys, reducing the risk of stone formation.</li>
              </ul>
            </div>
          </div>
          <div className="third_div">
            <h4>Ratings & Reviews</h4>
          </div>
          <div className="Forum">
            <h4>Forum / Quesitons related to Remedy </h4>
            <div className="handleinput">

            <div className="input">
              <input type="text" placeholder="Ask anything" />
              <div className="btn-question">
                <Button type="submit">Ask Question</Button>
              </div>
            </div>
            
            </div>
          </div>
      </div>
    </>
  );
}

export default RemediesDetails;
