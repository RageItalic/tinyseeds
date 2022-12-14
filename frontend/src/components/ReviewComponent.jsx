import { nanoid } from 'nanoid';
import * as React from 'react';
import { addReview } from '../utils/helpers';

const ReviewComponent = ({plantID}) => {
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

    alert(form.title + ' ' + form.description + ' ' + form.rating) ;
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
      console.log(review);
      // console.log(plantID)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Description</label>
        <input
          id="description"
          type="text"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="rating">Rating (from 0-5)</label>
        <input
          id="rating"
          type="number"
          value={form.rating}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewComponent;