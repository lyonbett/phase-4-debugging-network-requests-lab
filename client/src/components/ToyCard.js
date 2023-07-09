import React from "react";

function ToyCard({ toy, onDeleteToy, onUpdateToy }) {
  const { id, name, image, likes } = toy;

  function handleDeleteClick() {
    fetch(`/toys/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        onDeleteToy(toy);
      }
    });
  }

  function handleLikeClick() {
    const updateObj = {
      likes: toy.likes + 1,
    };

    fetch(`/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateObj),
    })
      .then((response) => {
        if (response.status === 204) {
          // Update toy locally without relying on response JSON
          const updatedToy = { ...toy, likes: toy.likes + 1 };
          onUpdateToy(updatedToy);
        } else if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((updatedToy) => {
        if (updatedToy) {
          onUpdateToy(updatedToy);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the error appropriately (e.g., display an error message)
      });
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDeleteClick}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
