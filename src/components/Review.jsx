import React from 'react';
import './Review.css'; 
import Female from './Images/female.jpg';
import Woman from './Images/woman.jpg';
import Hero from './Images/hero.jpg';
import medical from './Images/medical.jpeg';
import lady from './Images/lady.jpeg';

const Review = () => {
  const reviews = [
    {
      id: 1,
      title: '"QuickRetail is a game-changer for our business. The software is intuitive and user-friendly."',
      desc: 'Nakshatra',
      image: lady,
      company: 'EssenceMart',
      designation: 'Owner'
     
    },
    {
      id: 2,
      title: '"Great experience with QuickRetail! The customer support team is responsive and helpful."',
      desc: 'Purvi Roy',
      image: Female, 
      company: 'OneStop Essence',
      designation: 'Operations Manager'
    },
    {
      id: 3,
      title: '"I love the reporting features of QuickRetail. It helps us track sales performance effectively."',
      desc: 'Annamalai',
      image: medical, 
      company: 'LifePulse Pharmacy',
      designation: 'Owner'
     
    },
    {
      id: 4,
      title: '"QuickRetail has streamlined our inventory management process. It’s easy to use and efficient."',
      desc: 'Amit Sharma',
      image: Hero, 
      company: 'Kisan Kirana',
      designation: 'Inventory Manager'
    },
   
    {
      id: 5,
      title: '"I’m impressed with QuickRetail’s analytics tools. They’ve helped us make data-driven decisions for our business."',
      desc: 'Priya Patel',
      image: Woman,
      company: 'Urban Threads',
      designation: 'Owner'
    }
  ];

  return (
    <div className="reviews-wrapper">
      <h2>Hear from small business owners in India</h2>
      <div className="review-slider">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-content">
              <div className="review-image-container">
                <img src={review.image} alt="Review" className="review-image" />
              </div>
              <span className="review-title">{review.title}</span>
              <p className="review-desc">{review.desc}</p>
              <p className="review-designation">{review.designation}</p>
              <p className="review-company">{review.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
