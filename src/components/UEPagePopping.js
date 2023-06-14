import '../styles/UEPagePopping.css';
import Carousel from './Carousel';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UEPagePopping = ({ UE, reset }) => {
  const [courses, setCourses] = useState([]);
  const [isWindowOpen, setIsWindowOpen] = useState(true);
  const ues = [
    'Architecture TCP-IP',
    'Systèmes de Communication 1',
    'Algorithmique et programmation',
    'Pratique et Projets 1',
    'Pratique et Projets 2',
    'Systèmes et Services Informatiques',
    'Architectures LAN et WAN',
    'Systèmes de Communication 2',
    'Pratique et Projets 3',
    'Projet de recherche et d’ingénierie', 
    'Humanités'
  ]; 

  useEffect(() => {
    const fetchObjets = async () => {
      try {
        const coursesArray = [];

        for (const ue of ues) {
          const response = await axios.get(`http://localhost:4000/courses/${ue}`);
          coursesArray.push(response.data);
        }

        setCourses(coursesArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchObjets();
  }, [ues]);

  const handleCloseClick = () => {
    setIsWindowOpen(false);
    document.body.style.overflow = 'auto';
    reset(null);
  };

  if (!isWindowOpen) {
    return null;
  }

  return (
    <div className='UEpage-container'>
      <div className='UEpage'>
        <h2 className='UEcategory-title'>{UE}</h2>
        <button className='close' onClick={handleCloseClick}>✖</button>
        {courses.map((category, index) => {
          if (category[0].UE === UE) {
            return (
              <li key={index} className="list-element">
                <Carousel courses={category} />
              </li>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default UEPagePopping;
