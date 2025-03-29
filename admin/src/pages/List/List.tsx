import { FC, useEffect, useState } from "react";
import "./List.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { Data } from "../Add/Add";

interface FoodItem extends Data {
  image: string;
  _id: string;
}

const List: FC = () => {
  const [list, setList] = useState<FoodItem[]>([]);

 const fetchlist = async () => {
   try {
     const response = await axios.get(
       "https://foodeli-backend-55b2.onrender.com/api/food/list"
     );
     setList(response.data.data);
   } catch (error: unknown) {
     if (axios.isAxiosError(error)) {
       toast.error(error.response?.data?.message || "Error fetching food list");
     } else {
       toast.error("An unexpected error occurred");
     }
   }
 };

  useEffect(() => {
    fetchlist();
  }, []);

const removeFood = async (foodId: string) => {
  try {
    const response = await axios.post(
      "https://foodeli-backend-55b2.onrender.com/api/food/remove",
      { id: foodId }
    );
    await fetchlist();
    toast.success(response.data.message);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Error removing food item");
    } else {
      toast.error("An unexpected error occurred");
    }
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
            <img src={item.image} alt="" />
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
