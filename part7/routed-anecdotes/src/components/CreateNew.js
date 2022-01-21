import React from 'react';
import { useAnecdoteField } from '../hooks/anecdoteField';

const CreateNew = (props) => {
  const content = useAnecdoteField('content');
  const author = useAnecdoteField('author');
  const info = useAnecdoteField('info');

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addNew({
      content: content.data.value,
      author: author.data.value,
      info: info.data.value,
      votes: 0,
    });
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.data} />
        </div>
        <div>
          author
          <input {...author.data} />
        </div>
        <div>
          url for more info
          <input {...info.data} />
        </div>
        <button>create</button>
      </form>
      <button
        onClick={() => {
          content.resetValue();
          author.resetValue();
          info.resetValue();
        }}>
        reset
      </button>
    </div>
  );
};

export default CreateNew;
