import { nanoid } from 'nanoid';
import * as React from 'react';
import { addReview } from '../utils/helpers';

const ReviewComponent = ({plantID, reviewAdded, setreviewAdded}) => {
  const [form, setForm] = React.useState({
    title: '',
    description: '',
    rating: 0,
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reviewId = nanoid();

    // alert(form.title + ' ' + form.description + ' ' + form.rating) ;
    const review = {
          id: reviewId,
          value: {
            date: new Date(),
            description: form.description,
            id: reviewId,
            index: reviewId,
            ratingOutOf5: form.rating,
            title: form.title,
          },
      };
      addReview(review, plantID);
      setreviewAdded(true);
      setForm({
        title: '',
        description: '',
        rating: 0,
      })
      setTimeout(() => {
        setreviewAdded(false);
      },500)
      console.log(review);
      // console.log(plantID)
  };

  return (
    <div>
      <h2>Add a review</h2>
      <br/>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={handleChange}
          />
        </div> */}
        <div style={{marginBottom: '10px'}}>
          <input
            id="title"
            type="text"
            placeholder='Title'
            value={form.title}
            onChange={handleChange}
            style={{background: 'white', border: '1px solid #e6e6e6', color: '#333', padding: '2px 10px 2px 20px', width: '100%', fontSize:'14px', height:'45px'}}
          />
        </div>
        <div style={{ marginBottom: '5px'}}>
          <textarea
            id="description"
            type="text"
            placeholder='Description'
            value={form.description}
            onChange={handleChange}
            style={{background: 'white', border: '1px solid #e6e6e6', color: '#333', padding: '20px 10px 2px 20px', width: '100%', fontSize:'14px', height:'180px', marginBottom: '20px', resize: 'horizontal'}}
          />
        </div>
        <div style={{ marginBottom: '10px'}}>
          <input
            id="rating"
            type="number"
            placeholder='Rating (from 0-5)'
            value={form.rating}
            onChange={handleChange}
            style={{background: 'white', border: '1px solid #e6e6e6', color: '#333', padding: '2px 10px 2px 20px', width: '100%', fontSize:'14px', height:'45px'}}
          />
        </div>
        <button type="submit" className="w-commerce-commerceaddtocartbutton add-to-cart-button" style={{ width: '50%'}}>Submit</button>
      </form>
    </div>
  );
};

export default ReviewComponent;