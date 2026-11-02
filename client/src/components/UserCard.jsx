import React from "react";

const UserCard = ({ image, name, email, edit, remove }) => {
  return (
    <div>
      <div>
        <img src={image} alt="user image" />
      </div>
      <div>
        <h1>{name}</h1>
        <p>{email}</p>
      </div>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
