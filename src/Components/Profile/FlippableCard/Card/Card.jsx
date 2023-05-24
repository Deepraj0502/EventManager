import "./Card.css";

function Card({ onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-back">InProgress....</div>
      <div className="card-front">
        <p className="card-event">Events Attainted</p>
        <p className="card-event-number">8</p>
      </div>
    </div>
  );
}

export default Card;
