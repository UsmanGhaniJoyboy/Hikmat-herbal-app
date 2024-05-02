import React from 'react'
import Card from "react-bootstrap/Card";
import "../inc/HomeRemedy.css";

const Home_remedyCard = ({remHeader,cardText,remRating}) => {
  return (
    <Card className="text-center home_card">
    <Card.Header className='remHeader'>{remHeader}</Card.Header>
    <Card.Body>
      <Card.Text className='remText'>
        {cardText}
      </Card.Text>
    </Card.Body>
    <Card.Footer className=" remRating">{remRating}</Card.Footer>
  </Card>
  )
}

export default Home_remedyCard