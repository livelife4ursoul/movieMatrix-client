export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.imagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Plot: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.name}</span>
      </div>
      {/* <div>
        <span>Featured: </span>
        <span>{movie.Featured}</span>
      </div> */}
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};