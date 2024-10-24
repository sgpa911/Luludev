import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RestaurantMenu = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8080/restaurant/${id}`);
        const data = response.data.data;

        if (!data) {
          throw new Error('Restaurant not found');
        }

        setRestaurant(data);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
        setError('Failed to fetch restaurant data.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) return <div style={{ color: 'black' }}>Loading...</div>;
  if (error) return <div style={{ color: 'black' }}>{error}</div>;
  if (!restaurant) return <div style={{ color: 'black' }}>Restaurant not found</div>;

  // Extract primary and secondary colors from restaurant object (you may have this data in your API)
  const primaryColor = restaurant.primaryColor || '#6c757d'; // Fallback to a neutral color
  const secondaryColor = restaurant.secondaryColor || '#fdfdfd';

  return (
    <div style={{ padding: '20px', fontFamily: "'Poppins', sans-serif" }}>
      {/* Shop Name (Heading 1) */}
      <h1 style={{ color: '#000', fontSize: '3em', textAlign: 'center', fontWeight: '700' }}>
        {restaurant.shop_name}
      </h1>

      {/* Restaurant Logo */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <img
          src={restaurant.logo}
          alt={restaurant.shop_name}
          style={{
            width: '200px',
            height: 'auto',
            borderRadius: '50%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>

      {/* Menu Heading (Heading 2) */}
      <h2
        style={{
          color: '#000',
          fontFamily: "'Roboto Slab', serif",
          textAlign: 'center',
          fontSize: '2.2em',
          marginBottom: '40px',
        }}
      >
        Menu
      </h2>

      {/* Menu Items */}
      <div
        style={{
          display: 'grid',
          gap: '30px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}
      >
        {restaurant.menu.map((category) => (
          <div
            key={category.category}
            style={{
              border: `2px solid ${primaryColor}`,
              borderRadius: '20px',
              padding: '25px',
              backgroundColor: secondaryColor,
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.1)';
            }}
          >
            {/* Category Heading (Heading 3) */}
            <h3
              style={{
                fontSize: '1.8em',
                color: '#000',
                marginBottom: '15px',
                borderBottom: `2px solid ${primaryColor}`,
                paddingBottom: '10px',
              }}
            >
              {category.category}
            </h3>

            <div style={{ paddingLeft: '10px' }}>
              {/* Styled ordered list for menu items */}
              <ol style={{ listStyleType: 'none', paddingLeft: '0' }}>
                {category.items.map((item, index) => (
                  <li
                    key={item.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '15px',
                      padding: '10px 0',
                      borderBottom: '1px solid #ddd', // Subtle line between items
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        color: '#000',
                        marginRight: '10px',
                        fontSize: '1.2em',
                      }}
                    >
                      {index + 1}.
                    </span>
                    <span
                      style={{
                        fontStyle: 'italic',
                        fontSize: '1.1em',
                        color: '#495057',
                      }}
                    >
                      {item.name}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
