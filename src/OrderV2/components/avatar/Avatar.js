import './avatar.css';

function Avatar({ imageUrl = '', name = '', position = 1 }) {
  const content = imageUrl ? (
    <img src={imageUrl} alt={name} />
  ) : (
    name?.slice(0, position)
  );

  return <div className='avatar-container'>{content}</div>;
}

export default Avatar;
