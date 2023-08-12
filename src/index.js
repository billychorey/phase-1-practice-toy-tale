// let addToy = false;


// document.addEventListener("DOMContentLoaded", () => {
  

//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // Show and hide the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });


//   const fetchUrl = "http://localhost:3000/toys";
//   // Fetch
//   fetch(fetchUrl)
//   .then(response => response.json())
//   .then(data => {
//     const toyCollection = document.getElementById('toy-collection'); 
//     data.forEach(toy => {
//         const card = document.createElement('div');
//         card.className = 'card';
        
//         const h2 = document.createElement('h2');
//         h2.textContent = toy.name;
        
//         const img = document.createElement('img');
//         img.src = toy.image;
//         img.className = 'toy-avatar';
        
//         const p = document.createElement('p');
//         p.textContent = `${toy.likes} Likes`;
        
//         const button = document.createElement('button');
//         button.className = 'like';
//         button.id = toy.id;
//         button.textContent = 'Like ❤️';
        
//         card.appendChild(h2);
//         card.appendChild(img);
//         card.appendChild(p);
//         card.appendChild(button);
        
//         toyCollection.appendChild(card);
//     });
    
//     // console.log(data);
//   })
//   .catch(error => {
//       console.error("Error fetching images:", error);
//   });

//   // Post
//   const postUrl = "http://localhost:3000/toys";
//   const toyForm = document.getElementById('toy-form');

//   toyForm.addEventListener('submit', function(e) {
//     const toyCollection = document.getElementById('toy-collection'); 

//     e.preventDefault(); 
//     // Get user values from the input
//     const toyName = document.getElementById('input-name').value;
//     const toyImage = document.getElementById('input-url').value;

//     // Construct the body object for the new toy
//     const requestBody = {
//       "name": toyName,
//       "image": toyImage,
//       "likes": 0
//     };

//     // Send the POST request
//     fetch(postUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       },
//       body: JSON.stringify(requestBody)
//     })
//     .then(res => res.json())
//     .then(newToy => {
//       // Create markup for the new toys
//       const card = document.createElement('div');
//       card.className = 'card';
      
//       const h2 = document.createElement('h2');
//       h2.textContent = toyName;
      
//       const img = document.createElement('img');
//       img.src = toyImage;
//       img.className = 'toy-image';
      
//       const p = document.createElement('p');
//       // p.textContent = `${toy.likes} Likes`;
      
//       const button = document.createElement('button');
//       button.className = 'like';
//       // button.id = toy.id;
//       button.textContent = 'Like ❤️';
      
//       card.appendChild(h2);
//       card.appendChild(img);
//       card.appendChild(p);
//       card.appendChild(button);
      
//       toyCollection.appendChild(card);
//     })
//     .catch(error => {
//       console.error("Error adding toy:", error);
//     });
//   });





  
//   // Do the PATCH 
//   // Event listener to the like (for each)

//   let like = document.querySelectorAll('.like');
//   console.log(like);
//   like.forEach(btn => {
//     btn.addEventListener('click', function (e) { 
//       e.preventDefault();
//       const toyId = likeBtn.id;
//       console.log(toyId);



//     })
//   })
//   const patchUrl = "http://localhost:3000/toys/:id"
//   fetch(patchUrl, {
//     method: "PATCH",
//     headers:
//     {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
    
//     body: JSON.stringify({
//       "likes": newNumberOfLikes
//     })
//   })
//   .then(res => res.json())
//   .then(updateLike => {

    
//     console.log(updateLike);
//     //code here
//   })
//   .catch(error => {
//     console.error("Error updating like:", error);
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  let addToy = false;

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  // Toggle toy form visibility
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    toyFormContainer.style.display = addToy ? "block" : "none";
  });

  const fetchUrl = "http://localhost:3000/toys";

  // Fetch toys and display them
  fetch(fetchUrl)
    .then(response => response.json())
    .then(data => {
      const toyCollection = document.getElementById('toy-collection');
      data.forEach(toy => {
        const card = createToyCard(toy);
        toyCollection.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error fetching toys:", error);
    });

  // Handle toy form submission
  const postUrl = "http://localhost:3000/toys";
  const toyForm = document.getElementById('toy-form');

  toyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const toyName = document.getElementById('input-name').value;
    const toyImage = document.getElementById('input-url').value;
    const requestBody = {
      "name": toyName,
      "image": toyImage,
      "likes": 0
    };

    // Create a new toy and display it
    fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(requestBody)
    })
    .then(res => res.json())
    .then(newToy => {
      const card = createToyCard(newToy);
      toyCollection.appendChild(card);
    })
    .catch(error => {
      console.error("Error adding toy:", error);
    });
  });

  // Helper function to create a toy card
  function createToyCard(toy) {
    const card = document.createElement('div');
    card.className = 'card';

    const h2 = document.createElement('h2');
    h2.textContent = toy.name;

    const img = document.createElement('img');
    img.src = toy.image;
    img.className = 'toy-avatar';

    const p = document.createElement('p');
    p.textContent = `${toy.likes} Likes`;

    const button = document.createElement('button');
    button.className = 'like';
    button.id = toy.id;
    button.textContent = 'Like ❤️';

    card.appendChild(h2);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(button);

    // Handle toy like button click
    button.addEventListener('click', function() {
      // Perform the PATCH request to update likes
      const patchUrl = `http://localhost:3000/toys/${toy.id}`;
      const newNumberOfLikes = toy.likes + 1;

      fetch(patchUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ "likes": newNumberOfLikes })
      })
      .then(res => res.json())
      .then(updateLike => {
        p.textContent = `${updateLike.likes} Likes`;
      })
      .catch(error => {
        console.error("Error updating like:", error);
      });
    });

    return card;
  }
});
