(function () {
  const socket = io();
  let carts = [];
  const buyButton = document.getElementById("comprarBtn");
  const emptyButton = document.getElementById("vaciarBtn");
  const deleteButton = document.getElementById("btnDelete");
  const price = document.getElementById("price");
  const quantity = document.getElementById("quantity");
  const stock = document.getElementById("stock");
  const productsListSocket = document.getElementById("productsSocket");

  emptyButton.addEventListener("click", (ev) => {
    ev.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          `Your cart ${emptyButton.dataset.cartId} has been empty.`,
          "success"
        );
        let idToDelete;
        idToDelete = emptyButton.dataset.cartid
        try {
          fetch(`http://localhost:8080/api/carts/${idToDelete}`,
            {
              method: "DELETE"
            }).then(res => {
              if (res.status === 200) {
                window.location.reload()
              }
            }).then(data => {
              console.log(data)
            })
            .catch(err => console.log(err));
        } catch (error) {
          console.log(error)
        }
        // socket.emit("idToDelete", idToDelete);
      } else {
        console.log(`The action was cancelled`);
        return;
      }
    });
  });

  deleteButton?.addEventListener("click", (ev) => {
    ev.preventDefault();
    const productDelete = deleteButton.dataset.deleteid
    const cartId = emptyButton.dataset.cartid
    try {
      fetch(`http://localhost:8080/api/carts/${cartId}/product/${productDelete}`,
        {
          method: "DELETE"
        }).then(res => {
          if (res.status === 200) {
            window.location.reload()
          }
        }).then(data => {
          console.log(data)
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error)
    }
  });

  buyButton?.addEventListener("click", (ev) => {
    ev.preventDefault();
    const cartId = buyButton.dataset.cartid
    try {
      fetch(`http://localhost:8080/api/carts/${cartId}/purchase`,
        {
          method: "POST"
        }).then(res => {
          res.json()
        }).then(data => {
          alert(data)
        })
        .catch(err => console.log(err));
    } catch (error) {
      alert(error)
    }
  });

})();
