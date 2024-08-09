import React, { useEffect, useState } from "react";
import "./List.scss";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);

  const fetchlist = async () => {
    try {
      const response = await axios.get("/api/food/list");
      setList(response.data.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchlist();
  }, []);

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post("/api/food/remove", { id: foodId });
      await fetchlist();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error);
    }
  };

  
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`api/images/${item.image}`} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
