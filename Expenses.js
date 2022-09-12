import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { expenseActions } from "../components/store/expenseReducer";
import Premium from "../pages/Premium";

const ExpenseItems = () => {
  const TotalExpense = useSelector((state) => state.expense.totalexpense);

  const [price, setPrice] = useState("");

  const [description, setDescription] = useState("");

  const [edit, setEdit] = useState(false);

  const [editId, setEditId] = useState("");

  const [title, setTitle] = useState("");

  const [expense, setExpense] = useState([]);

  const [premium, setPremium] = useState("");
  const [premiumBtn, setPremiumBtn] = useState("");
  const [premiumfeatures, setPremiumfeatures] = useState("");

  const dispatch = useDispatch();

  const priceHandler = (event) => {
    setPrice(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const addExpenseHandler = (event) => {
    event.preventDefault();
    const Expense = {
      price: price,
      description: description,
      title: title,
    };

    if (edit) {
      fetch(
        `https://expensetracker-1293b-default-rtdb.firebaseio.com/expenses/${editId}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            price: price,
            description: description,
            title: title,
          }),
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => {
        if (res.ok) {
          alert("you edited successfully");
        } else {
          return res.json().then((data) => {
            console.log(data.error);
          });
        }
      });
    } else {
      fetch(
        "https://expensetracker-1293b-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          body: JSON.stringify({
            title: title,
            description: description,
            price: price,
          }),
          header: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            alert("your information stored in database");
            return res.json();
          } else {
            return res.json().then((data) => {
              alert("failed to store data in database");
            });
          }
        })
        .then((data) => {
          setExpense([Expense, ...expense]);
          dispatch(expenseActions.addingExpense(Expense));
          dispatch(expenseActions.totalExpense(Expense.price));
        });
    }

    setTitle("");
    setPrice("");
    setDescription("");
  };

  useEffect(() => {
    if (TotalExpense >= 10000){
      setPremium(true);
      setPremiumBtn(true);
    } else {
      setPremium(false);
      setPremiumBtn(false);
    }
  }, [TotalExpense]);

  useEffect(() => {
    fetch(
      "https://expensetracker-1293b-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            alert(data.error);
          });
        }
      })
      .then((data) => {
        console.log(data);
        
        let expenseArray = [];
        
        for (let key in data) {
          expenseArray.push({
            id: key,
            title: data[key].title,
            description: data[key].description,
            price: data[key].price,
          });
          dispatch(expenseActions.totalExpense(data[key].price));
        }
        console.log(expenseArray);
        setExpense(expenseArray);
        dispatch(expenseActions.expense(expenseArray));
      });
  }, [dispatch]);

  const deleteHandler = (id, price) => {
    console.log(id);
    dispatch(expenseActions.afterDeleteExpense(price));
   
    const updated = expense.filter((item) => {
      return item.id !== id;
    });

    setExpense(updated);

    fetch(
      `https://expensetracker-1293b-default-rtdb.firebaseio.com/expenses/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        alert("item deleted");
        return res.json();
      } else {
        return res.json().then((data) => {
          console.log(data);
        });
      }
    });
  };

  const editHandler = (id) => {
    setEdit(true);

    setEditId(id);

    fetch(
      `https://expensetracker-1293b-default-rtdb.firebaseio.com/expenses/${id}.json`,
      { method: "GET" }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            alert(data.error);
          });
        }
      })
      .then((data) => {
        console.log(data);
        setDescription(data.description);
        setPrice(data.price);
        setTitle(data.title);
      });
  };

  const activatePremiumHandler = () => {
    setPremiumfeatures(true);
  };

  return (
    
      <div>
        <form onSubmit={addExpenseHandler}>
          <div>
            <label htmlFor="number">Price:</label>
            <input
              type="number"
              required
              onChange={priceHandler}
              value={price}
            />
          </div>
          <div>
            <label htmlFor="text">Description:</label>
            <input
              type="text"
              required
              onChange={descriptionHandler}
              value={description}
            />
          </div>
          <div>
            <p>Title:</p>
            <select onChange={titleHandler} value={title}>
              <option value="food">Food</option>
              <option value="petrol">Petrol</option>
              <option value="salary">Salary</option>
              <option value="book">Books</option>
            </select>
          </div>
          <button type="submit">Add Expense</button>
        </form>
      
      
      <section>
        <ul>
          {expense.map((item) => {
            return (
              <li key={item.id}>
                <div>
                  <span>{item.title}</span>
                </div>
                <div>
                  <span>{item.description}</span>
                </div>
                <div>
                  <span>{item.price}</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      deleteHandler(item.id, item.price);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      editHandler(item.id);
                    }}
                  >
                    Edit
                  </button>
                  <button>
                    Add to Cart
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    <div>
      <h2>Total Expense: ${TotalExpense} </h2>
    </div>
    {premiumBtn && premium && (<button type="button" onClick={activatePremiumHandler}>
      Activate Premium
      </button>)}
      
    </div>
  );
};

export default ExpenseItems;