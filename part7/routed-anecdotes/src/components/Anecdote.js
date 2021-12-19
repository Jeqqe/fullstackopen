import React from 'react';

const Anecdote = ({ anecdote }) => {
  console.log(anecdote);
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>has {anecdote.votes} votes</div>
      <div>
        <a href={anecdote.info}>Click here for more information.</a>
      </div>
    </div>
  );
};

export default Anecdote;
